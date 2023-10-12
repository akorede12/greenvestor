import React from "react";
import $header from "../components/header";
import $banner from "../components/banner";
import $footer from "../components/footer";
import $portfolio from "../components/portfolio";
import GreenVestor_address from "../../config.js";
import { useAccount } from "wagmi";
import ABI from "../../artifacts/contracts/greenVestor.sol/greenVestor.json";
import { publicProvider } from "wagmi/providers/public";
import { BrowserProvider, JsonRpcSigner, getDefaultProvider } from "ethers";
import { useState } from "react";

export default function Integration() {
  const [returnRate, setReturnRate] = useState();
  const { address } = useAccount();

  const userAddress = address;
  const contractAddress = GreenVestor_address;
  const contractAbi = ABI.abi;

  provider = getDefaultProvider(); //("http://localhost:8545/");

  // const provider = new BrowserProvider(transport, network) //const provider = new BrowserProvider(transport, network)
  const signer = new JsonRpcSigner(provider, userAddress); //const signer = new JsonRpcSigner(provider, account.address)

  const getRateOfReturn = async () => {
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider
    );

    const rate = await contract.getRateOfReturn;
    setReturnRate(rate);
  };

  return (
    <div>
      <$header fixed />
      <p> Test: Get Rate of return </p>
      <button onClick={getRateOfReturn}> Get Rate</button>
      <p> The Rate of return is: {returnRate} </p>
      <$footer />
    </div>
  );
}
