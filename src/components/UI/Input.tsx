import { ComponentProps } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"

interface flex extends ComponentProps<"input"> {
  register?: UseFormRegister<FieldValues>
}

const Input: React.FC = ({ ...props }: flex) => {
  return (
    <input
      className="p-0 border border-solid border-[#ca8544] rounded-md text-center w-[250px]"
      {...props}
    />
  )
}

export default Input
