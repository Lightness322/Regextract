import { useMutation, useQueryClient } from "@tanstack/react-query"

import { insertWord as handleWordInsert } from "../services/apiWords"

import { TypeSetStateFunction } from "../types/TypeSetStateFunction"

import toast from "react-hot-toast"

interface IUseInsertWordOptionParams {
  setIsModalShow: TypeSetStateFunction<boolean>
}

export function useInsertWordOption({
  setIsModalShow,
}: IUseInsertWordOptionParams) {
  const queryClient = useQueryClient()

  const { mutate: insertWord, isPending: isWordInserting } = useMutation({
    mutationFn: handleWordInsert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] })
      setIsModalShow(false)
      toast.success("Добавлено")
    },
    onError: (error) => {
      toast.error("Ошибка при добавлении")
      console.log(error)
    },
  })

  return { insertWord, isWordInserting }
}
