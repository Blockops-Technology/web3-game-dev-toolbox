import { Input } from "@chakra-ui/react";

const AssetCard = ({index, assetObject, handleAssetCardInputChange}) => {
  const handleFileChange = (e) => handleAssetCardInputChange("file", index, e.target.files[0]);
  const handleNameChange = (e) => handleAssetCardInputChange("name", index, e.target.value);

  return (
    <div className="p-9 my-10 rounded-lg bg-zinc-900 border border-zinc-700">
      {
        assetObject.file &&
        <img src={URL.createObjectURL(assetObject.file)} alt="Some NFT" />
      }
      <Input className="my-5" onChange={handleFileChange} variant="unstyled" type="file" />
      <p className="mb-2">Asset name</p>
      <Input name={assetObject.name} onChange={handleNameChange} />
    </div>
  );
}

export default AssetCard;