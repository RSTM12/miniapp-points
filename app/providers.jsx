"use client";

// Kita matikan dulu Wagmi biar HP tidak keberatan/crash
export function Providers({ children }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
}
