"use client";

import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";
import { useAccount, useConnect, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";

const retroFont = { fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '1px' };

export default function Home() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const { isConnected, address } = useAccount();
  const { connect, connectors, error: connectError } = useConnect();
  const { data: hash, sendTransaction, isPending, error: txError } = useSendTransaction();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // --- CONFIG ---
  const NFT_IMAGE = "/donut.jpg"; 
  const NFT_TITLE = "DONUT GENESIS #777";
  const NFT_PRICE = "0.00005";
  const RECEIVER = "0x6894ba473eAc0C4D48D1998519070063EcB716c5"; // Ganti Wallet
  
  const [currentSupply, setCurrentSupply] = useState(742); 
  const MAX_SUPPLY = 1000;

  useEffect(() => {
    // Panggil ready langsung tanpa syarat
    if (typeof window !== "undefined") {
      sdk.actions.ready();
      setIsSDKLoaded(true);
    }
  }, []);

  useEffect(() => { if (isConfirmed) setCurrentSupply(prev => prev + 1); }, [isConfirmed]);

  const containerStyle = { minHeight: "100vh", backgroundColor: "#fff", color: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", ...retroFont };
  const cardStyle = { width: "100%", maxWidth: "340px", border: "3px solid #000", padding: "5px", boxShadow: "8px 8px 0px #000" };
  const btnStyle = { width: "100%", padding: "15px", border: "3px solid #000", backgroundColor: isConnected ? "#000" : "#fff", color: isConnected ? "#fff" : "#000", fontWeight: "bold", cursor: "pointer", marginTop: "10px", ...retroFont };

  // Jika error hydration terjadi, tampilkan fallback sederhana
  if (!isSDKLoaded) {
    // Kita biarkan render berjalan, jangan return null di sini
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{border: "3px solid #000", marginBottom: "15px"}}>
          <img src={NFT_IMAGE} style={{width: "100%", display: "block", filter: "grayscale(100%) contrast(120%) pixelate(4px)"}} alt="NFT" />
        </div>
        
        <h1 style={{fontSize: "20px", borderBottom: "3px solid #000", paddingBottom: "10px", margin: "0 0 10px 0"}}>{NFT_TITLE}</h1>
        
        <div style={{display: 'flex', justifyContent: 'space-between', border: '2px solid #000', padding: '10px', marginBottom: '10px'}}>
            <div>PRICE: <strong>{NFT_PRICE} ETH</strong></div>
            <div>MINTED: <strong>{currentSupply}/{MAX_SUPPLY}</strong></div>
        </div>

        {isConfirmed && <div style={{textAlign: 'center', padding: '10px', border: '2px dashed #000'}}>TRANSACTION SUCCESSFUL</div>}

        {!isConnected ? (
          <div>
            <p style={{fontSize: '10px', textAlign: 'center', marginBottom: '5px'}}>SELECT WALLET:</p>
            {connectors.map((connector) => (
              <button 
                key={connector.uid} 
                onClick={() => connect({ connector })} 
                style={{...btnStyle, backgroundColor: '#fff', color: '#000', marginBottom: '5px', fontSize: '10px'}}
              >
                {connector.name.toUpperCase()}
              </button>
            ))}
            {connectError && <p style={{color: 'red', fontSize: '10px'}}>{connectError.message.slice(0,30)}...</p>}
          </div>
        ) : (
          <button onClick={() => sendTransaction({ to: RECEIVER, value: parseEther(NFT_PRICE) })} disabled={isPending} style={{...btnStyle, opacity: isPending ? 0.5 : 1}}>
            {isPending ? "PROCESSING..." : "MINT NOW"}
          </button>
        )}
        
        {txError && <p style={{color: 'red', fontSize: '10px', marginTop: '5px'}}>{txError.message.split('.')[0]}</p>}
      </div>
      
      <div style={{marginTop: "20px", fontSize: "10px", color: "#888"}}>
        APP READY v2
      </div>
    </div>
  );
}
