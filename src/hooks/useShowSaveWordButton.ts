import { TypeSetStateFunction } from "../types/TypeSetStateFunction"
import { Height } from "react-animate-height"
import { IWord } from "../types/wordsTypes"

interface IUseShowSaveWordButtonParams {
  words: IWord[]
  saveButtonHeight: Height
  setSaveButtonHeight: TypeSetStateFunction<Height>
}

export function useShowSaveWordButton({
  words,
  saveButtonHeight,
  setSaveButtonHeight,
}: IUseShowSaveWordButtonParams) {
  const handleShowSaveWordButton = function (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) {
    const defaultValue = words.filter((_, index) => i === index).at(0)!

    if (defaultValue.variants !== e.target.value && !saveButtonHeight) {
      setSaveButtonHeight("auto")
    }

    if (defaultValue.variants === e.target.value && saveButtonHeight) {
      setSaveButtonHeight(0)
    }
  }
  return { handleShowSaveWordButton }
}
