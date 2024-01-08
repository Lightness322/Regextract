import { formatNumber, getMultiplier } from "./helpers"

import { IMeasure } from "../types/measuresTypes"

interface IQuantityObj {
  quantity: number
  quantityIndex: number
}

export function extractMeasures(patternArray: string[], measures: IMeasure[]) {
  const regExpMeasureColumn = patternArray.map((patternString) => {
    const quantitiesArray: IQuantityObj[] = []

    const endEdgeReg = "([^0-9а-яa-z]|$)"

    let index: number = 0

    while (index < measures.length) {
      const measuresVariations = `(${
        measures.at(index)!.variants
      })${endEdgeReg}`

      const quantityReg = "([0-9]+[.,][0-9]+|[0-9]+)"

      const reg = new RegExp(`${quantityReg}\\s?(${measuresVariations})`, "gim")

      if (patternString.match(reg) !== null) {
        const matchResultArray: string[] = patternString.match(reg)!

        matchResultArray.forEach((matchResult) =>
          quantitiesArray.push({
            quantity: parseFloat(matchResult.replace(",", ".")),
            quantityIndex: index,
          })
        )
      }
      index++
    }

    const resultReg = quantitiesArray
      .map((quantityObj) => {
        const resultReg = measures
          .map((_, i) => {
            const multiplier = getMultiplier(
              quantityObj.quantityIndex,
              i,
              measures
            )

            return `(?=.*(${formatNumber(
              quantityObj.quantity * multiplier
            )}\\s?(${measures.at(i)!.variants})${endEdgeReg}))${
              i !== measures.length - 1 ? "|" : ""
            }`
          })
          .join("")

        return quantitiesArray.length > 1 ? `(?=.*${resultReg})` : resultReg
      })
      .join("")

    return resultReg ? resultReg : ""
  })

  return regExpMeasureColumn
}
