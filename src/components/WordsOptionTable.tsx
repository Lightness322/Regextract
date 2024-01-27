import { useChangeWordOptionValues } from "../hooks/useChangeWordOptionValues"

import { checkDuplicates } from "../utils/helpers"

import { TypeSetStateFunction } from "../types/TypeSetStateFunction"
import { IWord } from "../types/wordsTypes"
import AnimateHeight, { Height } from "react-animate-height"

import { CiSquarePlus } from "react-icons/ci"
import { IoClose } from "react-icons/io5"

interface IWordsOptionTableProps {
  optionTableHeight: Height
  currentWords: IWord[]
  setCurrentWords: TypeSetStateFunction<IWord[]>
  setSaveButtonHeight: TypeSetStateFunction<Height>
}

const WordsOptionTable: React.FC<IWordsOptionTableProps> = ({
  optionTableHeight,
  currentWords,
  setCurrentWords,
  setSaveButtonHeight,
}) => {
  const { handleChangeWords } = useChangeWordOptionValues({
    setCurrentWords,
  })

  return (
    <AnimateHeight duration={500} height={optionTableHeight}>
      <table className="text-left border-spacing-x-4 border-spacing-y-1 border-separate mt-3 max-[620px]:w-full">
        <thead>
          <tr>
            <th>Слова</th>
          </tr>
        </thead>
        <tbody>
          {currentWords.map((word, i) => (
            <tr key={i}>
              <td className="max-[620px]:w-full">
                <input
                  className={`p-0 border border-solid border-[#ca8544] rounded-md text-center w-[500px] max-[620px]:w-full ${
                    checkDuplicates(currentWords, i) ? "border-red-600" : ""
                  }`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChangeWords(e, i)
                  }}
                  value={word.variants}
                />
              </td>
              <td className="flex justify-center items-center w-[30px]">
                <button
                  className="text-red-700 hover:text-red-500"
                  onClick={() => {
                    const newMeasures = currentWords.filter(
                      (_, deleteIndex) => deleteIndex !== i
                    )
                    setCurrentWords(newMeasures)
                    setSaveButtonHeight("auto")
                  }}
                  type="button"
                >
                  <IoClose size="30" />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <button
                className="text-green-700 hover:text-green-500"
                onClick={() => {
                  setCurrentWords((curWords) => [...curWords, { variants: "" }])
                  setSaveButtonHeight("auto")
                }}
                type="button"
              >
                <CiSquarePlus size="30" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </AnimateHeight>
  )
}

export default WordsOptionTable
