import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { createPortal } from "react-dom"
import { FieldValues, useForm } from "react-hook-form"
import { insertMeasure as handleInsertMeasure } from "../services/apiMeasures"
import Input from "./UI/Input"
import Label from "./UI/Label"
import { CiSquarePlus } from "react-icons/ci"
import { IoClose } from "react-icons/io5"
import { IMeasure } from "../types/measuresTypes"
import Button from "./UI/Button"

interface IAddMeasureExtractionFormProps {
  setIsModalShow: (isShow: boolean) => void
}

const array: IMeasure[] = [{ variants: "", coefficient: 1 }]

const AddMeasureExtractionForm: React.FC<IAddMeasureExtractionFormProps> = ({
  setIsModalShow,
}) => {
  const [currentMeasures, setCurrentMeasures] = useState<IMeasure[]>(array)
  const [label, setLabel] = useState<string>("Извлечь ...")

  const queryClient = useQueryClient()

  const {
    mutate: insertMeasure,
    isPending: isColorUpdating,
    error: colorUpdatingError,
  } = useMutation({
    mutationFn: handleInsertMeasure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["measures"] })
      setIsModalShow(false)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    insertMeasure({
      label,
      params: currentMeasures,
    })
  }

  function handleChangeMeasures(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    setCurrentMeasures((prevState) =>
      prevState.map((measureObj, i) => {
        if (index === i) {
          return { ...measureObj, variants: e.target.value }
        }
        return { ...measureObj }
      })
    )
  }

  function handleChangeCoefficient(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    setCurrentMeasures((prevState) =>
      prevState.map((measureObj, i) => {
        if (index === i) {
          return { ...measureObj, coefficient: +e.target.value }
        }
        return { ...measureObj }
      })
    )
  }

  return (
    <form
      className="bg-white p-20 flex flex-col gap-y-5 rounded-xl shadow-xl shadow-[#0000005f]"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="px-4 flex gap-x-5">
        <Label>Название</Label>
        <input
          className="p-0 border border-solid border-[#ca8544] rounded-md text-center w-full"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <table className="text-left border-spacing-x-4 border-spacing-y-1 border-separate">
        <thead>
          <tr>
            <th>Величина</th>
            <th>Коэффициент</th>
          </tr>
        </thead>
        <tbody>
          {currentMeasures.map((measureObj, i) => (
            <tr key={i}>
              <td>
                <input
                  className="p-0 border border-solid border-[#ca8544] rounded-md text-center w-[250px]"
                  value={measureObj.variants}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChangeMeasures(e, i)
                  }}
                />
              </td>
              <td>
                <input
                  className="p-0 border border-solid border-[#ca8544] rounded-md text-center w-[250px]"
                  type="number"
                  value={measureObj.coefficient}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChangeCoefficient(e, i)
                  }}
                />
              </td>
              <td className="flex justify-center items-center">
                <button
                  className="text-red-700 hover:text-red-500"
                  type="button"
                  onClick={() => {
                    setCurrentMeasures((curArray) =>
                      curArray.filter((_, ind) => ind !== i)
                    )
                  }}
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
                type="button"
                onClick={() =>
                  setCurrentMeasures((curArray) => [
                    ...curArray,
                    { variants: "", coefficient: 1 },
                  ])
                }
              >
                <CiSquarePlus size="30" />
              </button>
            </td>
          </tr>
          {/* <tr>
            <td>
              <button
                type="button"
                onClick={() => setTotalRows((qty) => qty + 1)}
              >
                add new
              </button>
            </td>
          </tr> */}
        </tbody>
      </table>
      <div className="flex justify-center">
        <Button type="submit">Добавить</Button>
      </div>
    </form>
  )
}

export default AddMeasureExtractionForm
