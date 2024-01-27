import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { Toaster } from "react-hot-toast"

import ProtectedRoute from "./components/ProtectedRoute"
import MainPage from "./pages/MainPage"
import AuthorizationPage from "./pages/AuthorizationPage"

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <AuthorizationPage />,
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
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
            fontSize: "1.4rem",
            fontWeight: "500",
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default App
