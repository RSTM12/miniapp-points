"use client";

import { useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";

export default function Home() {

  // 🔥 WAJIB — beri tahu Farcaster bahwa mini-app siap
  useEffect(() => {
    sdk.ready();
  }, []);

  async function claim() {
    const res = await fetch("/api/points", { method: "POST" });
    const data = await res.json();
    alert("Points claimed! Total: " + data.total);
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>💠 Points Mining Mini App</h1>
      <p>Click button to mine points.</p>

      <button
        onClick={claim}
        style={{
          padding: "12px 20px",
          background: "purple",
          color: "white",
          borderRadius: 10,
          border: 0,
          marginTop: 10
        }}
      >
        Claim Points
      </button>
    </div>
  );
}
