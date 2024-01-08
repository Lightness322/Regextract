import { TypeSetStateFunction } from "../types/TypeSetStateFunction"
import { IWord } from "../types/wordsTypes"

interface IUseChangeWordOptionValuesParams {
  handleShowSaveWordButton?: (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => void
  setCurrentWords: TypeSetStateFunction<IWord[]>
}

export function useChangeWordOptionValues({
  handleShowSaveWordButton,
  setCurrentWords,
}: IUseChangeWordOptionValuesParams) {
  const handleChangeWords = function (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    handleShowSaveWordButton && handleShowSaveWordButton(e, index)

    setCurrentWords((prevState) =>
      prevState.map((wordObj, i) => {
        if (index === i) {
          return { ...wordObj, variants: e.target.value }
        }
        return { ...wordObj }
      })
    )
  }

  return { handleChangeWords }
}
