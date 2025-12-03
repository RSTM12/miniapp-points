"use client";

import { useEffect, useState, useCallback } from "react";
import sdk from "@farcaster/frame-sdk";
import { useAccount, useConnect, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { injected } from "wagmi/connectors";

// Font gaya retro
const retroFont = { fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '1px' };

export default function Home() {
  // --- STATE UNTUK DEBUGGING ---
  const [logs, setLogs] = useState([]);
  const addLog = useCallback((msg) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
    console.log(msg);
  }, []);

  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const { isConnected, address, status } = useAccount();
  const { connect, connectors } = useConnect();
  const { data: hash, sendTransaction, isPending, error } = useSendTransaction();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const NFT_IMAGE = "/donut.jpg"; 
  const NFT_TITLE = "DONUT GENESIS #777";
  const NFT_PRICE = "0.00005";
  const RECEIVER = "0x6894ba473eAc0C4D48D1998519070063EcB716c5";
  
  const [currentSupply, setCurrentSupply] = useState(742); 
  const MAX_SUPPLY = 1000;

  useEffect(() => {
    // Log saat komponen mulai
    addLog("App Mounted. Starting Init...");

    const load = async () => {
      try {
        addLog("Calling sdk.context...");
        const context = await sdk.context;
        addLog(`Context loaded. User: ${context?.user?.username || 'Unknown'}`);
        
        addLog("Calling sdk.actions.ready()...");
        sdk.actions.ready();
        addLog("SDK Ready called!");
        
        setIsSDKLoaded(true);
      } catch (err) {
        addLog(`SDK Error: ${err.message}`);
      }
    };

    if (sdk && !isSDKLoaded) {
      load();
    }
    
    // Auto connect attempt
    if (!isConnected && connectors.length > 0) {
        addLog(`Trying auto-connect with ${connectors[0].name}`);
        connect({ connector: connectors[0] });
    }

  }, [isSDKLoaded, isConnected, connect, connectors, addLog]);

  // Handle Pay Error Log
  useEffect(() => {
    if (error) addLog(`Transaction Error: ${error.message}`);
  }, [error, addLog]);

  const handlePay = () => {
    addLog("Button Clicked. Initiating Transaction...");
    try {
        sendTransaction({ to: RECEIVER, value: parseEther(NFT_PRICE) });
    } catch (e) {
        addLog(`SendTx Error: ${e.message}`);
    }
  };

  const containerStyle = { minHeight: "100vh", backgroundColor: "#fff", color: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", ...retroFont };
  const cardStyle = { width: "100%", maxWidth: "340px", border: "3px solid #000", padding: "5px", boxShadow: "8px 8px 0px #000" };
  const btnStyle = { width: "100%", padding: "15px", border: "3px solid #000", backgroundColor: isConnected ? "#000" : "#fff", color: isConnected ? "#fff" : "#000", fontWeight: "bold", cursor: "pointer", marginTop: "15px", ...retroFont };

  return (
    <div style={containerStyle}>
      {/* --- KOTAK LOG DEBUGGER (HANYA MUNCUL DI SINI) --- */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '150px', 
        backgroundColor: 'rgba(0,0,0,0.8)', color: '#0f0', fontSize: '10px', 
        overflowY: 'scroll', padding: '10px', zIndex: 9999, fontFamily: 'monospace'
      }}>
        <div>=== DEBUG LOG ===</div>
        {logs.map((log, i) => <div key={i}>{log}</div>)}
      </div>
      {/* ----------------------------------------------- */}

      <div style={cardStyle}>
        <div style={{border: "3px solid #000", marginBottom: "15px"}}>
          <img src={NFT_IMAGE} style={{width: "100%", display: "block", filter: "grayscale(100%) contrast(120%) pixelate(4px)"}} alt="NFT" />
        </div>
        
        <h1 style={{fontSize: "20px", borderBottom: "3px solid #000", paddingBottom: "10px", margin: "0 0 10px 0"}}>{NFT_TITLE}</h1>
        
        <div style={{display: 'flex', justifyContent: 'space-between', border: '2px solid #000', padding: '10px', marginBottom: '10px'}}>
            <div>PRICE: <strong>{NFT_PRICE} ETH</strong></div>
            <div>STATUS: <strong>{status}</strong></div>
        </div>

        {isConfirmed && <div style={{textAlign: 'center', padding: '10px', border: '2px dashed #000'}}>TRANSACTION SUCCESSFUL</div>}

        {!isConnected ? (
          <button onClick={() => connect({ connector: injected() })} style={btnStyle}>CONNECT WALLET</button>
        ) : isConfirmed ? (
          <a href={`https://basescan.org/tx/${hash}`} target="_blank" style={{...btnStyle, display: 'block', textAlign: 'center', textDecoration: 'none'}}>VIEW RECEIPT</a>
        ) : (
          <button onClick={handlePay} disabled={isPending} style={{...btnStyle, opacity: isPending ? 0.5 : 1}}>
            {isPending ? "PROCESSING..." : "MINT NOW"}
          </button>
        )}
      </div>
    </div>
  );
}
