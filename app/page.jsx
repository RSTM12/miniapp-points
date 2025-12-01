"use client";

import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";
import { 
  useAccount, 
  useConnect, 
  useSendTransaction, 
  useWaitForTransactionReceipt 
} from "wagmi";
import { parseEther } from "viem";
import { injected } from "wagmi/connectors";

export default function Home() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  
  // --- KONFIGURASI KAMU ---
  const NFT_IMAGE = "https://i.imgur.com/CWDPgYB.jpeg"; // Link Donat Neon
  const NFT_TITLE = "DONUT GENESIS #777";
  const NFT_PRICE = "0.00005"; 
  const RECEIVER_ADDRESS = "0x6894ba473eAc0C4D48D1998519070063EcB716c5"; // ⚠️ GANTI WALLET KAMU
  // ------------------------

  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  
  const { 
    data: hash, 
    sendTransaction, 
    isPending, 
    error 
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    const load = async () => {
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
      connect({ connector: injected() });
    }
  }, [isSDKLoaded, connect]);

  const handlePay = () => {
    sendTransaction({
      to: RECEIVER_ADDRESS,
      value: parseEther(NFT_PRICE),
    });
  };

  return (
    // BACKGROUND UTAMA: Gradasi Gelap Futuristik
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black text-white flex flex-col items-center py-10 px-4 font-sans selection:bg-purple-500 selection:text-white">
      
      {/* Container Utama dengan Efek Kaca (Glassmorphism) & Glow */}
      <div className="w-full max-w-sm relative group">
        
        {/* Efek Glow di belakang kartu */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        
        {/* KARTU KONTEN */}
        <div className="relative w-full bg-black rounded-2xl border border-gray-800 overflow-hidden">
          
          {/* Header Gambar */}
          <div className="relative aspect-square w-full bg-gray-900 overflow-hidden">
             {/* Gambar NFT dengan animasi hover zoom halus */}
            <img 
              src={NFT_IMAGE} 
              alt="NFT Preview" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
            
            {/* Badge Jaringan */}
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="bg-blue-600/80 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30 text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]">
                BASE
              </span>
            </div>

            {/* Status Koneksi (Pojok Kanan Atas) */}
            <div className="absolute top-3 right-3">
              {isConnected && (
                <div className="flex items-center gap-1 bg-green-500/20 backdrop-blur-md px-2 py-1 rounded-full border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-green-300 font-mono">
                    {address?.slice(0, 4)}...{address?.slice(-4)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Bagian Bawah Kartu */}
          <div className="p-6 space-y-6">
            
            {/* Judul & Harga */}
            <div className="text-center">
              <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2 drop-shadow-sm">
                {NFT_TITLE}
              </h1>
              <p className="text-gray-400 text-sm tracking-wide uppercase">Exclusive Digital Collectible</p>
            </div>

            {/* Kotak Harga */}
            <div className="flex items-center justify-between bg-gray-900/80 p-4 rounded-xl border border-gray-700/50">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase font-bold">Price</span>
                <span className="text-xl font-bold text-white">{NFT_PRICE} ETH</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-purple-400 font-mono">≈ $0.03 USD</span>
              </div>
            </div>

            {/* --- LOGIKA TOMBOL (Sama, tapi beda gaya) --- */}
            <div className="pt-2">
              {!isConnected ? (
                <button 
                  onClick={() => connect({ connector: injected() })}
                  className="w-full group relative overflow-hidden rounded-xl bg-gray-800 px-8 py-4 transition-all hover:bg-gray-700"
                >
                  <span className="relative font-bold text-gray-200 group-hover:text-white">Connect Wallet</span>
                </button>
              ) : isConfirmed ? (
                // Tampilan SUKSES
                <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-xl animate-in fade-in zoom-in duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-400 mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-green-400 font-bold text-lg mb-1">MINT SUKSES!</h3>
                  <p className="text-gray-400 text-xs mb-4">Aset sudah dikirim ke wallet kamu.</p>
                  <a 
                    href={`https://basescan.org/tx/${hash}`}
                    target="_blank"
                    className="inline-block bg-green-600/20 hover:bg-green-600/30 text-green-300 text-xs px-4 py-2 rounded-lg transition"
                  >
                    Lihat Bukti (Etherscan) ↗
                  </a>
                </div>
              ) : (
                // TOMBOL MINT UTAMA
                <button
                  onClick={handlePay}
                  disabled={isPending || isConfirming}
                  className={`w-full relative py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all transform active:scale-95 overflow-hidden
                    ${isPending || isConfirming 
                      ? "bg-gray-700 cursor-not-allowed opacity-80" 
                      : "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 bg-[length:200%_auto] animate-gradient"
                    }`}
                >
                  {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Cek Wallet...
                    </span>
                  ) : isConfirming ? (
                    <span className="animate-pulse">Sedang Memproses...</span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      MINT SEKARANG <span className="text-white/60 text-sm font-normal">| {NFT_PRICE} ETH</span>
                    </span>
                  )}
                </button>
              )}
            </div>

            {/* Error Message */}
            {error && (
               <div className="bg-red-500/10 border border-red-500/2
