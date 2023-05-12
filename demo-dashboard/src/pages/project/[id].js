import Layout from "@/components/common/layout/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { chainIdToChain } from "@/helpers/chainIdToChain";
import GamingAssetContract from "@/static/gamingAssetContract.json";
import { getPublicClientByChain } from "@/lib/publicClient";

export default function Home() {
  const metadata = {
    title: "Project page - Web3 Game Dev Toolbox",
  };

  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState();

  const router = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    const projectId = router.query.id;

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${projectId}`);
    const data = await response.json();

    const publicClient = getPublicClientByChain(data.chain);

    const contractsData = await Promise.all(data.assets.map(async (asset) => {
      const contract = {
        address: asset.contractAddress,
        abi: GamingAssetContract.abi,
      }

      return publicClient.multicall({
        contracts: [
          {
            ...contract,
            functionName: "name",
          },
          {
            ...contract,
            functionName: "symbol",
          },
          {
            ...contract,
            functionName: "baseURL",
          }
        ]
      });
    }));

    // TODO: this only works now for first asset, loop through every
    const metadataUrl = contractsData[0][2].result.replace("ipfs://", "https://ipfs.io/ipfs/");
    const metadataResponse = await fetch(metadataUrl);
    const metadata = await metadataResponse.json();
    const imageUrl = metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")



    const projectData = {
      ...data,
      assets: [{
        ...data.assets[0],
        name: contractsData[0][0].result,
        symbol: contractsData[0][1].result,
        imageUrl
      }]
    }

    console.log(projectData)

    setProject(projectData);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!router.query.id) return;

    fetchData();
  }, [router.query]);

  if (isLoading) {
    return (
      <Layout>
        <Head>
          <title>{metadata.title}</title>
        </Head>
        <div className="mt-40 text-center">
          <Spinner />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <div className="mt-40 max-w-[600px] m-auto">
        <p className="mb-10 text-xl">Project Name: {project.name}</p>
        <p className="mb-2">Project ID: <strong>{router.query.id}</strong></p>
        <p className="mb-2">Chain: <strong>{chainIdToChain(project.chain).name}</strong></p>
        <p className="mb-2">Uploaded Assets:</p>
        {
          project.assets.map((asset, i) => (
            <div key={i} className="p-9 mb-10 rounded-lg bg-zinc-900 border border-zinc-700">
              <img className="mb-10" src={asset.imageUrl} alt={asset.name} />
              <p>Name: <strong>{asset.name}</strong></p>
              <p>Symbol: <strong>{asset.symbol}</strong></p>
              <p>Contract address: <strong>{asset.contractAddress}</strong></p>
            </div>
          ))
        }
      </div>
    </Layout>
  )
}
