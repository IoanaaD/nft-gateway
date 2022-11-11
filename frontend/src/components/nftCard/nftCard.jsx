import nftCardStyles from "./nftCard.module.css";

export const NFTCard = ({ nft }) => {
  console.log("asasas", nft.metadata.animation_url);
  return (
    <div className={nftCardStyles.nftCardContainer}>
      <div className="rounded-md">
        {!nft.metadata.animation_url ? (
          <img
            className={nftCardStyles.nftImage}
            src={nft.media[0].gateway}
          ></img>
        ) : (
          <model-viewer
            src={nft.metadata.animation_url}
            className={nftCardStyles.nftAnimation}
            alt="3D animation for NFT"
            camera-controls
          ></model-viewer>
        )}
      </div>
      <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
        <div className="">
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600">Id: {nft.id.tokenId}</p>
          <p className="text-gray-600">{nft.contract.address}</p>
        </div>

        <div className="flex-grow mt-2">
          <p className="text-gray-600">{nft.description}</p>
        </div>
      </div>
    </div>
  );
};
