"use client";

// Provider kosong agar tidak error build
export function Providers({ children }) {
  return (
    <>
      {children}
    </>
  );
}
