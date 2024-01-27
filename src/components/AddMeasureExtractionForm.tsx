import { useState } from "react"
import { useInsertMeasureOption } from "../hooks/useInsertMeasureOption"
import { useUserId } from "../hooks/useUserId"

import { includesEmptyFields } from "../utils/helpers"

import { IMeasure, IMeasureData } from "../types/measuresTypes"
import { TypeSetStateFunction } from "../types/TypeSetStateFunction"

import AddMeasureExtractionFormTable from "./AddMeasureExtractionFormTable"
import Label from "./UI/Label"
import Button from "./UI/Button"
import Loader from "./UI/Loader"

interface IAddMeasureExtractionFormProps {
  measuresData: IMeasureData[]
  setIsModalShow: TypeSetStateFunction<boolean>
}

const array: IMeasure[] = [{ variants: "", coefficient: 1 }]

const AddMeasureExtractionForm: React.FC<IAddMeasureExtractionFormProps> = ({
  measuresData,
  setIsModalShow,
}) => {
  const [label, setLabel] = useState<string>("Извлечь ...")
  const [currentMeasures, setCurrentMeasures] = useState<IMeasure[]>(array)

  const { insertMeasure, isMeasureInserting } = useInsertMeasureOption({
    setIsModalShow,
  })

  const { userId } = useUserId()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    insertMeasure({
      label,
      params: currentMeasures,
      userId,
    })
  }

  const isLabelExist = measuresData
    .map((measureObj) => measureObj.label)
    .includes(label)

  const isEmptyFieldsExist = includesEmptyFields(currentMeasures)

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
      <AddMeasureExtractionFormTable
        currentMeasures={currentMeasures}
        setCurrentMeasures={setCurrentMeasures}
      />
      <div className="flex justify-center relative">
        <Button type="submit" disabled={isLabelExist || isEmptyFieldsExist}>
          {isMeasureInserting ? (
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

export default AddMeasureExtractionForm
