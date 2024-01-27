import { useState } from "react"
import { useUploadFile } from "../hooks/useUploadFile"

import Excel from "exceljs"

import { FileUploader } from "react-drag-drop-files"
import Container from "../components/UI/Container"
import Header from "../components/Header"
import ExtractionOptions from "../components/ExtractionOptions"
import DropDownField from "../components/DropDownField"
import DownloadButtons from "../components/DownloadButtons"

const MainPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [isFileLoading, setIsFileLoading] = useState<boolean>(false)
  const [isFileTypeWrong, setIsFileTypeWrong] = useState<boolean>(false)

  const [workbook, setWorkbook] = useState<Excel.Workbook | undefined>(
    undefined
  )
  const [sheet, setSheet] = useState<Excel.Worksheet | undefined>(undefined)

  const [objUrl, setObjUrl] = useState("")

  const { uploadFile } = useUploadFile({
    setFile,
    setIsFileLoading,
    setSheet,
    setWorkbook,
    setIsFileTypeWrong,
  })

  return (
    <Container>
      <Header />
      <FileUploader
        dropMessageStyle={{
          fontSize: "0px",
          backgroundColor: "#d4ab85",
          borderRadius: "24px",
        }}
        handleChange={(file: File) => uploadFile(file)}
        onTypeError={() => setIsFileTypeWrong(true)}
        types={["XLSX"]}
        disabled={file || isFileLoading}
      >
        <DropDownField
          file={file}
          isFileLoading={isFileLoading}
          setFile={setFile}
          setSheet={setSheet}
          setObjUrl={setObjUrl}
          isFileTypeWrong={isFileTypeWrong}
        />
      </FileUploader>
      <DownloadButtons objUrl={objUrl} />
      <ExtractionOptions
        workbook={workbook}
        sheet={sheet}
        setObjUrl={setObjUrl}
      />
    </Container>
  )
}

export default MainPage
