import { useState } from "react"

import { FieldValues, UseFormRegister } from "react-hook-form"

import { RiSwapBoxLine } from "react-icons/ri"

interface ISwapSizesButtonProps {
  register: UseFormRegister<FieldValues>
}

const SwapSizesButton: React.FC<ISwapSizesButtonProps> = ({ register }) => {
  const [isSwapSizes, setIsSwapSizes] = useState<boolean>(false)

  return (
    <>
      <input
        className="bg-primary-color absolute left-[185px] top-[2px] h-[25px] w-[25px] z-10 opacity-0 cursor-pointer"
        onClick={() => setIsSwapSizes((isSwap) => !isSwap)}
        type="checkbox"
        title="Если вкл, то регулярка создается также для обратного размера"
        {...register("isSwapSizes")}
      />
      <button
        className={`absolute left-[185px] top-[2px] ${
          isSwapSizes ? "text-green-600" : "text-gray-400"
        }`}
      >
        <RiSwapBoxLine size="25" />
      </button>
    </>
  )
}

export default SwapSizesButton
