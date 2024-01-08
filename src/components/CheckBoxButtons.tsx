import { Height } from "react-animate-height"

import { IoSettingsOutline } from "react-icons/io5"
import CheckBoxDeleteButton from "./CheckBoxDeleteButton"
import Tip from "./UI/Tip"

interface ICheckBoxButtonsProps {
  label: string
  tableHeight?: Height
  handleShowOptions?: () => void
  deleteExtractionOption?: (label: string) => void
  isOptionDeleting?: boolean
}

const CheckBoxButtons: React.FC<ICheckBoxButtonsProps> = ({
  handleShowOptions,
  label,
  tableHeight,
  deleteExtractionOption,
  isOptionDeleting,
}) => {
  return (
    <>
      <button
        className={`transition-transform shrink-0 duration-500 ${
          tableHeight === 0 ? "rotate-0" : "rotate-90"
        } text-[#ca8544] hover:text-[#d4ab85]
`}
        onClick={handleShowOptions}
        type="button"
      >
        <IoSettingsOutline size="24" />
      </button>
      {label === "Извлечь цвета" && (
        <Tip tip="Для каждого цвета также будут искаться оттенки: светло|т[её]мно|light|dark, т.е. такие вариации можно не указывать." />
      )}
      <CheckBoxDeleteButton
        label={label}
        tableHeight={tableHeight}
        deleteExtractionOption={deleteExtractionOption}
        isOptionDeleting={isOptionDeleting}
      />
    </>
  )
}

export default CheckBoxButtons
