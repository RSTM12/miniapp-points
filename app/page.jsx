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
  
  // --- KONFIGURASI (Ubah Sesuai Keinginan) ---
  const NFT_IMAGE = "https://i.imgur.com/CWDPgYB.jpeg"; // Ganti link gambar kamu
  const NFT_TITLE = "DONUT GENESIS #001";
  const NFT_PRICE = "0.00005"; // Harga dalam ETH
  const RECEIVER_ADDRESS = "0x6894ba473eAc0C4D48D1998519070063EcB716c5"; // ⚠️ GANTI DENGAN WALLET KAMU
  // -------------------------------------------

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
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-8 px-4 font-sans">
      
      {/* 1. KARTU NFT */}
      <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Gambar Utama */}
        <div className="relative w-full aspect-square">
          <img 
            src={NFT_IMAGE} 
            alt="NFT Preview" 
            className="w-full h-full object-cover"
          />
          {/* Badge Status */}
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full border border-white/10">
            BASE NETWORK
          </div>
        </div>

        {/* Informasi NFT */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-1">{NFT_TITLE}</h1>
          <p className="text-gray-400 text-sm mb-6">Limited Edition Collection</p>

          <div className="flex justify-between items-center bg-gray-800/50 p-4 rounded-xl border border-gray-700 mb-6">
            <span className="text-gray-400 text-sm">Harga Mint</span>
            <span className="text-xl font-bold text-white">{NFT_PRICE} ETH</span>
          </div>

          {/* 2. TOMBOL AKSI */}
          {!isConnected ? (
            <button 
              onClick={() => connect({ connector: injected() })}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all"
            >
              Connect Wallet
            </button>
          ) : isConfirmed ? (
            <div className="text-center p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
              <p className="text-green-400 font-bold mb-1">🎉 Berhasil Dimiliki!</p>
              <a 
                href={`https://basescan.org/tx/${hash}`}
                target="_blank"
                className="text-xs text-green-300 underline hover:text-green-200"
              >
                Lihat Bukti Transaksi
              </a>
            </div>
          ) : (
            <button
              onClick={handlePay}
              disabled={isPending || isConfirming}
              className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${
                isPending || isConfirming
                  ? "bg-gray-700 text-gray-400 cursor-wait"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transform active:scale-95"
              }`}
            >
              {isPending ? "Konfirmasi di Wallet..." : 
               isConfirming ? "Sedang Memproses..." : 
               `Mint Sekarang (${NFT_PRICE} ETH)`}
            </button>
          )}

          {/* Error Message */}
          {error && (
            <p className="mt-4 text-xs text-red-400 text-center">
              {error.message.split('.')[0]}
            </p>
          )}
        </div>
      </div>

      {/* Footer Kecil */}
      <p className="mt-8 text-xs text-gray-600">
        Powered by Farcaster Frames v2
      </p>
    </div>
  );
}
