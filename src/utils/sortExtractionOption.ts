import { IMeasureData } from "../types/measuresTypes"
import { IWordData } from "../types/wordsTypes"

export function sortExtractionOption(data: IMeasureData[] | IWordData[]) {
  data.sort((a, b) => {
    if (a.label > b.label) {
      return 1
    }
    if (a.label < b.label) {
      return -1
    }
    return 0
  })
}
