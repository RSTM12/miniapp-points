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
  
  // --- KONFIGURASI ---
  const NFT_IMAGE = "https://i.imgur.com/CWDPgYB.jpeg"; 
  const NFT_TITLE = "DONUT GENESIS #777";
  const NFT_PRICE = "0.00005"; 
  const RECEIVER_ADDRESS = "0x6894ba473eAc0C4D48D1998519070063EcB716c5"; // ⚠️ GANTI WALLET KAMU
  // -------------------

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

  // --- STYLE MANUAL (CSS) ---
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#000000",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "20px",
    },
    card: {
      width: "100%",
      maxWidth: "380px",
      backgroundColor: "#111111",
      borderRadius: "20px",
      border: "1px solid #333",
      overflow: "hidden",
      boxShadow: "0 0 40px rgba(168, 85, 247, 0.4)", // Efek Glow Ungu
      position: "relative",
    },
    imageContainer: {
      position: "relative",
      width: "100%",
      aspectRatio: "1/1",
      backgroundColor: "#222",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    badge: {
      position: "absolute",
      top: "12px",
      right: "12px",
      backgroundColor: "#0052FF",
      color: "white",
      fontSize: "12px",
      fontWeight: "bold",
      padding: "4px 12px",
      borderRadius: "100px",
      border: "1px solid #6090FF",
    },
    content: {
      padding: "24px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "800",
      margin: "0 0 4px 0",
      background: "linear-gradient(90deg, #A855F7, #EC4899)", // Gradasi Teks
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subtitle: {
      color: "#888",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "20px",
    },
    priceBox: {
      backgroundColor: "#222",
      border: "1px solid #444",
      borderRadius: "12px",
      padding: "16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
    },
    button: {
      width: "100%",
      padding: "16px",
      borderRadius: "12px",
      border: "none",
      fontWeight: "bold",
      fontSize: "16px",
      cursor: isPending || isConfirming ? "wait" : "pointer",
      backgroundColor: !isConnected ? "#fff" : "#A855F7",
      backgroundImage: isConnected ? "linear-gradient(90deg, #9333EA, #DB2777)" : "none",
      color: !isConnected ? "#000" : "#fff",
      transition: "transform 0.1s",
    },
    successBox: {
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      border: "1px solid #22c55e",
      color: "#4ade80",
      padding: "16px",
      borderRadius: "12px",
      textAlign: "center",
    },
    errorBox: {
      marginTop: "12px",
      padding: "10px",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      border: "1px solid #ef4444",
      color: "#fca5a5",
      fontSize: "12px",
      borderRadius: "8px",
      textAlign: "center",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* GAMBAR */}
        <div style={styles.imageContainer}>
          <img src={NFT_IMAGE} alt="NFT" style={styles.image} />
          <div style={styles.badge}>BASE</div>
        </div>

        {/* KONTEN */}
        <div style={styles.content}>
          <h1 style={styles.title}>{NFT_TITLE}</h1>
          <p style={styles.subtitle}>Cyberpunk Collection</p>

          <div style={styles.priceBox}>
            <div>
              <div style={{fontSize: '10px', color: '#666', fontWeight: 'bold', textTransform: 'uppercase'}}>Price</div>
              <div style={{fontSize: '18px', fontWeight: 'bold'}}>{NFT_PRICE} ETH</div>
            </div>
            <div style={{fontSize: '12px', color: '#A855F7'}}>Available Now</div>
          </div>

          {!isConnected ? (
            <button 
              onClick={() => connect({ connector: injected() })}
              style={styles.button}
            >
              Connect Wallet
            </button>
          ) : isConfirmed ? (
            <div style={styles.successBox}>
              <p style={{fontWeight: 'bold', margin: 0}}>MINT SUCCESS! 🎉</p>
              <a 
                href={`https://basescan.org/tx/${hash}`}
                target="_blank"
                style={{fontSize: '12px', color: '#4ade80', textDecoration: 'underline', marginTop: '4px', display: 'block'}}
              >
                View on Etherscan
              </a>
            </div>
          ) : (
            <button
              onClick={handlePay}
              disabled={isPending || isConfirming}
              style={{
                ...styles.button,
                opacity: isPending || isConfirming ? 0.7 : 1
              }}
            >
              {isPending ? "Confirming..." : isConfirming ? "Processing..." : "MINT NOW"}
            </button>
          )}

          {error && (
            <div style={styles.errorBox}>
              {error.message.split('.')[0]}
            </div>
          )}
        </div>
      </div>
      
      <p style={{fontSize: '10px', color: '#444', marginTop: '20px'}}>Powered by Farcaster</p>
    </div>
  );
}
