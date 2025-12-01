"use client"; // <--- WAJIB: Baris ini harus ada di paling atas!

import { useEffect } from "react";
import sdk from "@farcaster/frame-sdk"; 

export default function Home() {

  useEffect(() => {
    // Fungsi ini memberi tahu Farcaster bahwa aplikasi sudah siap
    // Ini akan menghilangkan error "Ready not called"
    sdk.actions.ready();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Mini App Saya</h1>
      <p>Status: Aplikasi berhasil dimuat!</p>
      
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p>Coba edit file page.jsx untuk mengubah tampilan ini.</p>
      </div>
    </div>
  );
}
