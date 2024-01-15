import { TypeSetStateFunction } from "../../types/TypeSetStateFunction"

import Button from "./Button"
import Loader from "./Loader"

interface IConfirmDeleteButtonsProps {
  label: string
  deleteFn?: (label: string) => void
  isDeleting?: boolean
  setIsModalShow: TypeSetStateFunction<boolean>
}

const ConfirmDeleteButtons: React.FC<IConfirmDeleteButtonsProps> = ({
  label,
  isDeleting,
  deleteFn,
  setIsModalShow,
}) => {
  return (
    <div className="h-40 w-72 bg-white flex flex-col justify-center items-center rounded-xl gap-y-5">
      <div className="font-semibold text-xl">Вы уверены?</div>
      <div className="flex gap-x-8">
        {isDeleting ? (
          <span className="h-[52px] w-[56.88px] text-primary-color flex justify-center">
            <Loader />
          </span>
        ) : (
          <Button
            type="button"
            disabled={isDeleting}
            onClick={() => deleteFn!(label)}
          >
            Да
          </Button>
        )}
        <Button type="button" onClick={() => setIsModalShow(false)}>
          Нет
        </Button>
      </div>
    </div>
  )
}

export default ConfirmDeleteButtons
