"use client";

import { useEffect, useState, Suspense } from "react";
import sdk from "@farcaster/frame-sdk";
import { useAccount, useConnect, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";

const retroFont = { fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '1px' };

function DonutApp() {
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
    sdk.actions.ready();
  }, []);

  useEffect(() => { if (isConfirmed) setCurrentSupply(prev => prev + 1); }, [isConfirmed]);

  const containerStyle = { minHeight: "100vh", backgroundColor: "#fff", color: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", ...retroFont };
  const cardStyle = { width: "100%", maxWidth: "340px", border: "3px solid #000", padding: "5px", boxShadow: "8px 8px 0px #000" };
  const btnStyle = { width: "100%", padding: "12px", border: "2px solid #000", backgroundColor: "#000", color: "#fff", fontWeight: "bold", cursor: "pointer", marginTop: "5px", fontSize: "12px", ...retroFont };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{border: "3px solid #000", marginBottom: "15px", backgroundColor: "#eee", minHeight: "200px"}}>
           <img src={NFT_IMAGE} style={{width: "100%", display: "block", filter: "grayscale(100%) contrast(120%) pixelate(4px)"}} alt="NFT" />
        </div>
        
        <h1 style={{fontSize: "20px", borderBottom: "3px solid #000", paddingBottom: "10px", margin: "0 0 10px 0"}}>{NFT_TITLE}</h1>
        
        <div style={{display: 'flex', justifyContent: 'space-between', border: '2px solid #000', padding: '10px', marginBottom: '10px'}}>
            <div>PRICE: <strong>{NFT_PRICE} ETH</strong></div>
            <div>MINTED: <strong>{currentSupply}/{MAX_SUPPLY}</strong></div>
        </div>

        {isConfirmed && <div style={{textAlign: 'center', padding: '10px', border: '2px dashed #000', marginBottom: '10px'}}>TRANSACTION SUCCESSFUL</div>}

        {!isConnected ? (
          <div style={{marginTop: "10px"}}>
            <p style={{fontSize: '10px', textAlign: 'center', marginBottom: '5px'}}>CHOOSE CONNECTION:</p>
            
            {/* Tampilkan SEMUA opsi koneksi agar kamu bisa pilih yang jalan */}
            {connectors.map((connector) => (
              <button 
                key={connector.uid} 
                onClick={() => connect({ connector })} 
                style={{...btnStyle, backgroundColor: '#fff', color: '#000'}}
              >
                {/* Biasanya yang jalan adalah 'Injected' atau 'Coinbase Wallet' */}
                LOGIN: {connector.name.toUpperCase()}
              </button>
            ))}
            
            {connectError && (
               <div style={{color: 'red', fontSize: '10px', marginTop: '5px', border: '1px solid red', padding: '5px'}}>
                 {connectError.message.slice(0, 50)}...
               </div>
            )}
          </div>
        ) : isConfirmed ? (
          <a href={`https://basescan.org/tx/${hash}`} target="_blank" style={{...btnStyle, display: 'block', textAlign: 'center', textDecoration: 'none'}}>VIEW RECEIPT</a>
        ) : (
          <button onClick={() => sendTransaction({ to: RECEIVER, value: parseEther(NFT_PRICE) })} disabled={isPending} style={{...btnStyle, opacity: isPending ? 0.5 : 1}}>
            {isPending ? "PROCESSING..." : "MINT NOW"}
          </button>
        )}
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
