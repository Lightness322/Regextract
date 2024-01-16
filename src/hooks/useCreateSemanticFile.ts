import { useState } from "react"

import Excel from "exceljs"

import { extractRegExp } from "../utils/extractRegExp"
import { columns } from "../data/columns"

import { FieldValues } from "react-hook-form"
import { IMeasureData } from "../types/measuresTypes"
import { IWordData } from "../types/wordsTypes"
import { IQuantityData } from "../types/quantitiesTypes"

interface IUseCreateSemanticFileParams {
  measuresData: IMeasureData[] | undefined
  wordsData: IWordData[] | undefined
  quantitiesData: IQuantityData[] | undefined
  workbook: Excel.Workbook | undefined
  sheet: Excel.Worksheet | undefined
  productsColumnLetter: string
  regExpColumnLetter: string
  setObjUrl: (url: string) => void
}

export function useCreateSemanticFile({
  measuresData,
  wordsData,
  quantitiesData,
  workbook,
  sheet,
  productsColumnLetter,
  regExpColumnLetter,
  setObjUrl,
}: IUseCreateSemanticFileParams) {
  const [isRegExpCreating, setIsRegExpCreating] = useState<boolean>(false)

  const createSemanticFile = async function (formData: FieldValues) {
    const productsColumn = sheet!.getColumn(
      columns.indexOf(productsColumnLetter) + 1
    ).values

    const patternColumn: string[] = []

    for (let i = 1; i < productsColumn.length; i++) {
      patternColumn.push(String(productsColumn.at(i)))
    }

    const completeRegExpsArray = extractRegExp({
      formData,
      measuresData,
      wordsData,
      quantitiesData,
      patternColumn,
    })

    sheet!.getColumn(columns.indexOf(regExpColumnLetter) + 1).values =
      completeRegExpsArray

    const bytes = await workbook!.xlsx.writeBuffer()

    const newTableData = new Blob([bytes], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })

    setObjUrl(URL.createObjectURL(newTableData))

    setIsRegExpCreating(false)
  }

  return {
    createSemanticFile,
    isRegExpCreating,
    setIsRegExpCreating,
  }
}
