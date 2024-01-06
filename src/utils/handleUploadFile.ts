import Excel from "exceljs"
import { columns } from "../data/columns"

interface IHandleUploadFileArgs {
  setFile: (file: File) => void
  setIsFileLoading: (isLoading: boolean) => void
  setWorkbook: (workbook: Excel.Workbook) => void
  setSheet: (sheet: Excel.Worksheet) => void
  setPatternColumn: (column: string[]) => void
  productsColumnLetter: string
}

export function handleUploadFile({
  setFile,
  setIsFileLoading,
  setWorkbook,
  setSheet,
  setPatternColumn,
  productsColumnLetter,
}: IHandleUploadFileArgs) {
  return async function handleChange(file: File) {
    setIsFileLoading(true)

    setFile(file)

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

        const productsColumn = sheet!.getColumn(
          columns.indexOf(productsColumnLetter) + 1
        ).values

        const patternArray: string[] = []

        for (let i = 1; i < productsColumn.length; i++) {
          patternArray.push(String(productsColumn.at(i)))
        }

        setPatternColumn(patternArray)
      }

      setIsFileLoading(false)
    }
  }
}
