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
  const NFT_IMAGE = "[https://i.imgur.com/CWDPgYB.jpeg)"; 
  const NFT_TITLE = "DONUT GENESIS #777";
  const NFT_PRICE = "0.00005"; 
  const RECEIVER_ADDRESS = "0x6894ba473eAc0C4D48D1998519070063EcB716c5"; // ⚠️ GANTI WALLET ADDRESS INI
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Container Utama */}
      <div className="w-full max-w-sm relative group">
        
        {/* Efek Cahaya Belakang (Glow) */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        
        {/* Kartu Konten */}
        <div className="relative w-full bg-gray-900 ring-1 ring-gray-900/5 rounded-2xl leading-none flex flex-col overflow-hidden">
          
          {/* Bagian Gambar */}
          <div className="relative aspect-square w-full bg-gray-800">
            <img 
              src={NFT_IMAGE} 
              alt="NFT Preview" 
              className="w-full h-full object-cover"
            />
            {/* Badge Pojok Kanan */}
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-blue-400">
                BASE
              </span>
            </div>
          </div>

          {/* Bagian Info & Tombol */}
          <div className="p-6 space-y-4">
            
            {/* Judul */}
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {NFT_TITLE}
              </h1>
              <p className="text-gray-400 text-sm mt-1">Cyberpunk Collection</p>
            </div>

            {/* Harga */}
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Price</p>
                <p className="text-white text-lg font-mono font-bold">{NFT_PRICE} ETH</p>
              </div>
              <div className="text-right">
                <p className="text-purple-400 text-xs">Available Now</p>
              </div>
            </div>

            {/* Tombol Logika */}
            <div className="pt-2">
              {!isConnected ? (
                <button 
                  onClick={() => connect({ connector: injected() })}
                  className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all transform active:scale-95"
                >
                  Connect Wallet
                </button>
              ) : isConfirmed ? (
                <div className="w-full bg-green-900/30 border border-green-500 text-green-400 p-4 rounded-xl text-center">
                  <p className="font-bold">MINT SUKSES! 🎉</p>
                  <a 
                    href={`https://basescan.org/tx/${hash}`}
                    target="_blank"
                    className="text-xs underline mt-2 block hover:text-green-300"
                  >
                    Lihat Bukti Transaksi
                  </a>
                </div>
              ) : (
                <button
                  onClick={handlePay}
                  disabled={isPending || isConfirming}
                  className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-xl transition-all transform active:scale-95 ${
                    isPending || isConfirming 
                    ? "bg-gray-600 cursor-not-allowed" 
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                  }`}
                >
                  {isPending ? "Cek Wallet..." : isConfirming ? "Memproses..." : "MINT SEKARANG"}
                </button>
              )}
            </div>

            {/* Pesan Error */}
            {error && (
              <div className="text-xs text-red-400 bg-red-900/30 p-2 rounded text-center border border-red-800 mt-2">
                {error.message.split('.')[0]}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
