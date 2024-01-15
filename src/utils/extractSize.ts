import { formatNumber } from "./helpers"

export function extractSize(patternArray: string[], isSwapSizes: boolean) {
  const regExpQuantityColumn = patternArray.map((patternString) => {
    let matchResult: string = ""
    let firstNumber: number = 0
    let secondNumber: number = 0

    const quantityReg = "(\\d+[.,]\\d+|\\d+)"
    const measuresReg = "\\s*([мm][мm]|с[мm]|s[мm]|м|m)?\\s*"

    const reg = new RegExp(
      `${quantityReg}${measuresReg}(x|х)\\s*${quantityReg}${measuresReg}(?=[^\\dа-яa-z]|$)`,
      "im"
    )

    if (patternString.match(reg) !== null) {
      matchResult = patternString.match(reg)!.at(0)!

      matchResult = matchResult.replaceAll(",", ".")

      const getNumbersReg = /(\d+[.,]\d+|\d+)/gim

      firstNumber = parseFloat(matchResult.match(getNumbersReg)!.at(0)!)

      secondNumber = parseFloat(matchResult.match(getNumbersReg)!.at(1)!)

      if (firstNumber === secondNumber) {
        const resultReg = `(?=.*((${formatNumber(
          firstNumber * 10
        )}${measuresReg}(х|x)\\s*${formatNumber(
          secondNumber * 10
        )}${measuresReg})|(${firstNumber}${measuresReg}(х|x)\\s*${secondNumber}${measuresReg})|(${formatNumber(
          firstNumber / 10
        )}${measuresReg}(х|x)\\s*${formatNumber(
          secondNumber / 10
        )}${measuresReg})))`

        return resultReg
      }
    }

    if (!matchResult) return ""

    const resultReg = isSwapSizes
      ? `(?=.*((([^,.]|^)${formatNumber(
          firstNumber * 10
        )}${measuresReg}(x|х)\\s*${formatNumber(
          secondNumber * 10
        )}${measuresReg})|(([^,.]|^)${formatNumber(
          secondNumber * 10
        )}${measuresReg}(x|х)\\s*${formatNumber(
          firstNumber * 10
        )}${measuresReg})|(([^,.]|^)${formatNumber(
          firstNumber
        )}${measuresReg}(x|х)\\s*${formatNumber(
          secondNumber
        )}${measuresReg})|(([^,.]|^)${formatNumber(
          secondNumber
        )}${measuresReg}(x|х)\\s*${formatNumber(
          firstNumber
        )}${measuresReg})|(([^,.]|^)${formatNumber(
          firstNumber / 10
        )}${measuresReg}(x|х)\\s*${formatNumber(
          secondNumber / 10
        )}${measuresReg})|(([^,.]|^)${formatNumber(
          secondNumber / 10
        )}${measuresReg}(x|х)\\s*${formatNumber(
          firstNumber / 10
        )}${measuresReg})))`
      : `(?=.*((([^,.]|^)${formatNumber(
          firstNumber * 10
        )}${measuresReg}(x|х)\\s*${formatNumber(
          secondNumber * 10
        )}${measuresReg})|(([^,.]|^)${formatNumber(
          firstNumber
        )}${measuresReg}(x|х)\\s*${formatNumber(
          secondNumber
        )}${measuresReg})|(([^,.]|^)${formatNumber(
          firstNumber / 10
        )}${measuresReg}(x|х)\\s*${formatNumber(
          secondNumber / 10
        )}${measuresReg})))`

    return resultReg
  })

  return regExpQuantityColumn
}
