import { extractMeasures } from "./extractMeasures"
import { extractColors } from "./extractColors"
import { extractQuantity } from "./extractQuantity"
import { extractSize } from "./extractSize"
import { extractWords } from "./extractWords"
import { formatLabel } from "./helpers"

import { FieldValues } from "react-hook-form"
import { IMeasureData } from "../types/measuresTypes"
import { IWordData } from "../types/wordsTypes"
import { IQuantityData } from "../types/quantitiesTypes"

interface IExtractRegExpArgs {
  patternColumn: string[]
  formData: FieldValues
  measuresData: IMeasureData[] | undefined
  wordsData: IWordData[] | undefined
  quantitiesData: IQuantityData[] | undefined
}

export function extractRegExp({
  patternColumn,
  formData,
  measuresData,
  wordsData,
  quantitiesData,
}: IExtractRegExpArgs) {
  if (formData.headers) {
    patternColumn = patternColumn.slice(1)
  }

  const regExpsArray: string[][] = []
  const completeRegExpsArray = formData.headers ? ["Regex"] : []

  measuresData!.forEach(
    (measureObj) =>
      formData[formatLabel(measureObj.label)] &&
      regExpsArray.push(extractMeasures(patternColumn, measureObj.params))
  )

  wordsData!.forEach((wordObj) => {
    if (
      formData[formatLabel(wordObj.label)] &&
      wordObj.label === "Извлечь цвета"
    ) {
      regExpsArray.push(extractColors(patternColumn, wordObj.params))
    }

    if (
      formData[formatLabel(wordObj.label)] &&
      wordObj.label !== "Извлечь цвета"
    ) {
      regExpsArray.push(extractWords(patternColumn, wordObj.params))
    }
  })

  formData.quantities &&
    regExpsArray.push(
      extractQuantity(patternColumn, quantitiesData!.at(0)!.params)
    )

  formData.sizes &&
    regExpsArray.push(extractSize(patternColumn, formData.isSwapSizes))

  for (let i = 0; i < patternColumn.length; i++) {
    const strReg = regExpsArray.reduce((acc, elem) => {
      return `${elem.at(i) ? `(${elem.at(i)})` : ""}` + acc
    }, "")
    completeRegExpsArray.push(strReg)
  }

  return completeRegExpsArray
}
