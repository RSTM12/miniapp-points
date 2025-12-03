"use client";

import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { parseEther } from "viem";

const retroFont = { fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '1px' };

export default function Home() {
  const { ready, authenticated, login, user } = usePrivy();
  const { wallets } = useWallets();
  
  const [txStatus, setTxStatus] = useState("");
  const [isMinting, setIsMinting] = useState(false);

  // --- CONFIG ---
  const NFT_IMAGE = "/donut.jpg"; 
  const NFT_TITLE = "DONUT GENESIS #777";
  const NFT_PRICE = "0.00005";
  const RECEIVER = "0x6894ba473eAc0C4D48D1998519070063EcB716c5"; // Ganti Wallet Kamu

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  const handleMint = async () => {
    const wallet = wallets[0];
    if (!wallet) return;
    
    setIsMinting(true);
    setTxStatus("PREPARING...");
    
    try {
      const provider = await wallet.getEthereumProvider();
      const txHash = await provider.request({
        method: "eth_sendTransaction",
        params: [{
          from: wallet.address,
          to: RECEIVER,
          value: parseEther(NFT_PRICE).toString(16),
        }],
      });
      setTxStatus("SUCCESS! HASH: " + txHash.slice(0, 6) + "...");
    } catch (err) {
      setTxStatus("FAILED: " + err.message.slice(0, 20));
    } finally {
      setIsMinting(false);
    }
  };

  const containerStyle = { minHeight: "100vh", backgroundColor: "#fff", color: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", ...retroFont };
  const cardStyle = { width: "100%", maxWidth: "340px", border: "3px solid #000", padding: "5px", boxShadow: "8px 8px 0px #000" };
  const btnStyle = { width: "100%", padding: "15px", border: "3px solid #000", backgroundColor: "#000", color: "#fff", fontWeight: "bold", cursor: "pointer", marginTop: "15px", ...retroFont };

  if (!ready) return <div style={{...containerStyle}}>LOADING SYSTEM...</div>;

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{border: "3px solid #000", marginBottom: "15px", backgroundColor: "#eee"}}>
          <img src={NFT_IMAGE} style={{width: "100%", display: "block", filter: "grayscale(100%) contrast(120%) pixelate(4px)"}} alt="NFT" />
        </div>
        
        <h1 style={{fontSize: "20px", borderBottom: "3px solid #000", paddingBottom: "10px", margin: "0 0 10px 0"}}>{NFT_TITLE}</h1>
        
        <div style={{display: 'flex', justifyContent: 'space-between', border: '2px solid #000', padding: '10px', marginBottom: '10px'}}>
            <div>PRICE: <strong>{NFT_PRICE} ETH</strong></div>
            <div>STATUS: <strong>{authenticated ? "LOGGED IN" : "GUEST"}</strong></div>
        </div>

        {txStatus && <div style={{textAlign: 'center', padding: '10px', border: '2px dashed #000', marginBottom: '10px'}}>{txStatus}</div>}

        {!authenticated ? (
          <button onClick={login} style={btnStyle}>LOGIN WITH FARCASTER</button>
        ) : (
          <button onClick={handleMint} disabled={isMinting} style={{...btnStyle, opacity: isMinting ? 0.5 : 1}}>
            {isMinting ? "MINTING..." : "MINT NOW"}
          </button>
        )}
      </div>
    </div>
  );
}
