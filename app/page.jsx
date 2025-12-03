"use client";

import { useEffect, useState, Suspense } from "react";
import sdk from "@farcaster/frame-sdk";
import { useAccount, useConnect, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";

const retroFont = { fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '1px' };

function DonutApp() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const { data: hash, sendTransaction, isPending, error: txError } = useSendTransaction();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // --- STATE ---
  const [walletDetected, setWalletDetected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // --- CONFIG ---
  const NFT_IMAGE = "/donut.jpg"; 
  const NFT_TITLE = "DONUT GENESIS #777";
  const NFT_PRICE = "0.00005";
  const RECEIVER = "0x6894ba473eAc0C4D48D1998519070063EcB716c5"; // Ganti Wallet

  // --- 1. INISIALISASI SDK ---
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  // --- 2. RADAR PENCARI DOMPET (LOOPING) ---
  useEffect(() => {
    // Fungsi pengecekan
    const checkWallet = () => {
      if (typeof window !== "undefined" && window.ethereum) {
        console.log("✅ Wallet Ditemukan!");
        setWalletDetected(true);
        return true; // Berhenti mencari
      }
      return false; // Lanjut mencari
    };

    // Cek pertama kali
    if (checkWallet()) return;

    // Pasang Interval (Cek setiap 1 detik selama 10 detik)
    const interval = setInterval(() => {
      setRetryCount(prev => prev + 1);
      if (checkWallet()) {
        clearInterval(interval);
      }
    }, 1000);

    // Stop setelah 10 detik biar gak boros baterai
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // --- FUNGSI CONNECT PINTAR ---
  const handleSmartConnect = () => {
    // Kita cari konektor yang "Injected" (Paling standar)
    const injected = connectors.find(c => c.id === 'injected');
    
    // Atau cari yang namanya "Coinbase Wallet" (Khusus Farcaster)
    const coinbase = connectors.find(c => c.id === 'coinbaseWalletSDK');

    if (walletDetected) {
      // Prioritas 1: Injected (Karena window.ethereum sudah terdeteksi)
      if (injected) connect({ connector: injected });
      else if (coinbase) connect({ connector: coinbase });
      else if (connectors.length > 0) connect({ connector: connectors[0] });
    } else {
      // Kalau belum terdeteksi tapi user maksa klik, kita coba Injected
      if (injected) connect({ connector: injected });
      else alert("Dompet belum siap, tunggu sebentar...");
    }
  };

  const containerStyle = { minHeight: "100vh", backgroundColor: "#fff", color: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", ...retroFont };
  const cardStyle = { width: "100%", maxWidth: "340px", border: "3px solid #000", padding: "5px", boxShadow: "8px 8px 0px #000" };
  const btnStyle = { width: "100%", padding: "15px", border: "3px solid #000", backgroundColor: isConnected ? "#000" : "#fff", color: isConnected ? "#fff" : "#000", fontWeight: "bold", cursor: "pointer", marginTop: "10px", ...retroFont };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Gambar */}
        <div style={{border: "3px solid #000", marginBottom: "15px"}}>
           <img src={NFT_IMAGE} style={{width: "100%", display: "block", filter: "grayscale(100%) contrast(120%) pixelate(4px)"}} alt="NFT" />
        </div>
        
        <h1 style={{fontSize: "20px", borderBottom: "3px solid #000", paddingBottom: "10px", margin: "0 0 10px 0"}}>{NFT_TITLE}</h1>
        
        <div style={{display: 'flex', justifyContent: 'space-between', border: '2px solid #000', padding: '10px', marginBottom: '10px'}}>
            <div>PRICE: <strong>{NFT_PRICE} ETH</strong></div>
            <div>
               {/* Indikator Status Dompet */}
               WALLET: {walletDetected ? "✅ READY" : `🔍 SCANNING (${retryCount})...`}
            </div>
        </div>

        {isConfirmed && <div style={{textAlign: 'center', padding: '10px', border: '2px dashed #000'}}>TRANSACTION SUCCESSFUL</div>}

        {!isConnected ? (
          <button 
            onClick={handleSmartConnect} 
            style={{...btnStyle, opacity: walletDetected ? 1 : 0.5}}
            disabled={!walletDetected} // Tombol mati kalau dompet belum ketemu
          >
            {walletDetected ? "CONNECT WALLET" : "WAITING WALLET..."}
          </button>
        ) : (
          <button onClick={() => sendTransaction({ to: RECEIVER, value: parseEther(NFT_PRICE) })} disabled={isPending} style={{...btnStyle, opacity: isPending ? 0.5 : 1}}>
            {isPending ? "PROCESSING..." : "MINT NOW"}
          </button>
        )}
        
        {txError && <p style={{color: 'red', fontSize: '10px', marginTop: '5px'}}>{txError.message.split('.')[0]}</p>}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>LOADING...</div>}>
      <DonutApp />
    </Suspense>
  );
}
