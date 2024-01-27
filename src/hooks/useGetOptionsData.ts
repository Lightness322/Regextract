import { useQuery } from "@tanstack/react-query"
import { useUserId } from "./useUserId"

import { getQuantities } from "../services/apiQuantities"
import { getMeasures } from "../services/apiMeasures"
import { getWords } from "../services/apiWords"

import { IQuantityResponse } from "../types/quantitiesTypes"
import { IMeasuresResponse } from "../types/measuresTypes"
import { IWordsResponse } from "../types/wordsTypes"

export function useGetOptionsData() {
  const { userId } = useUserId()

  const {
    data: measuresData,
    isLoading: isMeasuresLoading,
    error: measuresError,
  }: IMeasuresResponse = useQuery({
    queryKey: ["measures"],
    queryFn: () => getMeasures(userId),
  })

  const {
    data: wordsData,
    isLoading: isWordsLoading,
    error: wordsError,
  }: IWordsResponse = useQuery({
    queryKey: ["words"],
    queryFn: () => getWords(userId),
  })

  const {
    data: quantitiesData,
    isLoading: isQuantitiesLoading,
    error: quantitiesError,
  }: IQuantityResponse = useQuery({
    queryKey: ["quantities"],
    queryFn: () => getQuantities(userId),
  })

  const optionsData = { measuresData, wordsData, quantitiesData }

  const isOptionsDataLoading =
    isMeasuresLoading || isWordsLoading || isQuantitiesLoading

  const optionsDataGetError = measuresError || wordsError || quantitiesError

  return { optionsData, isOptionsDataLoading, optionsDataGetError }
}
