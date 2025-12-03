"use client";

import { useEffect, useState, Suspense } from "react";
import sdk from "@farcaster/frame-sdk";
import { useAccount, useConnect, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";

const retroFont = { fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '1px' };

function DonutApp() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const { isConnected } = useAccount();
  
  // 👇 PERBAIKAN: Ambil daftar 'connectors' yang sudah siap
  const { connect, connectors } = useConnect();
  
  const { data: hash, sendTransaction, isPending, error } = useSendTransaction();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // --- CONFIG ---
  const NFT_IMAGE = "/donut.jpg"; 
  const NFT_TITLE = "DONUT GENESIS #777";
  const NFT_PRICE = "0.00005";
  const RECEIVER = "0x6894ba473eAc0C4D48D1998519070063EcB716c5"; // Ganti Wallet
  
  const [currentSupply, setCurrentSupply] = useState(742); 
  const MAX_SUPPLY = 1000;

  useEffect(() => {
    const load = async () => {
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  useEffect(() => { if (isConfirmed) setCurrentSupply(prev => prev + 1); }, [isConfirmed]);

  // 👇 FUNGSI BARU UNTUK CONNECT SMART
  const handleConnect = () => {
    // 1. Cari connector bawaan (Injected)
    const injectedConnector = connectors.find((c) => c.id === 'injected');
    
    // 2. Jika ada, pakai itu. Jika tidak, pakai yang pertama tersedia.
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    } else if (connectors.length > 0) {
      connect({ connector: connectors[0] });
    } else {
      alert("No wallet found");
    }
  };

  const containerStyle = { minHeight: "100vh", backgroundColor: "#fff", color: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", ...retroFont };
  const cardStyle = { width: "100%", maxWidth: "340px", border: "3px solid #000", padding: "5px", boxShadow: "8px 8px 0px #000" };
  const btnStyle = { width: "100%", padding: "15px", border: "3px solid #000", backgroundColor: isConnected ? "#000" : "#fff", color: isConnected ? "#fff" : "#000", fontWeight: "bold", cursor: "pointer", marginTop: "15px", ...retroFont };

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
          // 👇 Panggil fungsi handleConnect yang baru
          <button onClick={handleConnect} style={btnStyle}>CONNECT WALLET</button>
        ) : isConfirmed ? (
          <a href={`https://basescan.org/tx/${hash}`} target="_blank" style={{...btnStyle, display: 'block', textAlign: 'center', textDecoration: 'none'}}>VIEW RECEIPT</a>
        ) : (
          <button onClick={() => sendTransaction({ to: RECEIVER, value: parseEther(NFT_PRICE) })} disabled={isPending} style={{...btnStyle, opacity: isPending ? 0.5 : 1}}>
            {isPending ? "PROCESSING..." : "MINT NOW"}
          </button>
        )}
        
        {error && <p style={{color: 'red', fontSize: '10px', marginTop: '5px'}}>{error.message.split('.')[0]}</p>}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{padding: 20, textAlign: 'center'}}>LOADING...</div>}>
      <DonutApp />
    </Suspense>
  );
}
