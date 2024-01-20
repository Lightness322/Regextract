import AnimateHeight, { Height } from "react-animate-height"
import Button from "./Button"
import Loader from "./Loader"

interface ISaveButtonProps {
  buttonHeight: Height
  updateFn: () => void
  isUpdating: boolean
}

const SaveButton: React.FC<ISaveButtonProps> = ({
  buttonHeight,
  updateFn,
  isUpdating,
}) => {
  return (
    <AnimateHeight height={buttonHeight} duration={500}>
      <div className="py-3 pl-1">
        <Button type="button" size="sm" color="green" onClick={updateFn}>
          {!isUpdating ? (
            <span>Сохранить</span>
          ) : (
            <span className="w-[84px] h-[24px] flex justify-center">
              <Loader />
            </span>
          )}
        </Button>
      </div>
    </AnimateHeight>
  )
}

export default SaveButton
