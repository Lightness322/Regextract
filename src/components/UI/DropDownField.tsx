import { IoClose } from "react-icons/io5"
import Loader from "./Loader"

interface IDropDownFieldProps {
  file: File | null
  isFileLoading: boolean
  setFile: (file: File | null) => void
  setObjUrl: (url: string) => void
}

const DropDownField: React.FC<IDropDownFieldProps> = ({
  file,
  isFileLoading,
  setFile,
  setObjUrl,
}) => {
  return (
    <div
      className={`border-dashed border-2 rounded-3xl border-[#ca8544] h-56 flex justify-center items-center ${
        file ? "" : "hover:underline cursor-pointer"
      }`}
    >
      {!file && !isFileLoading && (
        <div className="text-lg font-medium">Загрузите файл в формате XLSX</div>
      )}
      {isFileLoading && (
        <div className="h-10 w-10">
          <Loader />
        </div>
      )}
      {file && !isFileLoading && (
        <div className="flex items-center">
          <div className="text-lg">
            <span>Загружен файл: </span>
            <span className="font-semibold">{file.name}</span>
          </div>
          <button
            className="text-red-700 hover:text-red-500"
            onClick={() => {
              setFile(null)
              setObjUrl("")
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
