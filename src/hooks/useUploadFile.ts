import Excel from "exceljs"

import { TypeSetStateFunction } from "../types/TypeSetStateFunction"

interface IUseUploadFileParams {
  setFile: (file: File) => void
  setIsFileLoading: (isLoading: boolean) => void
  setWorkbook: (workbook: Excel.Workbook) => void
  setSheet: (sheet: Excel.Worksheet) => void
  setIsFileTypeWrong: TypeSetStateFunction<boolean>
}

export function useUploadFile({
  setFile,
  setIsFileLoading,
  setWorkbook,
  setSheet,
  setIsFileTypeWrong,
}: IUseUploadFileParams) {
  const uploadFile = async function (file: File) {
    setIsFileLoading(true)

    setFile(file)

    setIsFileTypeWrong(false)

    const reader = new FileReader()

    reader.readAsArrayBuffer(file)

    reader.onload = async function () {
      const workbook = new Excel.Workbook()
      setWorkbook(workbook)

      const buffer = reader.result

      if (buffer instanceof ArrayBuffer) {
        const tableFile = await workbook.xlsx.load(buffer)
        const sheet = tableFile.getWorksheet(1)
        setSheet(sheet!)
      }

      setIsFileLoading(false)
    }
  }

  return { uploadFile }
}
