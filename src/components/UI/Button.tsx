import { ReactNode } from "react"

interface IButtonProps {
  children: ReactNode | JSX.Element
  onClick?: () => void
  disabled?: boolean
  type: "button" | "submit"
  size?: "md" | "sm"
  color?: "primary" | "green"
}

interface IColors {
  primary: string
  green: string
}

interface ISizes {
  sm: string
  md: string
}

const colors: IColors = {
  primary: "hover:text-primary-color bg-primary-color",
  green: "hover:text-green-600 bg-green-600",
}

const sizes: ISizes = {
  sm: "p-[6px] text-base max-[560px]:p-[4px] max-[560px]:text-sm",
  md: "p-3 text-lg max-[560px]:p-2 max-[560px]:text-base",
}

const Button: React.FC<IButtonProps> = ({
  children,
  type,
  disabled = false,
  onClick,
  size = "md",
  color = "primary",
}) => {
  return (
    <button
      className={`${sizes[size]} min-w-14 rounded-lg text-white font-semibold ${
        disabled
          ? "bg-gray-500"
          : `${colors[color]} hover:bg-white hover:outline`
      }`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
