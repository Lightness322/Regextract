import { useMutation, useQueryClient } from "@tanstack/react-query"

import { insertMeasure as handleInsertMeasure } from "../services/apiMeasures"

import { TypeSetStateFunction } from "../types/TypeSetStateFunction"

import toast from "react-hot-toast"

interface IUseInsertMeasureOptionParams {
  setIsModalShow: TypeSetStateFunction<boolean>
}

export function useInsertMeasureOption({
  setIsModalShow,
}: IUseInsertMeasureOptionParams) {
  const queryClient = useQueryClient()

  const { mutate: insertMeasure, isPending: isMeasureInserting } = useMutation({
    mutationFn: handleInsertMeasure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["measures"] })
      setIsModalShow(false)
      toast.success("Добавлено")
    },
    onError: (error) => {
      toast.error("Ошибка при добавлении")
      console.log(error)
    },
  })

  return { insertMeasure, isMeasureInserting }
}
