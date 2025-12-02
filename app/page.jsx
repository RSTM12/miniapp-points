"use client";

import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";
import { useAccount, useConnect, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { injected } from "wagmi/connectors";

// Font Pixel Retro
const retroFont = {
  fontFamily: "'Courier New', monospace",
  textTransform: 'uppercase',
  letterSpacing: '1px'
};

export default function Home() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { data: hash, sendTransaction, isPending, error } = useSendTransaction();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // --- CONFIG ---
  const NFT_IMAGE = "https://i.imgur.com/CWDPgYB.jpeg"; 
  const NFT_TITLE = "DONUT GENESIS #777";
  const NFT_PRICE = "0.00005";
  const RECEIVER = "0x6894ba473eAc0C4D48D1998519070063EcB716c5"; // ⚠️ GANTI WALLET KAMU
  
  // --- SUPPLY CONFIG ---
  const MAX_SUPPLY = 1000;
  const [currentSupply, setCurrentSupply] = useState(742); 
  // ---------------------

  useEffect(() => {
    sdk.actions.ready();
    if (!isSDKLoaded) {
      setIsSDKLoaded(true);
      connect({ connector: injected() });
    }
  }, [isSDKLoaded, connect]);

  useEffect(() => {
    if (isConfirmed) {
      setCurrentSupply(prev => Math.min(prev + 1, MAX_SUPPLY));
    }
  }, [isConfirmed]);

  const handlePay = () => sendTransaction({ to: RECEIVER, value: parseEther(NFT_PRICE) });

  const progressPercent = (currentSupply / MAX_SUPPLY) * 100;

  // --- STYLES ---
  const containerStyle = {
    minHeight: "100vh", backgroundColor: "#fff", color: "#000",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    padding: "20px", ...retroFont
  };

  const cardStyle = {
    width: "100%", maxWidth: "340px", border: "3px solid #000",
    backgroundColor: "#fff", padding: "4px", boxShadow: "8px 8px 0px #000"
  };

  const imageContainerStyle = {
    width: "100%", aspectRatio: "1/1", border: "3px solid #000",
    backgroundColor: "#e0e0e0", overflow: "hidden", position: "relative",
    marginBottom: "15px"
  };

  const imageStyle = {
    width: "100%", height: "100%", objectFit: "cover",
    filter: "grayscale(100%) contrast(120%) pixelate(4px)" 
  };

  const btnStyle = {
    width: "100%", padding: "15px", border: "3px solid #000",
    backgroundColor: isConnected ? "#000" : "#fff",
    color: isConnected ? "#fff" : "#000",
    fontSize: "14px", fontWeight: "bold", cursor: "pointer", ...retroFont,
    boxShadow: "4px 4px 0px #000", 
    marginTop: "15px",
    position: "relative",
    transition: "transform 0.1s"
  };

  const renderProgressBar = () => {
    const totalBars = 20;
    const filledBars = Math.floor((currentSupply / MAX_SUPPLY) * totalBars);
    let barString = "";
    for(let i=0; i<totalBars; i++) {
      barString += i < filledBars ? "|" : ".";
    }
    return `[${barString}]`;
  };

  return (
    <div style={containerStyle}>
      <div style={{width: '100%', maxWidth: '340px', display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '5px'}}>
        <span>VOL. 1</span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>

      <div style={cardStyle}>
        
        {/* Gambar */}
        <div style={imageContainerStyle}>
          <img src={NFT_IMAGE} style={imageStyle} alt="NFT" />
          <div style={{
            position: 'absolute', top: '10px', left: '10px', 
            backgroundColor: '#000', color: '#fff', padding: '4px 8px', fontSize: '10px', fontWeight: 'bold'
          }}>
            GENESIS
          </div>
        </div>
        
        <div style={{padding: "10px"}}>
          <h1 style={{fontSize: "20px", margin: "0 0 10px 0", borderBottom: "3px solid #000", paddingBottom: "10px", lineHeight: "1.2"}}>
            {NFT_TITLE}
          </h1>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px'}}>
            <div style={{border: '2px solid #000', padding: '8px'}}>
              <div style={{fontSize: '8px', color: '#555'}}>PRICE</div>
              <div style={{fontWeight: 'bold'}}>{NFT_PRICE} ETH</div>
            </div>
            <div style={{border: '2px solid #000', padding: '8px', backgroundColor: '#000', color: '#fff'}}>
              <div style={{fontSize: '8px', color: '#ccc'}}>SUPPLY</div>
              <div style={{fontWeight: 'bold'}}>{currentSupply}/{MAX_SUPPLY}</div>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px'}}>
              <span>MINT PROGRESS</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div style={{fontSize: '14px', letterSpacing: '2px', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 'bold'}}>
              {renderProgressBar()}
            </div>
          </div>

          {/* Status Transaksi (SUDAH DIPERBAIKI) */}
          {isConfirmed && (
            <div style={{border: '2px dashed #000', padding: '10px', textAlign: 'center', marginBottom: '10px', fontSize: '10px'}}>
              {'>>> TRANSACTION SUCCESSFUL <<<'}
            </div>
          )}

          {!isConnected ? (
            <button onClick={() => connect({ connector: injected() })} style={btnStyle}>
              CONNECT WALLET
            </button>
          ) : isConfirmed ? (
            <a href={`https://basescan.org/tx/${hash}`} target="_blank" style={{...btnStyle, display: 'block', textAlign: 'center', textDecoration: 'none', backgroundColor: '#fff', color: '#000'}}>
              VIEW RECEIPT {'->'}
            </a>
          ) : (
            <button 
              onClick={handlePay} 
              disabled={isPending} 
              style={{...btnStyle, opacity: isPending ? 0.5 : 1}}
            >
              {isPending ? "PROCESSING..." : "MINT NOW"}
            </button>
          )}

          {error && <p style={{color: 'red', fontSize: '8px', marginTop: '5px'}}>{error.message.split('.')[0]}</p>}
        </div>
      </div>

      <div style={{marginTop: '20px', fontSize: '10px', textAlign: 'center'}}>
        <p>SECURE CONNECTION :: ESTABLISHED</p>
      </div>
    </div>
  );
}
