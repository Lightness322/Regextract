import Excel from "exceljs"

import { IoClose } from "react-icons/io5"
import Loader from "./UI/Loader"

interface IDropDownFieldProps {
  file: File | null
  isFileLoading: boolean
  setFile: (file: File | null) => void
  setObjUrl: (url: string) => void
  setSheet: (sheet: Excel.Worksheet | undefined) => void
  isFileTypeWrong: boolean
}

const DropDownField: React.FC<IDropDownFieldProps> = ({
  file,
  isFileLoading,
  setFile,
  setObjUrl,
  setSheet,
  isFileTypeWrong,
}) => {
  return (
    <div
      className={`border-dashed border-2 rounded-3xl text-xl border-[#ca8544] h-56 flex justify-center items-center ${
        file ? "" : "hover:underline cursor-pointer"
      }`}
    >
      {!file && !isFileLoading && (
        <div className="font-medium relative">
          <span>Загрузите файл в формате XLSX</span>
          {isFileTypeWrong && (
            <span className="absolute bottom-[-40px] left-0 w-full text-center text-red-700 text-lg">
              Неверный тип файла
            </span>
          )}
        </div>
      )}
      {isFileLoading && (
        <span className="text-primary-color">
          <Loader size="big" />
        </span>
      )}
      {file && !isFileLoading && (
        <div className="flex items-center">
          <div>
            <span>Загружен файл: </span>
            <span className="font-semibold">{file.name}</span>
          </div>
          <button
            className="text-red-700 hover:text-red-500"
            onClick={() => {
              setFile(null)
              setObjUrl("")
              setSheet(undefined)
            }}
          >
            <IoClose size="30" />
          </button>
        </div>
      )}
    </div>
  )
}

export default DropDownField
