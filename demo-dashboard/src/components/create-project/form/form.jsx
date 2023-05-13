import { Button, Input } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { storageClient } from "@/lib/web3Storage";
import AssetCard from "@/components/create-project/assetCard/assetCard";
import ChainPicker from "@/components/create-project/chainPicker/chainPicker";
import { SUPPORTED_CHAINS } from "@/static/constants";
import { deployGamingAssetContract } from "@/static/deployGamingAssetContract";
import { getPublicClientByChain } from "@/lib/publicClient";

const Form = () => {
  const [projectName, setProjectName] = useState("");
  const [assets, setAssets] = useState([]);
  const [selectedChain, setSelectedChain] = useState(SUPPORTED_CHAINS.POLYGON);
  const [pojectCreationInProgress, setProjectCreationInProgress] = useState(false);

  const handleProjectNameChange = (e) => setProjectName(e.target.value);
  const createAssetCard = () => setAssets((prevState) => ([...prevState, {file: null, name: ""}]));
  const handleAssetCardInputChange = (field, index, value) => {
    const newAssetsArray = assets.map((asset, i) => {
      if (i == index) {
        return {
          ...asset,
          [field]: value,
        }
      }

      return asset;
    });

    setAssets(newAssetsArray);
  };

  const createProject = async () => {
    // don't have time for more serious validation so for now only checking that there's no single empty filed
    const uncompleteAssetsInAssetArray = !!assets.find(asset => (asset.file === null || asset.name === ""));

    if (uncompleteAssetsInAssetArray || !projectName) {
      return alert("Validation error! All fields must be populated");
    }

    // TODO: Save project and data in database
    const uploadPromises = assets.map(async (asset) => {
      const cid = await storageClient.put([asset.file]);
      const nftJsonObject = {
        name: asset.name,
        image: `ipfs://${cid}/${asset.file.name}`,
      }
      const blob = new Blob([JSON.stringify(nftJsonObject)], { type: "application/json" });
      const nftJsonCid = await storageClient.put([new File([blob], "metadata.json")]);
      return nftJsonCid;
    });

    const assetsJsonCids = await Promise.all(uploadPromises);
    console.log(assetsJsonCids)

    const assetsList = [];
    const contractCreationTnxHashes = await Promise.all(
        assets.map(async (asset, i) => {
        const contractSymbol = asset.name.replaceAll(" ", "").toUpperCase();
        const tokenUrl = `ipfs://${assetsJsonCids[i]}/metadata.json`;
        return deployGamingAssetContract(selectedChain, asset.name, contractSymbol, tokenUrl);
      })
    );

    console.log("contractCreationTnxHashes", contractCreationTnxHashes);

    await Promise.all(contractCreationTnxHashes.map(async (hash, i) => {
      const publicClient = getPublicClientByChain(selectedChain);
      const transactionReceipt = await publicClient.waitForTransactionReceipt({hash});

      console.log(transactionReceipt);

      assetsList.push({
        contractAddress: transactionReceipt.contractAddress,
      })
    }));

    console.log(assetsList);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects-with-assets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName,
          chain: selectedChain.id,
          assets: assetsList,
        }),
      })
    } catch (e) {
      console.log(e);
    }

    console.log(contractCreationTnxHashes);
  }

  const onCreateProjectClick = async () => {
    setProjectCreationInProgress(true);

    try {
      await createProject();
      setProjectCreationInProgress(false);
    } catch (e) {
      console.log(e);
      setProjectCreationInProgress(false);
    }
  }

  return (
    <div className="mt-40 max-w-[600px] m-auto">
      <p className="mb-2">Project name</p>
      <Input value={projectName} onChange={handleProjectNameChange} />

      {
        assets.map((asset, index) => (
          <AssetCard
            key={index}
            index={index}
            assetObject={asset}
            handleAssetCardInputChange={handleAssetCardInputChange}
          />
        ))
      }

      <div className="my-10">
        <div onClick={createAssetCard} className="py-9 px-4 rounded-lg bg-zinc-900 text-center hover:cursor-pointer">
          <p className="text-sm mb-1">Add asset</p>
          <AddIcon boxSize={3} />
        </div>
      </div>

      <ChainPicker selectedChain={selectedChain} setSelectedChain={setSelectedChain}  />

      <Button disabled={pojectCreationInProgress} onClick={onCreateProjectClick} colorScheme="blue">
        {
          pojectCreationInProgress ?
            "Project creation in progress..." :
            "Create Project"
        }
      </Button>
    </div>
  );
}

export default Form;