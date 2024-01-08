const sizes = {
  big: "h-10 w-10",
  base: "h-5 w-5",
}

interface ILoaderProps {
  size?: "big" | "base"
}

const Loader: React.FC<ILoaderProps> = ({ size = "base" }) => {
  return (
    <div className="flex justify-center items-center">
      <span
        className={`${sizes[size]} border-solid border-r-transparent rounded-full animate-spin`}
      ></span>
    </div>
  )
}

export default Loader
