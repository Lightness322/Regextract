import { useChangeWordOptionValues } from "../hooks/useChangeWordOptionValues"

import { TypeSetStateFunction } from "../types/TypeSetStateFunction"
import { IWord } from "../types/wordsTypes"

import { IoClose } from "react-icons/io5"
import { CiSquarePlus } from "react-icons/ci"

interface IAddWordExtractionFormTableProps {
  currentWords: IWord[]
  setCurrentWords: TypeSetStateFunction<IWord[]>
}

const AddWordExtractionFormTable: React.FC<
  IAddWordExtractionFormTableProps
> = ({ currentWords, setCurrentWords }) => {
  const { handleChangeWords } = useChangeWordOptionValues({ setCurrentWords })

  return (
    <table className="text-left border-spacing-x-4 border-spacing-y-1 border-separate max-[810px]:w-full max-[450px]:border-spacing-x-1">
      <thead>
        <tr>
          <th>Величина</th>
        </tr>
      </thead>
      <tbody>
        {currentWords.map((wordObj, i) => (
          <tr key={i}>
            <td className="max-[810px]:w-full">
              <input
                className="p-0 border border-solid border-[#ca8544] rounded-md text-center w-[500px] max-[810px]:w-full"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeWords(e, i)
                }}
                value={wordObj.variants}
              />
            </td>
            <td className="flex justify-center items-center w-[30px]">
              <button
                className="text-red-700 hover:text-red-500"
                onClick={() => {
                  setCurrentWords((curArray) =>
                    curArray.filter((_, ind) => ind !== i)
                  )
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
              onClick={() =>
                setCurrentWords((curArray) => [...curArray, { variants: "" }])
              }
              type="button"
            >
              <CiSquarePlus size="30" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default AddWordExtractionFormTable
