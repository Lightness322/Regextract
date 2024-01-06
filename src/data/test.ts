import { colors } from "./colors"

export function extractColors(patternArray: string[]) {
  const regExpColorColumn = patternArray.map((patternString) => {
    let indexOfColor: number = 0
    let matchResult: string = ""
    let modifierRu: string = ""
    let modifierEn: string = ""

    while (indexOfColor < colors.length) {
      const colorsVariations = `${colors.at(indexOfColor)!.colorNameRu}|${
        colors.at(indexOfColor)!.colorNameEn
      }`

      let reg = new RegExp(`${colorsVariations}`, "gi")

      if (patternString.match(reg) !== null) {
        matchResult = patternString.match(reg)!.at(0)!

        reg = new RegExp(`(светло|light)-(${colorsVariations})`, "gi")

        if (patternString.match(reg) !== null) {
          modifierRu = "светло"
          modifierEn = "light"
        }

        reg = new RegExp(`(т[е|ё]мно|dark)-(${colorsVariations})`, "gi")

        if (patternString.match(reg) !== null) {
          modifierRu = "т[е|ё]мно"
          modifierEn = "dark"
        }

        break
      }
      indexOfColor++
    }

    return matchResult
      ? `(?=.*(${modifierRu ? `${modifierRu}.?` : ""}${
          colors.at(indexOfColor)!.colorNameRu
        }|${modifierEn ? `${modifierEn}.?` : ""}${
          colors.at(indexOfColor)!.colorNameEn
        }))`
      : ""
  })

  // const resultColorColumnString = regExpColorColumn.join("\n")

  return regExpColorColumn
}

console.log(extractColors(["фыдво красный фыав", "фыдвол светло-красный"]))
