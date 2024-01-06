import { useQuery } from "@tanstack/react-query"
import { getMeasures } from "../services/apiMeasures"
import { IMeasuresResponse } from "../types/measuresTypes"

export function useGetMeasures(tableName: string) {
  const {
    data: measures,
    isLoading,
    error,
  }: IMeasuresResponse = useQuery({
    queryKey: [tableName],
    queryFn: () => getMeasures(tableName),
  })

  measures?.sort((a, b) => a.coefficient - b.coefficient)

  return { measures, isLoading, error }
}
