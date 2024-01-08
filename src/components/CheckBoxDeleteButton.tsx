import { Height } from "react-animate-height"

import { IoClose } from "react-icons/io5"
import Loader from "./UI/Loader"

interface ICheckBoxDeleteButtonProps {
  label: string
  tableHeight?: Height
  deleteExtractionOption?: (label: string) => void
  isOptionDeleting?: boolean
}

const CheckBoxDeleteButton: React.FC<ICheckBoxDeleteButtonProps> = ({
  label,
  tableHeight,
  deleteExtractionOption,
  isOptionDeleting,
}) => {
  return (
    <>
      {label !== "Извлечь цвета" && (
        <>
          {tableHeight !== 0 && (
            <>
              <button
                className="text-red-700 hover:text-red-500 shrink-0"
                onClick={() => deleteExtractionOption!(label)}
                type="button"
              >
                {isOptionDeleting ? (
                  <span className="h-[30px] w-[30px] text-red-700 flex justify-center">
                    <Loader />
                  </span>
                ) : (
                  <IoClose size="30" />
                )}
              </button>
            </>
          )}
        </>
      )}
    </>
  )
}

export default CheckBoxDeleteButton
