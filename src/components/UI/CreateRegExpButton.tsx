import AnimateHeight, { Height } from "react-animate-height"
import Button from "./Button"

interface ICreateRegExpButtonProps {
  isRegExpCreating: boolean
  buttonHeight: Height
}

const CreateRegExpButton: React.FC<ICreateRegExpButtonProps> = ({
  isRegExpCreating,
  buttonHeight,
}) => {
  return (
    <div className="flex items-center gap-x-5">
      <AnimateHeight duration={500} height={buttonHeight}>
        <div className="flex justify-start my-5">
          {isRegExpCreating ? (
            <div className="p-3 text-base font-semibold text-primary-color outline outline-primary-color rounded-lg">
              Создание...
            </div>
          ) : (
            <Button type="submit">Создать регулярные выражения</Button>
          )}
        </div>
      </AnimateHeight>
    </div>
  )
}

export default CreateRegExpButton
