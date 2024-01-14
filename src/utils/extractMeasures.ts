import { formatNumber, getMultiplier } from "./helpers"

import { IMeasure } from "../types/measuresTypes"

interface IQuantityObj {
  quantity: number
  quantityIndex: number
}

export function extractMeasures(patternArray: string[], measures: IMeasure[]) {
  const regExpMeasureColumn = patternArray.map((patternString) => {
    const quantitiesArray: IQuantityObj[] = []

    const startEdgeReg = "((?<=[^0-9а-яa-z])|(?<=^))"
    const endEdgeReg = "(?=[^0-9а-яa-z]|$)"

    let index: number = 0

    // Удалить даты xx.xx.xxxx г
    patternString = patternString.replaceAll(/\d+\.\d+\.\d+\s*г/gim, "null")

    // Удалить размеры РАЗМЕРxРАЗМЕР
    patternString = patternString.replaceAll(
      /(\d+[.,]\d+|\d+)\s*([мm][мm]|с[мm]|s[мm]|м|m)?\s*(x|х)\s*(\d+[.,]\d+|\d+)\s*([мm][мm]|с[мm]|s[мm]|м|m)?\s*(?=[^\dа-яa-z]|$)/gim,
      "null"
    )

    while (index < measures.length) {
      const measuresVariations = `(${
        measures.at(index)!.variants
      })${endEdgeReg}`

      const quantityReg = "([0-9]+[.,][0-9]+|[0-9]+)"

      const reg = new RegExp(
        `(${startEdgeReg})${quantityReg}\\s*(${measuresVariations})`,
        "gim"
      )

      if (patternString.match(reg) !== null) {
        const matchResultArray: string[] = patternString.match(reg)!

        matchResultArray.forEach((matchResult) => {
          const isFirstSymbolNumber = !isNaN(Number(matchResult.at(0)))

          const quantity = isFirstSymbolNumber
            ? parseFloat(matchResult.replace(",", "."))
            : parseFloat(matchResult.slice(1).replace(",", "."))

          quantitiesArray.push({
            quantity,
            quantityIndex: index,
          })
        })
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

            if (multiplier > 1000 || multiplier < 0.001) return ""

            return `${i === 0 ? "" : "|"}(?=.*(([^0-9а-яa-z]|^)${formatNumber(
              quantityObj.quantity * multiplier
            )}(,0)?\\s*(${measures.at(i)!.variants})([^0-9а-яa-z]|$)))`
          })
          .join("")

        return quantitiesArray.length > 1 ? `(?=.*${resultReg})` : resultReg
      })
      .join("")

    return resultReg ? resultReg : ""
  })

  return regExpMeasureColumn
}
