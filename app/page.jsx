"use client";

import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      // Panggil ready() agar splash screen hilang
      sdk.actions.ready();
    };
    
    // Jalankan segera
    load();
    setIsLoaded(true);
  }, []);

  return (
    <div style={{ 
      padding: "20px", 
      fontFamily: "system-ui, sans-serif",
      textAlign: "center",
      backgroundColor: "#f0f0f0",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}>
      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
        Mini App Berhasil!
      </h1>
      
      <p style={{ color: "#666" }}>
        {isLoaded ? "Status: SDK Ready ✅" : "Loading..."}
      </p>

      <div style={{ marginTop: "20px", padding: "10px", background: "white", borderRadius: "8px" }}>
        <p>Sekarang kamu bisa mulai coding fitur lain di file page.jsx</p>
      </div>
    </div>
  );
}
