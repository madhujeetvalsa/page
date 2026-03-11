"use client";

import { createContext, useState, useContext } from "react";
import { Geist, Geist_Mono, Kalam, Caveat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Context for sharing data availability state across the app
const DataAvailabilityContext = createContext<{
  isDataAvailable: boolean;
  setIsDataAvailable: (value: boolean) => void;
}>({
  isDataAvailable: false,
  setIsDataAvailable: () => {},
});

// Custom hook to easily access the data availability state
export function useDataAvailability() {
  return useContext(DataAvailabilityContext);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Main state: Change this to true/false to control data availability
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kalam.variable} ${caveat.variable} antialiased`}
      >
        <DataAvailabilityContext.Provider value={{ isDataAvailable, setIsDataAvailable }}>
          <SpeedInsights />
          {children}
          <Analytics />
        </DataAvailabilityContext.Provider>
      </body>
    </html>
  );
}

