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
  
  // Mengambil status wallet user
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  
  // Setup fungsi kirim uang
  const { 
    data: hash, 
    sendTransaction, 
    isPending, 
    error 
  } = useSendTransaction();

  // Cek status transaksi (sukses/gagal)
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    const load = async () => {
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
      // Otomatis coba connect ke wallet Farcaster
      connect({ connector: injected() });
    }
  }, [isSDKLoaded, connect]);

  // --- FUNGSI BAYAR ---
  const handlePay = () => {
    sendTransaction({
      // ⚠️ GANTI INI DENGAN WALLET ADDRESS KAMU ⚠️
      to: "0x6894ba473eAc0C4D48D1998519070063EcB716c5", 
      value: parseEther("0.00005"), // Kirim 0.00005 ETH
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Demo Bayar Native</h1>

      <div className="w-full max-w-sm bg-gray-900 border border-gray-800 p-6 rounded-xl">
        
        {/* Status Koneksi */}
        <div className="mb-6 text-center">
          {!isConnected ? (
            <button 
              onClick={() => connect({ connector: injected() })}
              className="text-blue-400 hover:underline"
            >
              Connect Wallet Manual
            </button>
          ) : (
            <div>
              <p className="text-green-400 text-sm font-bold">Wallet Terhubung ✅</p>
              <p className="text-xs text-gray-500 mt-1">{address}</p>
            </div>
          )}
        </div>

        {/* Tombol Bayar */}
        <button
          onClick={handlePay}
          disabled={!isConnected || isPending || isConfirming}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            !isConnected ? "bg-gray-700 opacity-50 cursor-not-allowed" : 
            isPending ? "bg-yellow-600 cursor-wait" : 
            "bg-blue-600 hover:bg-blue-500 active:scale-95"
          }`}
        >
          {isPending ? "Cek Wallet Kamu..." : 
           isConfirming ? "Sedang Memproses..." : 
           "Bayar 0.00005 ETH"}
        </button>

        {/* Pesan Error */}
        {error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded text-red-200 text-xs break-words">
            Gagal: {error.message.split('.')[0]}
          </div>
        )}

        {/* Pesan Sukses */}
        {isConfirmed && (
          <div className="mt-4 p-3 bg-green-900/30 border border-green-800 rounded text-green-200 text-center text-sm">
            ✅ Pembayaran Berhasil!
          </div>
        )}

      </div>
    </div>
  );
}
