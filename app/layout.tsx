"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import Navbar from "./Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>RechargeSys - Mobile Prepaid Recharge Portal</title>
        <meta name="description" content="Instant prepaid mobile recharge for Airtel, Jio, Vi, and BSNL" />
      </head>
      <body>
        <Provider store={store}>
          <Navbar />
          <main className="main-content">{children}</main>
          <footer className="footer">
            <div style={{ maxWidth: "1040px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <strong>RechargeSys</strong> &bull; Fast, Secure &amp; Seamless Telecom Recharge Portal
              </div>
              <div style={{ color: "#64748b", fontSize: "12px" }}>
                Supports Airtel &bull; Jio &bull; Vi &bull; BSNL &bull; 256-bit SSL Encrypted
              </div>
            </div>
          </footer>
        </Provider>
      </body>
    </html>
  );
}