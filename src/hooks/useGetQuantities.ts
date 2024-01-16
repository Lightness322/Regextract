import { useQuery } from "@tanstack/react-query"

import { getQuantities } from "../services/apiQuantities"

import { IQuantityResponse } from "../types/quantitiesTypes"

export function useGetQuantities() {
  const {
    data: quantitiesData,
    isLoading: isQuantitiesLoading,
    error: quantitiesError,
  }: IQuantityResponse = useQuery({
    queryKey: ["quantities"],
    queryFn: getQuantities,
  })

  return { quantitiesData, isQuantitiesLoading, quantitiesError }
}
