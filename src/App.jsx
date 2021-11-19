import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  // State variable used to store users public wallet.
  const [currentAccount, setCurrentAccount] = useState("");

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

  const wave = () => {
    
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
