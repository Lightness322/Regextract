import { useState } from "react"
import { useInsertWordOption } from "../hooks/useInsertWordOption"
import { useUserId } from "../hooks/useUserId"

import { includesEmptyFields } from "../utils/helpers"

import { TypeSetStateFunction } from "../types/TypeSetStateFunction"
import { IWord, IWordData } from "../types/wordsTypes"

import AddWordExtractionFormTable from "./AddWordExtractionFormTable"
import Label from "./UI/Label"
import Button from "./UI/Button"
import Loader from "./UI/Loader"

interface IAddWordExtractionFormProps {
  wordsData: IWordData[]
  setIsModalShow: TypeSetStateFunction<boolean>
}

const array: IWord[] = [{ variants: "" }]

const AddWordExtractionForm: React.FC<IAddWordExtractionFormProps> = ({
  wordsData,
  setIsModalShow,
}) => {
  const [label, setLabel] = useState<string>("Извлечь ...")
  const [currentWords, setCurrentWords] = useState<IWord[]>(array)

  const { insertWord, isWordInserting } = useInsertWordOption({
    setIsModalShow,
  })

  const { userId } = useUserId()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    insertWord({
      label,
      params: currentWords,
      userId,
    })
  }

  const isLabelExist = wordsData.map((wordObj) => wordObj.label).includes(label)

  const isEmptyFieldsExist = includesEmptyFields(currentWords)

  return (
    <form
      className="bg-white p-20 flex flex-col gap-y-5 rounded-xl shadow-xl shadow-[#0000005f] max-[810px]:px-10 max-[500px]:px-5"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="px-4 flex gap-x-5 max-[500px]:flex-col gap-y-2 max-[450px]:px-1">
        <Label>Название</Label>
        <input
          className="p-0 border border-solid border-[#ca8544] rounded-md text-center w-full"
          onChange={(e) => setLabel(e.target.value)}
          value={label}
        />
      </div>
      <AddWordExtractionFormTable
        currentWords={currentWords}
        setCurrentWords={setCurrentWords}
      />
      <div className="flex justify-center relative">
        <Button type="submit" disabled={isLabelExist || isEmptyFieldsExist}>
          {isWordInserting ? (
            <span className="flex h-[28px] w-[84px] justify-center">
              <Loader />
            </span>
          ) : (
            <span>Добавить</span>
          )}
        </Button>
        {isLabelExist && (
          <div className="absolute bottom-[-35px] text-red-500">
            Такое название уже существует
          </div>
        )}
      </div>
    </form>
  )
}

export default AddWordExtractionForm
