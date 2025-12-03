"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error ke console (kalau di web bisa dilihat)
    console.error(error);
  }, [error]);

  return (
    <div style={{ 
      padding: "20px", 
      backgroundColor: "black", 
      color: "red", 
      minHeight: "100vh",
      fontFamily: "monospace",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h2 style={{fontSize: "20px", marginBottom: "10px"}}>⚠️ APLIKASI CRASH!</h2>
      
      <div style={{ 
        border: "1px solid red", 
        padding: "15px", 
        marginBottom: "20px", 
        width: "100%",
        wordBreak: "break-all",
        backgroundColor: "#220000"
      }}>
        {/* Ini akan memunculkan tulisan errornya di layar HP */}
        Error: {error.message || "Unknown Error"}
      </div>

      <button
        onClick={() => reset()}
        style={{ 
          padding: "15px 30px", 
          backgroundColor: "white", 
          color: "black", 
          border: "none",
          fontWeight: "bold"
        }}
      >
        COBA ULANG (RESET)
      </button>
    </div>
  );
}
