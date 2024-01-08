import { columns } from "../../data/columns"

import { FieldValues, UseFormRegister } from "react-hook-form"

import Label from "./Label"

interface IColumnSelectProps {
  label: string
  formValue: string
  register: UseFormRegister<FieldValues>
  value: string
  setValue: (letter: string) => void
}

const ColumnSelect: React.FC<IColumnSelectProps> = ({
  label,
  formValue,
  register,
  value,
  setValue,
}) => {
  return (
    <div className="flex gap-x-2 items-center">
      <Label>{label}</Label>
      <select
        className="border-[#d4ab85] rounded-md text-lg font-semibold border-solid focus:border-[#ca8544] focus:ring-0 py-1"
        value={value}
        {...register(formValue, {
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value),
        })}
      >
        {columns.map((elem) => (
          <option key={elem}>{elem}</option>
        ))}
      </select>
    </div>
  )
}

export default ColumnSelect
