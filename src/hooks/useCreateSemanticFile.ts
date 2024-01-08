import { useState } from "react"

import Excel from "exceljs"

import { extractRegExp } from "../utils/extractRegExp"
import { columns } from "../data/columns"

import { FieldValues } from "react-hook-form"
import { IMeasureData } from "../types/measuresTypes"
import { IWordData } from "../types/wordsTypes"

interface IUseCreateSemanticFileParams {
  measuresData: IMeasureData[] | undefined
  wordsData: IWordData[] | undefined
  patternColumn: string[]
  workbook: Excel.Workbook | undefined
  sheet: Excel.Worksheet | undefined
  regExpColumnLetter: string
  setObjUrl: (url: string) => void
}

export function useCreateSemanticFile({
  measuresData,
  wordsData,
  patternColumn,
  workbook,
  sheet,
  regExpColumnLetter,
  setObjUrl,
}: IUseCreateSemanticFileParams) {
  const [isRegExpCreating, setIsRegExpCreating] = useState<boolean>(false)

  const createSemanticFile = async function (formData: FieldValues) {
    const completeRegExpsArray = extractRegExp({
      formData,
      measuresData,
      wordsData,
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
