"use client";

import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();

  useEffect(() => {
    // Panggil ready
    sdk.actions.ready();
    setIsReady(true);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", 
      backgroundColor: "white", 
      color: "black", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      padding: "20px",
      fontFamily: "monospace"
    }}>
      <h1 style={{fontSize: "24px", fontWeight: "bold", marginBottom: "20px"}}>
        DONUT APP v1.0
      </h1>

      <div style={{border: "2px solid black", padding: "10px", width: "100%", textAlign: "center"}}>
        <p>STATUS: {isReady ? "SIAP" : "LOADING..."}</p>
        <p>WALLET: {isConnected ? "TERHUBUNG" : "BELUM"}</p>
        {isConnected && <p style={{fontSize: "10px"}}>{address}</p>}
      </div>

      {!isConnected && (
        <button 
          onClick={() => connect({ connector: injected() })}
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            fontWeight: "bold",
            width: "100%"
          }}
        >
          CONNECT WALLET
        </button>
      )}
    </div>
  );
}
