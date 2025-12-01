"use client";

import { useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";

export default function Home() {
  const claim = async () => {
    const res = await fetch("/api/points", { method: "POST" });
    const data = await res.json();
    alert(`Points claimed! Total: ${data.total}`);
  };

  useEffect(() => {
    // WAJIB! → Biar Mini App keluar dari loading state
    sdk.actions.ready();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>⚡ Points Mining Mini App</h1>
      <p>Click the button below to mine points.</p>

      <button
        onClick={claim}
        style={{
          padding: "10px 20px",
          fontSize: 18,
          background: "purple",
          color: "#fff",
          borderRadius: 8,
          border: "none",
        }}
      >
        Mine Points
      </button>
    </div>
  );
}
