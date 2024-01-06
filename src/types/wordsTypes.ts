export interface IWord {
  variants: string
}

export interface IWordData {
  label: string
  params: IWord[]
}

export interface IWordsResponse {
  data: IWordData[] | undefined
  isLoading: boolean
  error: Error | null
}
