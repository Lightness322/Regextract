import { IWord } from "../types/wordsTypes"

export function extractWords(patternArray: string[], words: IWord[]) {
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
          `(?=.*(([^0-9а-яa-z]|^)${
            words.at(indexOfWord)!.variants
          }([^0-9а-яa-z]|$)))`
        )
      }
      indexOfWord++
    }

    return matchResultArray.join("")
  })

  return regExpWordColumn
}
