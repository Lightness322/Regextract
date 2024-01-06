import { ReactNode } from "react"

interface IButtonProps {
  children: ReactNode | JSX.Element
  type: "button" | "submit"
  disabled?: boolean
  onClick?: () => void
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
  sm: "p-[6px] text-base",
  md: "p-3 text-lg",
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
      className={`${sizes[size]} rounded-lg text-white font-semibold ${
        disabled
          ? "cursor-not-allowed bg-gray-500"
          : `hover:bg-white hover:outline ${colors[color]}`
      }
          }`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
