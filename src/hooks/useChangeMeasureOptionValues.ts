import { TypeSetStateFunction } from "../types/TypeSetStateFunction"
import { IMeasure } from "../types/measuresTypes"

interface IUseChangeMeasureOptionValuesProps {
  setCurrentMeasures: TypeSetStateFunction<IMeasure[]>
}

export function useChangeMeasureOptionValues({
  setCurrentMeasures,
}: IUseChangeMeasureOptionValuesProps) {
  const handleChangeMeasures = function (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    setCurrentMeasures((prevState) =>
      prevState.map((measureObj, i) => {
        if (index === i) {
          return { ...measureObj, variants: e.target.value.toLowerCase() }
        }
        return { ...measureObj }
      })
    )
  }

  const handleChangeCoefficient = function (
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

  return { handleChangeMeasures, handleChangeCoefficient }
}
