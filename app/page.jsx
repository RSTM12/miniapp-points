"use client";

import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [context, setContext] = useState(null); // <--- State untuk simpan data user

  useEffect(() => {
    const load = async () => {
      // 1. Ambil data context (user info)
      const contextData = await sdk.context;
      setContext(contextData);
      
      // 2. Panggil ready()
      sdk.actions.ready();
    };
    
    if (sdk && !isLoaded) {
      setIsLoaded(true);
      load();
    }
  }, [isLoaded]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold text-center">Profil Farcaster Saya</h1>
      
      {/* Tampilkan Data User jika sudah ada */}
      {context?.user ? (
        <div className="text-center">
          {/* Foto Profil */}
          {context.user.pfpUrl && (
            <img 
              src={context.user.pfpUrl} 
              alt="Profile" 
              className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-purple-500"
            />
          )}
          
          {/* Username & FID */}
          <p className="text-lg font-semibold">@{context.user.username}</p>
          <p className="text-gray-500 text-sm">FID: {context.user.fid}</p>
        </div>
      ) : (
        <p className="text-center text-gray-400">Loading data user...</p>
      )}

      {/* Tombol Contoh Interaksi */}
      <div className="mt-6 pt-4 border-t border-gray-100">
         <button 
           className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
           onClick={() => sdk.actions.openUrl("https://warpcast.com")}
         >
           Buka Warpcast
         </button>
      </div>
    </div>
  );
}
