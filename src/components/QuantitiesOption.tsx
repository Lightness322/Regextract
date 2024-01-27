import { useEffect, useState } from "react"
import { useChangeQuantityOptionValues } from "../hooks/useChangeQuantityOptionValues"
import { useChangeQuantityOption } from "../hooks/useChangeQuantityOption"
import { useUserId } from "../hooks/useUserId"

import { FieldValues, UseFormRegister } from "react-hook-form"
import { IQuantity } from "../types/quantitiesTypes"

import AnimateHeight, { Height } from "react-animate-height"
import CheckBox from "./CheckBox"
import SaveButton from "./UI/SaveButton"

interface IQuantitiesOptionProps {
  quantities: IQuantity
  register: UseFormRegister<FieldValues>
}

const QuantitiesOption: React.FC<IQuantitiesOptionProps> = ({
  quantities,
  register,
}) => {
  const [optionTableHeight, setOptionTableHeight] = useState<Height>(0)

  const [currentQuantities, setCurrentQuantities] =
    useState<IQuantity>(quantities)

  const {
    saveButtonHeight,
    setSaveButtonHeight,
    updateQuantities,
    isQuantitiesUpdating,
  } = useChangeQuantityOption()

  const { handleChangeVariantsAfterNum, handleChangeVariantsBeforeNum } =
    useChangeQuantityOptionValues({ setCurrentQuantities })

  const { userId } = useUserId()

  useEffect(() => {
    if (JSON.stringify(currentQuantities) === JSON.stringify(quantities)) {
      setSaveButtonHeight(0)
    } else {
      setSaveButtonHeight("auto")
    }
  }, [currentQuantities, quantities, setSaveButtonHeight])

  function handleShowOptions() {
    if (optionTableHeight === 0) {
      setOptionTableHeight("auto")
      setCurrentQuantities(quantities)
    }
    if (optionTableHeight === "auto") {
      setOptionTableHeight(0)
      setSaveButtonHeight(0)
    }
  }

  return (
    <div>
      <CheckBox
        label="Извлечь количество"
        formValue="quantities"
        register={register}
        tableHeight={optionTableHeight}
        handleShowOptions={handleShowOptions}
      ></CheckBox>
      <SaveButton
        buttonHeight={saveButtonHeight}
        updateFn={() =>
          updateQuantities({
            label: "Извлечь количество",
            params: currentQuantities,
            userId,
          })
        }
        isUpdating={isQuantitiesUpdating}
      />
      <AnimateHeight duration={500} height={optionTableHeight}>
        <table className="text-left border-spacing-x-4 border-spacing-y-1 border-separate mt-3 max-[890px]:w-full">
          <thead>
            <tr>
              <th>Варианты после числа</th>
              <th>Варианты до числа</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="max-[890px]:w-[67.5%]">
                <input
                  className="p-0 border border-solid border-[#ca8544] rounded-md text-center w-[350px] max-[1230px]:w-[500px] max-[890px]:w-full"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChangeVariantsAfterNum(e)
                  }}
                  value={currentQuantities.variantsAfterNumber}
                />
              </td>
              <td className="max-[890px]:w-[32.5%]">
                <input
                  className="p-0 border border-solid border-[#ca8544] rounded-md text-center w-[150px] max-[890px]:w-full"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChangeVariantsBeforeNum(e)
                  }}
                  value={currentQuantities.variantsBeforeNumber}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </AnimateHeight>
    </div>
  )
}

export default QuantitiesOption
