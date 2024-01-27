import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { getCurrentUser } from "../services/apiUser"

interface IProtectedRouteProps {
  children: React.JSX.Element
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate()

  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  })
  const isAuthenticated = user?.role === "authenticated"

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login")
  }, [isAuthenticated, navigate, isLoading])

  if (isAuthenticated) return children
}

export default ProtectedRoute
