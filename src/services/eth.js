import { ethers } from "ethers";
import ToDoList from '../../../build/contracts/ToDoList.json';

const contractAddress = "your_contract_address";

const getEthereum = () => {
  const { ethereum } = window;
  if (!ethereum) {
    throw new Error("MetaMask is not installed");
  }
  return ethereum;
};

export const connectWallet = async () => {
  try {
    const ethereum = getEthereum();
    await ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ToDoList.abi, signer);
    return contract;
  } catch (error) {
    console.error(error);
  }
};
