import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  deleteMeasure as handleDeleteMeasure,
  updateMeasures as handleUpdateMeasures,
} from "../services/apiMeasures"

import { Height } from "react-animate-height"
import { IMeasure } from "../types/measuresTypes"
import { TypeSetStateFunction } from "../types/TypeSetStateFunction"

import toast from "react-hot-toast"

interface IUseChangeMeasureOptionParams {
  setCurrentMeasures: TypeSetStateFunction<IMeasure[]>
}

export function useChangeMeasureOption({
  setCurrentMeasures,
}: IUseChangeMeasureOptionParams) {
  const [saveButtonHeight, setSaveButtonHeight] = useState<Height>(0)

  const queryClient = useQueryClient()

  const { mutate: updateMeasures, isPending: isMeasureUpdating } = useMutation({
    mutationFn: handleUpdateMeasures,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["measures"] })
      setSaveButtonHeight(0)
      setCurrentMeasures((curMeasures) =>
        curMeasures.sort((a, b) => a.coefficient - b.coefficient)
      )
      toast.success("Сохранено")
    },
    onError: (error) => {
      toast.error("Ошибка при сохранении")
      console.log(error)
    },
  })

  const { mutate: deleteMeasure, isPending: isMeasureDeleting } = useMutation({
    mutationFn: handleDeleteMeasure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["measures"] })
      toast.success("Удалено")
    },
    onError: (error) => {
      toast.error("Ошибка при удалении")
      console.log(error)
    },
  })

  return {
    saveButtonHeight,
    setSaveButtonHeight,
    updateMeasures,
    deleteMeasure,
    isMeasureUpdating,
    isMeasureDeleting,
  }
}
