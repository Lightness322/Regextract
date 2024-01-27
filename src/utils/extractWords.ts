import { IWord } from "../types/wordsTypes"

export function extractWords(
  patternArray: string[],
  words: IWord[],
  isStrictWords: boolean
) {
  const regExpWordColumn = patternArray.map((patternString) => {
    const matchResultArray: string[] = []

    const startEdgeReg = "((?<=[^0-9а-яa-z])|(?<=^))"
    const endEdgeReg = "(?=[^0-9а-яa-z]|$)"

    let indexOfWord: number = 0

    while (indexOfWord < words.length) {
      const wordVariations = `${words.at(indexOfWord)!.variants}`

      const reg = new RegExp(
        `${startEdgeReg}(${wordVariations})${endEdgeReg}`,
        "gi"
      )

      if (patternString.match(reg) !== null) {
        matchResultArray.push(
          `(?=.*(${isStrictWords ? "([^0-9а-яa-z]|^)" : ""}${
            words.at(indexOfWord)!.variants
          }${isStrictWords ? "([^0-9а-яa-z]|$)" : ""}))`
        )
      }
      indexOfWord++
    }

    return matchResultArray.join("")
  })

  return regExpWordColumn
}
