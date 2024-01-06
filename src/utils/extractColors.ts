import { IWord } from "../types/wordsTypes"

export function extractColors(patternArray: string[], words: IWord[]) {
  const regExpColorColumn = patternArray.map((patternString) => {
    const matchResultArray: string[] = []

    let indexOfColor: number = 0

    while (indexOfColor < words.length) {
      let modifier: string = ""

      const colorsVariations = `${words.at(indexOfColor)!.variants}`

      let reg = new RegExp(`${colorsVariations}`, "gi")

      if (patternString.match(reg) !== null) {
        let matchResult: string = ""

        matchResult = patternString.match(reg)!.at(0)!

        reg = new RegExp(`(светло|light).?(${colorsVariations})`, "gi")

        if (patternString.match(reg) !== null) {
          modifier = "светло|light"
        }

        reg = new RegExp(`(т[е|ё]мно|dark).?(${colorsVariations})`, "gi")

        if (patternString.match(reg) !== null) {
          modifier = "т[е|ё]мно|dark"
        }

        if (matchResult && !modifier) {
          matchResultArray.push(`(?=.*(${words.at(indexOfColor)!.variants}))`)
        }

        if (matchResult && modifier) {
          matchResultArray.push(
            `(?=.*((${modifier}).?(${words.at(indexOfColor)!.variants})))`
          )
        }
      }
      indexOfColor++
    }

    return matchResultArray.join("")
  })

  return regExpColorColumn
}
