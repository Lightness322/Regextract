export interface IQuantity {
  variantsBeforeNumber: string
  variantsAfterNumber: string
}

export interface IQuantityData {
  label: string
  params: IQuantity
}

export interface IQuantityResponse {
  data: IQuantityData[] | undefined
  isLoading: boolean
  error: Error | null
}
