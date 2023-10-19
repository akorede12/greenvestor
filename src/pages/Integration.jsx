import React from "react";
import { ethers } from "ethers";
import {GreenVestor_address} from "../../config.js";
import { useAccount } from "wagmi";
import ABI from "../../artifacts/contracts/greenVestor.sol/greenVestor.json";
import { publicProvider } from "wagmi/providers/public";
import { BrowserProvider, JsonRpcSigner, JsonRpcProvider, getDefaultProvider } from "ethers";
import { useState } from "react";


export default function Integration() {
  const [returnRate, setReturnRate] = useState();
  const { address } = useAccount();

  const userAddress = address;
  // const contractAddress = GreenVestor_address;
  // const contractAbi = ABI.abi;

  const provider = getDefaultProvider("http://localhost:8545/");//new ethers.providers.JsonRpcProvider(); // getDefaultProvider(); //("http://localhost:8545/");
 
  // const provider = new BrowserProvider(transport, network) //const provider = new BrowserProvider(transport, network)
  // const signer = new JsonRpcSigner(provider, userAddress); //const signer = new JsonRpcSigner(provider, account.address)

  const getRateOfReturn = async () => {
    const contract = new ethers.Contract(
      GreenVestor_address,//contractAddress,
      ABI.abi, //contractAbi,
      provider
    );
    try{
      const rate = await contract.getRateOfReturn();
    setReturnRate(rate.toNumber());
    }catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <p> Test: Get Rate of return </p>
      <p> user address: {userAddress}</p>
      <button onClick={getRateOfReturn}> Get Rate</button>
      <p> The Rate of return is: {returnRate} </p>
    </div>
  );
}
