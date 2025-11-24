import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConvexReactClient, ConvexProvider } from "convex/react";

// console.log("VITE_CONVEX_URL =", import.meta.env.VITE_CONVEX_URL);

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </React.StrictMode>
);
