import { useState, useEffect } from "react";
import { NFTCard } from "../nftCard/nftCard";
import NFTCollectionStyles from "./NFTCollection.module.css";

const NFTCollection = props => {
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);

  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching nfts");
    const api_key = "CZTNDzFuwH91esYTaCdJcq83fjYzhTuj";
    const baseURL = `https://eth-goerli.g.alchemy.com/v2/${api_key}/getNFTs/`;

    if (!collection) {
      var requestOptions = {
        method: "GET",
      };
      const fetchURL = `${baseURL}?owner=${props.web3.currentProvider.selectedAddress}`;

      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    } else {
      const fetchURL = `${baseURL}?owner=${props.web3.currentProvider.selectedAddress}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    }

    if (nfts) {
      console.log("nfts:", nfts);
      setNFTs(nfts.ownedNfts);
    }
  };

  useEffect(() => {
    if (props.web3) {
      fetchNFTs();
    }
  }, [props.web3]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-8 gap-y3">
      <div>
        {!props.web3 ? (
          <h2 className={NFTCollectionStyles.nftCollectionHeading}>
            Please connect to your wallet
          </h2>
        ) : props.web3 && NFTs.length <= 0 ? (
          "You don t have any NFTs at the moment"
        ) : (
          <div>
            <h2 className={NFTCollectionStyles.nftCollectionHeading}>
              Your NFTs:
            </h2>
            <div className={NFTCollectionStyles.nftCollectionContainer}>
              {NFTs.map(nft => {
                return <NFTCard nft={nft}></NFTCard>;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTCollection;
