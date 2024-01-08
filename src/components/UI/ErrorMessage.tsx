interface IErrorMessageProps {
  error: Error | null
}

const ErrorMessage: React.FC<IErrorMessageProps> = ({ error }) => {
  if (error)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="h-20 w-20 -translate-y-20 grow text-center">
          {error.message}
        </div>
      </div>
    )
}

export default ErrorMessage
