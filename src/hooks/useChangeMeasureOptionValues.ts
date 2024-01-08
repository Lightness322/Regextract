import { TypeSetStateFunction } from "../types/TypeSetStateFunction"
import { IMeasure } from "../types/measuresTypes"

interface IUseChangeMeasureOptionValuesProps {
  handleShowSaveMeasureButton?: (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => void
  setCurrentMeasures: TypeSetStateFunction<IMeasure[]>
}

export function useChangeMeasureOptionValues({
  handleShowSaveMeasureButton,
  setCurrentMeasures,
}: IUseChangeMeasureOptionValuesProps) {
  const handleChangeMeasures = function (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    handleShowSaveMeasureButton && handleShowSaveMeasureButton(e, index)

    setCurrentMeasures((prevState) =>
      prevState.map((measureObj, i) => {
        if (index === i) {
          return { ...measureObj, variants: e.target.value }
        }
        return { ...measureObj }
      })
    )
  }

  const handleChangeCoefficient = function (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    handleShowSaveMeasureButton && handleShowSaveMeasureButton(e, index)

    setCurrentMeasures((prevState) =>
      prevState.map((measureObj, i) => {
        if (index === i) {
          return { ...measureObj, coefficient: +e.target.value }
        }
        return { ...measureObj }
      })
    )
  }

  return { handleChangeMeasures, handleChangeCoefficient }
}
