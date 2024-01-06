import React from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"

interface IModalProps {
  children: React.JSX.Element | React.JSX.Element[]
  isModalShow: boolean
  setIsModalShow: (isShow: boolean) => void
}

const Modal: React.FC<IModalProps> = ({
  children,
  isModalShow,
  setIsModalShow,
}) => {
  return (
    <>
      {createPortal(
        <CSSTransition
          classNames={{
            enter: "opacity-0",
            enterActive: "transition-opacity duration-500 opacity-100",
            exitActive: "transition-opacity duration-500 opacity-0",
          }}
          timeout={500}
          in={isModalShow}
          mountOnEnter
          unmountOnExit
        >
          <div
            className="z-10 fixed h-screen w-screen left-0 top-0 bg-[#31313199] flex justify-center items-center"
            onClick={() => setIsModalShow(false)}
          >
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              {children}
            </div>
          </div>
        </CSSTransition>,
        document.getElementById("root")!
      )}
    </>
  )
}

export default Modal
