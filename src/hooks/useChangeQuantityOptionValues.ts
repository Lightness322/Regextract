import { TypeSetStateFunction } from "../types/TypeSetStateFunction"
import { IQuantity } from "../types/quantitiesTypes"

interface IUseChangeQuantityOptionValuesParams {
  setCurrentQuantities: TypeSetStateFunction<IQuantity>
}

export function useChangeQuantityOptionValues({
  setCurrentQuantities,
}: IUseChangeQuantityOptionValuesParams) {
  const handleChangeVariantsBeforeNum = function (
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setCurrentQuantities((prevState) => ({
      ...prevState,
      variantsBeforeNumber: e.target.value,
    }))
  }

  const handleChangeVariantsAfterNum = function (
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setCurrentQuantities((prevState) => ({
      ...prevState,
      variantsAfterNumber: e.target.value,
    }))
  }

  return { handleChangeVariantsBeforeNum, handleChangeVariantsAfterNum }
}
