interface IContainerProps {
  children: React.JSX.Element[]
}

const Container: React.FC<IContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[1280px] mx-auto h-screen px-5 flex flex-col gap-y-4">
      {children}
    </div>
  )
}

export default Container
