"use client";

import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";
import { useAccount, useConnect, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { injected } from "wagmi/connectors";

// Font Pixel Retro (Inline CSS biar praktis)
const retroFont = {
  fontFamily: "'Press Start 2P', 'Courier New', monospace",
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
  const NFT_IMAGE = "https://i.imgur.com/CWDPgYB.jpeg"; // Gambar Donat (Masih berwarna, nanti jadi grayscale otomatis)
  const NFT_TITLE = "DONUT GENESIS #777";
  const NFT_PRICE = "0.00005";
  const RECEIVER = "0x6894ba473eAc0C4D48D1998519070063EcB716c5"; // ⚠️ GANTI WALLET KAMU
  // --------------

  useEffect(() => {
    sdk.actions.ready();
    if (!isSDKLoaded) {
      setIsSDKLoaded(true);
      connect({ connector: injected() });
    }
  }, [isSDKLoaded, connect]);

  const handlePay = () => sendTransaction({ to: RECEIVER, value: parseEther(NFT_PRICE) });

  // --- GAYA TAMPILAN RETRO MONOKROM (Inline Styles) ---
  const containerStyle = {
    minHeight: "100vh", backgroundColor: "#ffffff", color: "#000000",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    padding: "20px", ...retroFont
  };

  const cardStyle = {
    width: "100%", maxWidth: "340px", border: "3px solid #000",
    backgroundColor: "#fff", padding: "2px", boxShadow: "5px 5px 0px #000"
  };

  const headerStyle = {
    borderBottom: "3px solid #000", padding: "10px", textAlign: "center",
    fontSize: "14px", fontWeight: "bold", backgroundColor: "#000", color: "#fff"
  };

  const imageContainerStyle = {
    width: "100%", aspectRatio: "1/1", borderBottom: "3px solid #000",
    backgroundColor: "#e0e0e0", overflow: "hidden", position: "relative"
  };

  const imageStyle = {
    width: "100%", height: "100%", objectFit: "cover",
    filter: "grayscale(100%) contrast(150%) pixelate(4px)" // Efek Gambar Pixel & Hitam Putih
  };

  const contentStyle = {
    padding: "15px"
  };

  const infoBoxStyle = {
    border: "2px dashed #000", padding: "10px", marginBottom: "15px",
    display: "flex", justifyContent: "space-between", fontSize: "10px"
  };

  const btnStyle = {
    width: "100%", padding: "15px", border: "3px solid #000",
    backgroundColor: isConnected ? "#000" : "#fff",
    color: isConnected ? "#fff" : "#000",
    fontSize: "12px", fontWeight: "bold", cursor: "pointer", ...retroFont,
    boxShadow: "3px 3px 0px #000", transition: "all 0.1s",
    position: "relative", top: "0px", left: "0px"
  };

  return (
    <div style={containerStyle}>
      {/* Status Bar Retro */}
      <div style={{width: '100%', maxWidth: '340px', border: '3px solid #000', marginBottom: '10px', padding: '5px 10px', fontSize: '10px', display: 'flex', justifyContent: 'space-between', backgroundColor: '#fff'}}>
        <span>SYS: ONLINE</span>
        <span>{isConnected ? `USER: ${address?.slice(0,4)}..${address?.slice(-2)}` : "USER: GUEST"}</span>
      </div>

      <div style={cardStyle}>
        {/* Header */}
        <div style={headerStyle}>
          COLLECTIBLE ITEM
        </div>

        {/* Gambar dengan Efek Retro */}
        <div style={imageContainerStyle}>
          <img src={NFT_IMAGE} style={imageStyle} />
          <div style={{position: 'absolute', bottom: '5px', right: '5px', border: '2px solid #000', backgroundColor: '#fff', padding: '2px 5px', fontSize: '8px'}}>
            BASE NET
          </div>
        </div>
        
        {/* Konten Info */}
        <div style={contentStyle}>
          <h1 style={{fontSize: "16px", margin: "0 0 15px 0", borderBottom: "2px dotted #000", paddingBottom: "5px"}}>
            {NFT_TITLE}
          </h1>

          <div style={infoBoxStyle}>
            <span>PRICE:</span>
            <span style={{fontWeight: "bold"}}>{NFT_PRICE} ETH</span>
          </div>
          <div style={{...infoBoxStyle, borderStyle: 'solid'}}>
            <span>STATUS:</span>
            <span>{isConfirmed ? "OWNED [X]" : "AVAILABLE [ ]"}</span>
          </div>

          {/* Tombol Aksi */}
          {!isConnected ? (
            <button onClick={() => connect({ connector: injected() })} style={btnStyle}>
              [ CONNECT WALLET ]
            </button>
          ) : isConfirmed ? (
            <a href={`https://basescan.org/tx/${hash}`} target="_blank" style={{...btnStyle, display: 'block', textAlign: 'center', textDecoration: 'none', backgroundColor: '#fff', color: '#000'}}>
              [ VIEW RECEIPT ]
            </a>
          ) : (
            <button 
              onClick={handlePay} 
              disabled={isPending} 
              style={{...btnStyle, opacity: isPending ? 0.6 : 1}}
            >
              {isPending ? "PROCESSING..." : `[ MINT NOW ]`}
            </button>
          )}

          {/* Error Log */}
          {error && (
            <div style={{marginTop: "15px", border: "2px solid #000", padding: "5px", fontSize: "8px", backgroundColor: "#f0f0f0"}}>
              ERR: {error.message.split('.')[0].toUpperCase()}
            </div>
          )}
        </div>
      </div>
      
      <p style={{fontSize: "8px", marginTop: "20px", letterSpacing: '2px'}}>
        // POWERED BY FARCASTER //
      </p>
    </div>
  );
}
