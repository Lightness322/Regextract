import { ReactNode } from "react"

interface ILabelProps {
  children: JSX.Element | ReactNode
}

const Label: React.FC<ILabelProps> = ({ children }) => {
  return (
    <label className="underline-offset-4 underline decoration-[#ca8544] text-lg font-semibold">
      {children}
    </label>
  )
}

export default Label
