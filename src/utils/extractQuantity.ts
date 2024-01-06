const measures = ["кг", "kg", "мл", "ml"]

export function extractQuantity(patternArray: string[]) {
  const regExpQuantityColumn = patternArray.map((patternString) => {
    let checkMeasureString: string = ""
    let quantity: number = 0
    let possibleMeasure: string = ""
    let matchResultArray: string[] = []
    const quantitiesArray: number[] = []

    // const startEdgeReg = "(^|[^0-9а-яa-z])"
    // const endEdgeReg = "([^0-9а-яa-z]|$)"

    const reg =
      /(\d+[^a-zа-я]?(((шт|бр)([^a-zа-я]|$))|(tabs|caps|капс|табл)))|(([^a-zа-я0-9]|^)(x|х|n|№)\s?\d+)/gim

    if (patternString.match(reg) !== null) {
      matchResultArray = patternString.match(reg)!
    }

    matchResultArray.forEach((matchResult) => {
      if (isNaN(+matchResult)) {
        checkMeasureString = patternString.slice(
          patternString.indexOf(matchResult) + matchResult.length
        )

        const checkMeasureReg = /[а-яa-z]+/im

        if (checkMeasureString.match(checkMeasureReg) !== null) {
          possibleMeasure = checkMeasureString.match(checkMeasureReg)!.at(0)!
        }
      }

      if (
        !possibleMeasure ||
        (possibleMeasure && !measures.includes(possibleMeasure))
      ) {
        quantity = parseInt(matchResult.match(/\d+/)!.at(0)!)
      }

      if (quantity !== 0) quantitiesArray.push(quantity)
    })

    if (quantitiesArray.length === 0) return ""

    const resultReg: string = quantitiesArray
      .map((quantity) => {
        return `(?=.*(${quantity}([^0-9]+)?(шт|бр|tabs|caps|капс))|((x|х|№)\\s?${quantity}))`
      })
      .join("")

    return resultReg
  })

  return regExpQuantityColumn
}
