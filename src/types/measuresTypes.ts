export interface IMeasure {
  variants: string
  coefficient: number
}

export interface IMeasureData {
  label: string
  params: IMeasure[]
}

export interface IMeasuresResponse {
  data: IMeasureData[] | undefined
  isLoading: boolean
  error: Error | null
}
