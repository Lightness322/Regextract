import { useState } from "react"
import ExtractionOptions from "./components/ExtractionOptions"
import { FileUploader } from "react-drag-drop-files"
import Excel from "exceljs"
import Header from "./components/Header"
import DropDownField from "./components/UI/DropDownField"
import DownloadButtons from "./components/DownloadButtons"
import Container from "./components/UI/Container"
import { handleUploadFile } from "./utils/handleUploadFile"

const fileTypes = ["XLSX"]

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [isFileLoading, setIsFileLoading] = useState<boolean>(false)
  const [workbook, setWorkbook] = useState<Excel.Workbook | undefined>(
    undefined
  )
  const [sheet, setSheet] = useState<Excel.Worksheet | undefined>(undefined)
  const [patternColumn, setPatternColumn] = useState<string[]>([])
  const [objUrl, setObjUrl] = useState("")
  const [productsColumnLetter, setProductsColumnLetter] = useState<string>("A")

  const uploadFile = handleUploadFile({
    setFile,
    setIsFileLoading,
    setPatternColumn,
    setSheet,
    setWorkbook,
    productsColumnLetter,
  })

  return (
    <Container>
      <Header />
      <FileUploader
        onTypeError={(error: Error) => console.log(error)}
        handleChange={(file: File) => uploadFile(file)}
        types={fileTypes}
        dropMessageStyle={{
          fontSize: "0px",
          backgroundColor: "#d4ab85",
          borderRadius: "24px",
        }}
        disabled={file || isFileLoading}
      >
        <DropDownField
          file={file}
          isFileLoading={isFileLoading}
          setFile={setFile}
          setObjUrl={setObjUrl}
        />
      </FileUploader>
      <DownloadButtons objUrl={objUrl} />
      <ExtractionOptions
        workbook={workbook}
        sheet={sheet}
        patternColumn={patternColumn}
        setObjUrl={setObjUrl}
        productsColumnLetter={productsColumnLetter}
        setProductsColumnLetter={setProductsColumnLetter}
      />
    </Container>
  )
}

export default App
