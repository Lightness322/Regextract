import { FieldValues, UseFormRegister } from "react-hook-form"

interface ITableDataProps {
  formValue: string
  register: UseFormRegister<FieldValues>
}

const TableData: React.FC<ITableDataProps> = ({ formValue, register }) => {
  return (
    <td>
      <input
        className="p-0 border border-solid border-[#ca8544] rounded-md text-center w-[250px]"
        {...register(formValue)}
      />
    </td>
  )
}

export default TableData
