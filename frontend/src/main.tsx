import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import App from "./App";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { background: "#12121A", color: "#fff", border: "1px solid #27272A" }
          }}
        />
      </ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>
);
