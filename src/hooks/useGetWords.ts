import { useQuery } from "@tanstack/react-query"

import { getWords } from "../services/apiWords"

import { IWordsResponse } from "../types/wordsTypes"

export function useGetWords() {
  const {
    data: wordsData,
    isLoading: isWordsLoading,
    error: wordsError,
  }: IWordsResponse = useQuery({
    queryKey: ["words"],
    queryFn: getWords,
  })

  return { wordsData, isWordsLoading, wordsError }
}
