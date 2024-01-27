import { Height } from "react-animate-height"

import { extractColorsTip } from "../data/tips"

import { IoSettingsOutline } from "react-icons/io5"
import CheckBoxDeleteButton from "./CheckBoxDeleteButton"
import Tip from "./UI/Tip"

interface ICheckBoxButtonsProps {
  label: string
  tableHeight?: Height
  handleShowOptions?: () => void
}

const CheckBoxButtons: React.FC<ICheckBoxButtonsProps> = ({
  handleShowOptions,
  label,
  tableHeight,
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
      {label === "Извлечь цвета" && <Tip tip={extractColorsTip} />}
      <CheckBoxDeleteButton label={label} tableHeight={tableHeight} />
    </>
  )
}

export default CheckBoxButtons
