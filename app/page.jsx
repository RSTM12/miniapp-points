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
  
  // --- CONFIG ---
  const NFT_IMAGE = "https://i.imgur.com/CWDPgYB.jpeg"; // Gambar Donat Neon
  const NFT_TITLE = "DONUT GENESIS #777";
  const NFT_PRICE = "0.00005"; 
  const RECEIVER_ADDRESS = "0x6894ba473eAc0C4D48D1998519070063EcB716c5"; // ⚠️ JANGAN LUPA GANTI INI
  // --------------

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
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-8 px-4 font-sans">
      
      {/* Container Utama */}
      <div className="w-full max-w-sm relative group">
        
        {/* Glow Effect Belakang */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-75 blur"></div>
        
        {/* KARTU KONTEN */}
        <div className="relative bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          
          {/* Gambar */}
          <div className="relative aspect-square w-full">
            <img 
              src={NFT_IMAGE} 
              alt="NFT Preview" 
              className="w-full h-full object-cover"
            />
            {/* Badge */}
            <div className="absolute top-3 right-3 bg-blue-600 text-xs font-bold px-3 py-1 rounded-full text-white shadow-lg">
              BASE
            </div>
          </div>

          <div className="p-6">
            <h1 className="text-2xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {NFT_TITLE}
            </h1>
            <p className="text-gray-400 text-sm mb-6">Digital Collectible</p>

            {/* Harga */}
            <div className="flex justify-between items-center bg-gray-800 p-4 rounded-xl mb-6 border border-gray-700">
              <span className="text-xs text-gray-500 uppercase font-bold">Price</span>
              <span className="text-xl font-bold text-white">{NFT_PRICE} ETH</span>
            </div>

            {/* TOMBOL AKSI */}
            <div className="flex flex-col gap-3">
              {!isConnected ? (
                <button 
                  onClick={() => connect({ connector: injected() })}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-xl transition-all"
                >
                  Connect Wallet
                </button>
              ) : isConfirmed ? (
                <div className="text-center p-4 bg-green-900/50 border border-green-500 rounded-xl">
                  <p className="text-green-400 font-bold mb-1">MINT SUKSES! 🎉</p>
                  <a 
                    href={`https://basescan.org/tx/${hash}`}
                    target="_blank"
                    className="text-xs text-green-300 underline"
                  >
                    Lihat di Explorer
                  </a>
                </div>
              ) : (
                <button
                  onClick={handlePay}
                  disabled={isPending || isConfirming}
                  className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all ${
                    isPending || isConfirming 
                      ? "bg-gray-700 cursor-not-allowed opacity-70" 
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                  }`}
                >
                   {isPending ? "Cek Wallet Kamu..." : isConfirming ? "Sedang Proses..." : "MINT SEKARANG"}
                </button>
              )}
            </div>

            {/* Error Message */}
            {error && (
               <div className="mt-4 p-3 bg-red-900/50 border border-red-800 rounded text-center">
                 <p className="text-xs text-red-200">{error.message.split('.')[0]}</p>
               </div>
            )}
            
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <p className="mt-8 text-xs text-gray-600">Powered by Farcaster</p>

    </div>
  );
}
