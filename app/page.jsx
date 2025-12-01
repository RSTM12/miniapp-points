"use client";

export default function Home() {
  async function claim() {
    const res = await fetch("/api/points", { method: "POST" });
    const data = await res.json();
    alert("Points claimed! Total: " + data.total);
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>🎯 Points Mining Mini App</h1>
      <p>Click button to mine points.</p>

      <button
        onClick={claim}
        style={{
          padding: "12px 20px",
          marginTop: 20,
          fontSize: 18,
          borderRadius: 8,
          background: "purple",
          color: "white"
        }}
      >
        Claim Points
      </button>
    </div>
  );
}
