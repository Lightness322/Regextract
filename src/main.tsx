import React from "react"
import ReactDOM from "react-dom/client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"

import App from "./App.tsx"

import "./index.css"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Toaster
      position="bottom-center"
      gutter={12}
      toastOptions={{
        success: {
          duration: 2000,
        },
        error: {
          duration: 4000,
        },
        style: {
          maxWidth: "500px",
          padding: "12px 18px",
          backgroundColor: "#ca8544",
          color: "#ffffff",
          fontSize: "1.5rem",
          fontWeight: "500",
        },
      }}
    />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider>
)
