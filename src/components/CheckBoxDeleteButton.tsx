import { useState } from "react"

import { Height } from "react-animate-height"

import { immutableLabels } from "../data/immutableLabels"

import { IoClose } from "react-icons/io5"
import ConfirmDeleteButtons from "./UI/ConfirmDeleteButtons"
import Modal from "./UI/Modal"

interface ICheckBoxDeleteButtonProps {
  label: string
  tableHeight?: Height
}

const CheckBoxDeleteButton: React.FC<ICheckBoxDeleteButtonProps> = ({
  label,
  tableHeight,
}) => {
  const [isModalShow, setIsModalShow] = useState<boolean>(false)

  return (
    <>
      <Modal isModalShow={isModalShow} setIsModalShow={setIsModalShow}>
        <ConfirmDeleteButtons label={label} setIsModalShow={setIsModalShow} />
      </Modal>
      {!immutableLabels.includes(label) && (
        <>
          {tableHeight !== 0 && (
            <>
              <button
                className="text-red-700 hover:text-red-500 shrink-0"
                onClick={() => setIsModalShow(true)}
                type="button"
              >
                <IoClose size="30" />
              </button>
            </>
          )}
        </>
      )}
    </>
  )
}

export default CheckBoxDeleteButton
