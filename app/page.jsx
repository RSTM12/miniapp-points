"use client";

import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { parseEther } from "viem";

// Font Retro
const retroFont = { fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '1px' };

export default function Home() {
  // Ambil fungsi logout dari Privy
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();
  
  const [txStatus, setTxStatus] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  
  // --- FITUR SUPPLY DIKEMBALIKAN ---
  const [currentSupply, setCurrentSupply] = useState(742); 
  const MAX_SUPPLY = 1000;

  // --- CONFIG ---
  const NFT_IMAGE = "/donut.jpg"; 
  const NFT_TITLE = "DONUT GENESIS #777";
  const NFT_PRICE = "0.00005";
  // Ganti dengan wallet penerima kamu
  const RECEIVER = "0x6894ba473eAc0C4D48D1998519070063EcB716c5"; 

  useEffect(() => {
    if (sdk && sdk.actions) {
      sdk.actions.ready();
    }
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
      
      setTxStatus("SUCCESS! TX SENT");
      // Tambah supply pura-pura agar terlihat live
      setCurrentSupply(prev => Math.min(prev + 1, MAX_SUPPLY));
    } catch (err) {
      console.error(err);
      setTxStatus("FAILED: " + (err.message ? err.message.slice(0, 15) : "Error") + "...");
    } finally {
      setIsMinting(false);
    }
  };

  // Styles
  const containerStyle = { minHeight: "100vh", backgroundColor: "#fff", color: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", ...retroFont };
  const cardStyle = { width: "100%", maxWidth: "340px", border: "3px solid #000", padding: "5px", boxShadow: "8px 8px 0px #000", backgroundColor: "white" };
  const btnStyle = { width: "100%", padding: "15px", border: "3px solid #000", backgroundColor: "#000", color: "#fff", fontWeight: "bold", cursor: "pointer", marginTop: "15px", ...retroFont };
  const logoutBtnStyle = { width: "100%", padding: "10px", border: "2px solid #red", backgroundColor: "#fff", color: "red", fontWeight: "bold", cursor: "pointer", marginTop: "10px", fontSize: "12px", ...retroFont };

  // Loading Screen
  if (!ready) return <div style={containerStyle}>LOADING SYSTEM...</div>;

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* GAMBAR */}
        <div style={{border: "3px solid #000", marginBottom: "15px", backgroundColor: "#eee", minHeight: "200px"}}>
          <img src={NFT_IMAGE} style={{width: "100%", display: "block", filter: "grayscale(100%) contrast(120%) pixelate(4px)"}} alt="NFT" />
        </div>
        
        <h1 style={{fontSize: "20px", borderBottom: "3px solid #000", paddingBottom: "10px", margin: "0 0 10px 0"}}>{NFT_TITLE}</h1>
        
        {/* INFO HARGA & SUPPLY */}
        <div style={{display: 'flex', justifyContent: 'space-between', border: '2px solid #000', padding: '10px', marginBottom: '10px'}}>
            <div>
                <div style={{fontSize: '10px', color: '#555'}}>PRICE</div>
                <strong>{NFT_PRICE} ETH</strong>
            </div>
            <div style={{textAlign: 'right'}}>
                <div style={{fontSize: '10px', color: '#555'}}>MINTED</div>
                <strong>{currentSupply}/{MAX_SUPPLY}</strong>
            </div>
        </div>

        {/* STATUS MINTING */}
        {txStatus && (
          <div style={{textAlign: 'center', padding: '10px', border: '2px dashed #000', marginBottom: '10px', fontSize: '12px', backgroundColor: '#f0f0f0'}}>
            {txStatus}
          </div>
        )}

        {/* LOGIKA TOMBOL */}
        {!authenticated ? (
          <button onClick={login} style={btnStyle}>LOGIN WITH FARCASTER</button>
        ) : (
          <div>
            <button 
              onClick={handleMint} 
              disabled={isMinting} 
              style={{...btnStyle, opacity: isMinting ? 0.5 : 1}}
            >
              {isMinting ? "PROCESSING..." : "MINT NOW"}
            </button>
            
            {/* TOMBOL DISCONNECT BARU */}
            <button onClick={logout} style={logoutBtnStyle}>
              [ DISCONNECT ]
            </button>
          </div>
        )}
      </div>
      
      {/* Footer Info User */}
      {authenticated && wallets[0] && (
        <div style={{marginTop: "20px", fontSize: "10px", color: "#888", textAlign: 'center'}}>
          <p>USER: {user?.farcaster?.username || "Guest"}</p>
          <p>WALLET: {wallets[0].address.slice(0,6)}...{wallets[0].address.slice(-4)}</p>
        </div>
      )}
    </div>
  );
}
