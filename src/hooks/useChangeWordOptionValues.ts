import { TypeSetStateFunction } from "../types/TypeSetStateFunction"
import { IWord } from "../types/wordsTypes"

interface IUseChangeWordOptionValuesParams {
  setCurrentWords: TypeSetStateFunction<IWord[]>
}

export function useChangeWordOptionValues({
  setCurrentWords,
}: IUseChangeWordOptionValuesParams) {
  const handleChangeWords = function (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    setCurrentWords((prevState) =>
      prevState.map((wordObj, i) => {
        if (index === i) {
          return { ...wordObj, variants: e.target.value.toLowerCase() }
        }
        return { ...wordObj }
      })
    )
  }

  return { handleChangeWords }
}
