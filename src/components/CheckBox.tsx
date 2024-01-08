import { FieldValues, UseFormRegister } from "react-hook-form"
import { Height } from "react-animate-height"

import CheckBoxButtons from "./CheckBoxButtons"
import Label from "./UI/Label"

interface ICheckBoxProps {
  label: string
  formValue: string
  register: UseFormRegister<FieldValues>
  tableHeight?: Height
  handleShowOptions?: () => void
  deleteExtractionOption?: (label: string) => void
  isOptionDeleting?: boolean
}

const CheckBox: React.FC<ICheckBoxProps> = ({
  label,
  formValue,
  register,
  tableHeight,
  handleShowOptions,
  deleteExtractionOption,
  isOptionDeleting,
}) => {
  return (
    <div
      className={`grid items-center gap-x-2 ${
        label === "Заголовки"
          ? "grid-cols-[120px,_min-content]"
          : "grid-cols-[250px,_min-content]"
      }`}
    >
      <div className="flex gap-x-2 items-center">
        <Label>{label}</Label>
        {handleShowOptions && (
          <CheckBoxButtons
            label={label}
            deleteExtractionOption={deleteExtractionOption}
            handleShowOptions={handleShowOptions}
            tableHeight={tableHeight}
            isOptionDeleting={isOptionDeleting}
          />
        )}
      </div>
      <input
        className="bg-[#dfba8688] text-primary-color focus:ring-secondary-color h-5 w-5 rounded-md cursor-pointer hover:outline hover:outline-secondary-color hover:outline-2 hover:outline-offset-2"
        defaultChecked
        type="checkbox"
        {...register(formValue)}
      />
    </div>
  )
}

export default CheckBox
