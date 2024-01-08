import { FieldValues, UseFormRegister } from "react-hook-form"
import { IWordData } from "../types/wordsTypes"

import { CiSquarePlus } from "react-icons/ci"
import WordsOption from "./WordsOption"
import Tip from "./UI/Tip"

interface IExtractionWordFieldProps {
  register: UseFormRegister<FieldValues>
  wordsData: IWordData[] | undefined
  setIsWordsModalShow: (isShow: boolean) => void
}

const ExtractionWordField: React.FC<IExtractionWordFieldProps> = ({
  register,
  wordsData,
  setIsWordsModalShow,
}) => {
  return (
    <div>
      <div className="text-2xl font-semibold mb-3 flex gap-x-4 items-center">
        <span>Извлечение слов</span>
        <Tip tip="В столбце 'Слова' указываются вариации слов через '|'." />
        <button
          className="text-green-700 hover:text-green-500"
          onClick={() => setIsWordsModalShow(true)}
          type="button"
        >
          <CiSquarePlus size="35" />
        </button>
      </div>
      <div className="flex flex-col gap-y-3">
        {wordsData!.map((wordObj) => (
          <WordsOption
            words={wordObj.params}
            label={wordObj.label}
            register={register}
            key={wordObj.label}
          />
        ))}
      </div>
    </div>
  )
}

export default ExtractionWordField
