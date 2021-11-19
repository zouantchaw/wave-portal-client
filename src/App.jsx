import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from './utils/WavePortal.json';

export default function App() {

  // State variable used to store users public wallet.
  const [currentAccount, setCurrentAccount] = useState("");

  const contractAddress = "0xe0F3ab0D999F50c23C32836236CEbCDeD5D49AbA"
  
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      // Check for ethereum object
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("ethereum object is present in the window", ethereum);
      }

      // Check if app can access users wallet
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch(error) {
      console.log(error);
    }
  }

  // connnectWallet methods
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      console.log("ethereum obj:", ethereum)

      if (!ethereum) {
        alert("Get Metamask!");
        return;
      }

      // Request access to users wallet from provider(metamask)
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("accounts:", accounts)

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieve total wave count...", count.toNumber());

        // Execute 'wave' on smart contract
        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Welcome!
        </div>

        <div className="bio">
        I'm wiel, I built this so you can wave at me. Cool right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        {/* If there is no current account, render button */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
