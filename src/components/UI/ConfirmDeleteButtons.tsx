import { useContext } from "react"
import { useUserId } from "../../hooks/useUserId"

import { DeleteContext } from "../../context/DeleteContext"

import { TypeSetStateFunction } from "../../types/TypeSetStateFunction"

import Button from "./Button"
import Loader from "./Loader"

interface IConfirmDeleteButtonsProps {
  label: string
  setIsModalShow: TypeSetStateFunction<boolean>
}

const ConfirmDeleteButtons: React.FC<IConfirmDeleteButtonsProps> = ({
  label,
  setIsModalShow,
}) => {
  const contextValue = useContext(DeleteContext)

  const { userId } = useUserId()

  const deleteFn = contextValue !== null ? contextValue.deleteFn : null

  const isDeleting = contextValue !== null ? contextValue.isDeleting : null

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
            disabled={isDeleting!}
            onClick={() => deleteFn!({ label, userId })}
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
