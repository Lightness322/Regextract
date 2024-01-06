import { IWord } from "../types/wordsTypes"

export function extractWords(patternArray: string[], words: IWord[]) {
  const regExpWordColumn = patternArray.map((patternString) => {
    const matchResultArray: string[] = []

    let indexOfWord: number = 0

    while (indexOfWord < words.length) {
      const wordVariations = `${words.at(indexOfWord)!.variants}`

      const reg = new RegExp(`${wordVariations}`, "gi")

      if (patternString.match(reg) !== null) {
        matchResultArray.push(`(?=.*(${words.at(indexOfWord)!.variants}))`)
      }
      indexOfWord++
    }

    return matchResultArray.join("")
  })

  return regExpWordColumn
}
