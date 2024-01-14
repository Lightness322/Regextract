import { IMeasure } from "../types/measuresTypes"

export function getMultiplier(
  quantityIndex: number,
  currentIndex: number,
  measures: IMeasure[]
): number {
  if (quantityIndex === currentIndex) {
    return 1
  }

  return (
    measures.at(quantityIndex)!.coefficient /
    measures.at(currentIndex)!.coefficient
  )
}

export function formatNumber(number: number): string {
  const stringNum = number.toFixed(10).toString()

  if (!stringNum.includes(".") && !stringNum.includes(",")) {
    return stringNum
  }

  const regCheckInteger = /\d+[.,]0+$/gim

  if (stringNum.match(regCheckInteger) !== null) {
    return Math.floor(number).toString()
  }

  const regCheckFloat = /\d+[.,](0+)?[1-9]+/gim

  const preciseNumString = stringNum.match(regCheckFloat)!.at(0)! + "(0+)?"

  return preciseNumString.includes(".")
    ? preciseNumString.replace(".", "[,.]")
    : preciseNumString.replace(",", "[,.]")
}

export function isValidNumber(stringNumber: string) {
  return stringNumber.at(0) === "0" ? false : true
}

export function getDefaultValues(measuresArray: object[]) {
  const defaultValuesObject: { [char: string]: string } = {}

  for (let i = 0; i < measuresArray.length; i++) {
    const objectValues: string[] = Object.values(measuresArray.at(i)!).map(
      (elem) => String(elem).replace("|", "")
    )
    for (let k = 0; k < objectValues.length; k++) {
      if (k === 1) {
        defaultValuesObject[objectValues.at(k - 1)! + objectValues.at(k - 2)!] =
          objectValues.at(k)!
      } else {
        defaultValuesObject[objectValues.at(k)!] = objectValues.at(k)!
      }
    }
  }

  return defaultValuesObject
}

export function formatLabel(label: string) {
  return label.toLowerCase().replaceAll(" ", "")
}

export function includesEmptyFields(array: Array<object>) {
  let values: Array<string | number> = []
  array.forEach((obj) => (values = [...values, ...Object.values(obj)]))

  return values.includes("")
}
