import CheckBox from "./UI/CheckBox"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { IMeasure } from "../types/measuresTypes"
import { formatLabel } from "../utils/helpers"
import { FaCheck } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  deleteMeasure as handleDeleteMeasure,
  updateMeasures as handleUpdateMeasures,
} from "../services/apiMeasures"
import { IoSettingsOutline } from "react-icons/io5"
import AnimateHeight, { Height } from "react-animate-height"
import { CiSquarePlus } from "react-icons/ci"
import Button from "./UI/Button"

interface IMeasuresOptionProps {
  register: UseFormRegister<FieldValues>
  label: string
  measures: IMeasure[]
}
const MeasuresOption: React.FC<IMeasuresOptionProps> = ({
  register,
  label,
  measures,
}) => {
  const [height, setHeight] = useState<Height>(0)
  const [buttonsHeight, setButtonsHeight] = useState<Height>(0)

  const [currentMeasures, setCurrentMeasures] = useState<IMeasure[]>(measures)

  const queryClient = useQueryClient()

  const {
    mutate: updateMeasures,
    isPending: isColorUpdating,
    error: colorUpdatingError,
  } = useMutation({
    mutationFn: handleUpdateMeasures,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["measures"] })
      setButtonsHeight(0)
      setCurrentMeasures((curMeasures) =>
        curMeasures.sort((a, b) => a.coefficient - b.coefficient)
      )
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const {
    mutate: deleteMeasure,
    isPending: isDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: handleDeleteMeasure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["measures"] })
    },
    onError: (error) => {
      console.log(error)
    },
  })

  function handleShowOptions() {
    if (height === 0) {
      setHeight("auto")
      setCurrentMeasures(measures)
    }
    if (height === "auto") {
      setHeight(0)
      setButtonsHeight(0)
    }
  }

  function handleShowButtons(
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) {
    const defaultValue = measures.filter((_, index) => i === index).at(0)!

    if (
      defaultValue.variants !== e.target.value &&
      String(defaultValue.coefficient) !== e.target.value &&
      !buttonsHeight
    ) {
      setButtonsHeight("auto")
    }
    if (
      (defaultValue.variants === e.target.value ||
        String(defaultValue.coefficient) === e.target.value) &&
      buttonsHeight
    ) {
      setButtonsHeight(0)
    }
  }

  function handleChangeMeasures(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    handleShowButtons(e, index)

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
    handleShowButtons(e, index)

    setCurrentMeasures((prevState) =>
      prevState.map((measureObj, i) => {
        if (index === i) {
          return { ...measureObj, coefficient: +e.target.value }
        }
        return { ...measureObj }
      })
    )
  }

  measures = [...measures.sort((a, b) => a.coefficient - b.coefficient)]

  return (
    <div>
      <CheckBox
        label={`${label}`}
        formValue={formatLabel(label)}
        register={register}
        height={height}
        handleShowOptions={handleShowOptions}
        deleteExtractionOption={deleteMeasure}
      />
      <AnimateHeight height={buttonsHeight} duration={500}>
        <Button
          type="button"
          size="sm"
          color="green"
          onClick={() => updateMeasures({ label, params: currentMeasures })}
        >
          Сохранить
        </Button>
      </AnimateHeight>
      <AnimateHeight duration={500} height={height}>
        <table className="text-left border-spacing-x-4 border-spacing-y-1 border-separate mt-3">
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
                      const newMeasures = currentMeasures.filter(
                        (_, deleteIndex) => deleteIndex !== i
                      )
                      // updateMeasures({ label, params: newMeasures })
                      setCurrentMeasures(newMeasures)
                      setButtonsHeight("auto")
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
                  onClick={() => {
                    setCurrentMeasures((curMeasures) => [
                      { variants: "", coefficient: 0 },
                      ...curMeasures,
                    ])
                    setButtonsHeight("auto")
                  }}
                >
                  <CiSquarePlus size="30" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </AnimateHeight>
    </div>
  )
}

export default MeasuresOption
