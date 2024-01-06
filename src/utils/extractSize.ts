export function extractSize(patternArray: string[]) {
  const regExpQuantityColumn = patternArray.map((patternString) => {
    let matchResult: string = ""
    let firstNumber: number = 0
    let secondNumber: number = 0

    const reg = /([0-9]+[.,][0-9]+|[0-9]+)[^0-9]([0-9]+[.,][0-9]+|[0-9]+)/im

    if (patternString.match(reg) !== null) {
      matchResult = patternString.match(reg)!.at(0)!

      let i = 0

      while (
        matchResult.at(i) === "," ||
        matchResult.at(i) === "." ||
        isNaN(+matchResult.at(i)!) === false
      ) {
        i++
      }

      firstNumber = parseFloat(matchResult.slice(0, i).replace(",", "."))
      secondNumber = parseFloat(matchResult.slice(i + 1).replace(",", "."))

      if (firstNumber === secondNumber) {
        let resultReg = `(?=!*((${firstNumber * 10}!?${
          secondNumber * 10
        })|(${firstNumber}!?${secondNumber})|(${firstNumber / 10}!?${
          secondNumber / 10
        })))`

        return (resultReg = resultReg.includes(".")
          ? resultReg.replaceAll(".", "[.,]").replaceAll("!", ".")
          : resultReg.replaceAll(",", "[.,]").replaceAll("!", "."))
      }
    }

    let resultReg = matchResult
      ? `(?=!*((${firstNumber * 10}!?${secondNumber * 10})|(${
          secondNumber * 10
        }!?${
          firstNumber * 10
        })|(${firstNumber}!?${secondNumber})|(${secondNumber}!?${firstNumber})|(${
          firstNumber / 10
        }!?${secondNumber / 10})|(${secondNumber / 10}!?${firstNumber / 10})))`
      : ""

    if (resultReg) {
      resultReg = resultReg.includes(".")
        ? resultReg.replaceAll(".", "[.,]").replaceAll("!", ".")
        : resultReg.replaceAll(",", "[.,]").replaceAll("!", ".")
    }

    return resultReg
  })

  //   const resultQuantityColumnString = regExpQuantityColumn.join("\n")

  return regExpQuantityColumn
}
