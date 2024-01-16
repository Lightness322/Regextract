import { possibleMeasures } from "../data/possibleMeasures"
import { IQuantity } from "../types/quantitiesTypes"

export function extractQuantity(patternArray: string[], quantities: IQuantity) {
  const regExpQuantityColumn = patternArray.map((patternString) => {
    let checkMeasureString: string = ""
    let quantity: number = 0
    let possibleMeasure: string = ""
    let matchResultArray: string[] = []
    let quantitiesArray: number[] = []

    const startEdgeReg = "((?<=[^0-9а-яa-z])|(?<=^))"
    const endEdgeReg = "(?=[^0-9а-яa-z]|$)"

    const reg = new RegExp(
      `(${startEdgeReg}\\d+\\s*(${quantities.variantsAfterNumber})${endEdgeReg})|(${startEdgeReg}(${quantities.variantsBeforeNumber})\\s*\\d+${endEdgeReg})`,
      "gim"
    )

    if (patternString.match(reg) !== null) {
      matchResultArray = patternString.match(reg)!
    }

    matchResultArray.forEach((matchResult) => {
      if (isNaN(+matchResult)) {
        const indexAfterMatchResult =
          patternString.indexOf(matchResult) + matchResult.length

        checkMeasureString = patternString.slice(
          indexAfterMatchResult,
          indexAfterMatchResult + 3
        )

        const checkMeasureReg = /[а-яa-z]+/im

        if (checkMeasureString.match(checkMeasureReg) !== null) {
          possibleMeasure = checkMeasureString.match(checkMeasureReg)!.at(0)!
        }
      }

      if (
        !possibleMeasure ||
        (possibleMeasure && !possibleMeasures.includes(possibleMeasure))
      ) {
        if (
          matchResult.match(/\d+/) &&
          matchResult.match(/\d+/)!.at(0)!.at(0) !== "0"
        ) {
          quantity = parseInt(matchResult.match(/\d+/)!.at(0)!)
        }
      }

      if (quantity !== 0) quantitiesArray.push(quantity)
    })

    if (quantitiesArray.length === 0) return ""

    if (quantitiesArray.length === 1 && quantitiesArray.at(0) === 1) {
      return `(?=.*((([^0-9а-яa-z]|^)1\\s*(${quantities.variantsAfterNumber})([^0-9а-яa-z]|$))|(([^0-9а-яa-z]|^)(${quantities.variantsBeforeNumber})\\s*1([^0-9а-яa-z]|$)))|^(?!.*(?=.*((\\d+\\s*(шт|бр|tabs|caps|капс|табл|доз|пара?)([^0-9а-яa-z]|$))|(([^0-9а-яa-z]|^)(x|х|№)\\s*\\d+([^0-9а-яa-z]|$)))).*$))`
    }

    quantitiesArray = quantitiesArray.filter((quantity) => quantity !== 1)

    const resultReg: string = quantitiesArray
      .map((quantity) => {
        return `(?=.*((([^0-9а-яa-z]|^)${quantity}\\s*(${quantities.variantsAfterNumber})([^0-9а-яa-z]|$))|(([^0-9а-яa-z]|^)(${quantities.variantsBeforeNumber})\\s*${quantity}([^0-9а-яa-z]|$))))`
      })
      .join("")

    return resultReg
  })

  return regExpQuantityColumn
}
