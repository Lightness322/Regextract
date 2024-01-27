export interface IWord {
  variants: string
}

export interface IWordData {
  userId: string
  label: string
  params: IWord[]
}

export interface IWordsResponse {
  data: IWordData[] | undefined
  isLoading: boolean
  error: Error | null
}
