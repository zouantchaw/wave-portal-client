import React, { useEffect } from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {
  const checkIfWalletIsConnected = () => {

    // Check for ethereum object
    const { ethereum } = window;

    if (ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("ethereum object is present in the window", ethereum);
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
      </div>
    </div>
  );
}
