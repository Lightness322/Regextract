import { useQuery } from "@tanstack/react-query"

import { getMeasures } from "../services/apiMeasures"

import { IMeasuresResponse } from "../types/measuresTypes"

export function useGetMeasures() {
  const {
    data: measuresData,
    isLoading: isMeasuresLoading,
    error: measuresError,
  }: IMeasuresResponse = useQuery({
    queryKey: ["measures"],
    queryFn: getMeasures,
  })

  return { measuresData, isMeasuresLoading, measuresError }
}
