import { FieldValues } from "react-hook-form"
import { IMeasureData } from "../types/measuresTypes"
import { IWordData } from "../types/wordsTypes"
import { extractMeasures } from "./extractMeasures"
import { formatLabel } from "./helpers"
import { extractColors } from "./extractColors"
import { extractQuantity } from "./extractQuantity"
import { extractSize } from "./extractSize"
import { extractWords } from "./extractWords"

interface IExtractRegExpArgs {
  patternColumn: string[]
  formData: FieldValues
  measuresData: IMeasureData[] | undefined
  wordsData: IWordData[] | undefined
}

export function extractRegExp({
  patternColumn,
  formData,
  measuresData,
  wordsData,
}: IExtractRegExpArgs) {
  const regExpsArray: string[][] = []
  const completeRegExpsArray = formData.headers ? ["Regex"] : []

  measuresData!.forEach(
    (measureObj) =>
      formData[formatLabel(measureObj.label)] &&
      regExpsArray.push(extractMeasures(patternColumn, measureObj.params))
  )

  wordsData!.forEach((wordObj) => {
    console.log(wordObj.label)
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

  formData.quantities && regExpsArray.push(extractQuantity(patternColumn))

  formData.sizes && regExpsArray.push(extractSize(patternColumn))

  for (let i = 0; i < patternColumn.length; i++) {
    const strReg = regExpsArray.reduce((acc, elem) => {
      return `${elem.at(i) ? `(?=.*${elem.at(i)})` : ""}` + acc
    }, "")
    completeRegExpsArray.push(strReg)
  }

  return completeRegExpsArray
}
