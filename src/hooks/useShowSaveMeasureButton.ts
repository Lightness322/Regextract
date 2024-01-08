import { TypeSetStateFunction } from "../types/TypeSetStateFunction"
import { Height } from "react-animate-height"
import { IMeasure } from "../types/measuresTypes"

interface IUseShowSaveMeasureButtonParams {
  measures: IMeasure[]
  saveButtonHeight: Height
  setSaveButtonHeight: TypeSetStateFunction<Height>
}

export function useShowSaveMeasureButton({
  measures,
  saveButtonHeight,
  setSaveButtonHeight,
}: IUseShowSaveMeasureButtonParams) {
  const handleShowSaveMeasureButton = function (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) {
    const defaultValue = measures.filter((_, index) => i === index).at(0)!

    if (
      defaultValue.variants !== e.target.value &&
      String(defaultValue.coefficient) !== e.target.value &&
      !saveButtonHeight
    ) {
      setSaveButtonHeight("auto")
    }

    if (
      (defaultValue.variants === e.target.value ||
        String(defaultValue.coefficient) === e.target.value) &&
      saveButtonHeight
    ) {
      setSaveButtonHeight(0)
    }
  }
  return { handleShowSaveMeasureButton }
}
