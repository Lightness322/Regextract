export interface IMeasure {
  variants: string
  coefficient: number
}

export interface IMeasureData {
  userId: string
  label: string
  params: IMeasure[]
}

export interface IMeasuresResponse {
  data: IMeasureData[] | undefined
  isLoading: boolean
  error: Error | null
}
