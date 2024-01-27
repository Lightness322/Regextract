import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { logOut as logOutHandler } from "../services/apiUser"

export function useLogOut() {
  const navigate = useNavigate()

  const { mutate: logOut, isPending: isLoggingOut } = useMutation({
    mutationFn: logOutHandler,
    onSuccess: () => navigate("/login"),
    onError: (error) => console.log(error),
  })

  function handleLogOut() {
    logOut()
  }

  return { handleLogOut, isLoggingOut }
}
