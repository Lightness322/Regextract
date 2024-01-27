import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { Session, User } from "@supabase/supabase-js"
import toast from "react-hot-toast"

interface IParams {
  email: string
  password: string
}

type actionFnType = ({ email, password }: IParams) => Promise<{
  user: User | null
  session: Session | null
}>

export function useAuth(actionFn: actionFnType, type: "login" | "register") {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: actionFn,
    onSuccess: (user) => {
      console.log(user)
      queryClient.setQueryData(["currentUser"], user.user)
      navigate("/", { replace: true })
    },
    onError: (error) => {
      console.log(error)
      toast.error(
        type === "login"
          ? "Возникла ошибка при входе"
          : "Такой пользователь уже существует"
      )
    },
  })

  function onSubmit(data: IParams) {
    mutate(data)
  }

  return { onSubmit, isLoading }
}
