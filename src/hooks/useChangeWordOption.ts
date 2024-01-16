import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  deleteWord as handleDeleteWord,
  updateWords as handleUpdateWords,
} from "../services/apiWords"

import { TypeSetStateFunction } from "../types/TypeSetStateFunction"
import { IWord } from "../types/wordsTypes"
import { Height } from "react-animate-height"

import { deleteWordDuplicates } from "../utils/helpers"

import toast from "react-hot-toast"

interface IUseChangeWordOptionParams {
  setCurrentWords: TypeSetStateFunction<IWord[]>
}

export function useChangeWordOption({
  setCurrentWords,
}: IUseChangeWordOptionParams) {
  const [saveButtonHeight, setSaveButtonHeight] = useState<Height>(0)

  const queryClient = useQueryClient()

  const { mutate: updateWords, isPending: isWordsUpdating } = useMutation({
    mutationFn: handleUpdateWords,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] })
      setCurrentWords((curWords) =>
        deleteWordDuplicates(curWords).sort((a, b) => {
          if (a.variants.toLowerCase() > b.variants.toLowerCase()) {
            return 1
          }
          if (a.variants.toLowerCase() < b.variants.toLowerCase()) {
            return -1
          }
          return 0
        })
      )
      setSaveButtonHeight(0)
      toast.success("Сохранено")
    },
    onError: (error) => {
      toast.error("Ошибка при сохранении")
      console.log(error)
    },
  })

  const { mutate: deleteWord, isPending: isWordDeleting } = useMutation({
    mutationFn: handleDeleteWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] })
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
    updateWords,
    deleteWord,
    isWordsUpdating,
    isWordDeleting,
  }
}
