import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateQuantities as handleUpdateQuantities } from "../services/apiQuantities"

import { Height } from "react-animate-height"

import toast from "react-hot-toast"

export function useChangeQuantityOption() {
  const [saveButtonHeight, setSaveButtonHeight] = useState<Height>(0)

  const queryClient = useQueryClient()

  const { mutate: updateQuantities, isPending: isQuantitiesUpdating } =
    useMutation({
      mutationFn: handleUpdateQuantities,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["quantities"] })
        setSaveButtonHeight(0)
        toast.success("Сохранено")
      },
      onError: (error) => {
        toast.error("Ошибка при сохранении")
        console.log(error)
      },
    })

  return {
    saveButtonHeight,
    setSaveButtonHeight,
    updateQuantities,
    isQuantitiesUpdating,
  }
}
