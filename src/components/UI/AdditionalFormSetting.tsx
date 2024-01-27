import { useState } from "react"

import { FieldValues, UseFormRegister } from "react-hook-form"

interface IAdditionalFormSettingProps {
  register: UseFormRegister<FieldValues>
  tip: string
  formTitle: string
  btnComponent: React.JSX.Element
  positioning: string
}

const AdditionalFormSetting: React.FC<IAdditionalFormSettingProps> = ({
  register,
  tip,
  formTitle,
  btnComponent,
  positioning,
}) => {
  const [isSettingOn, setIsSettingOn] = useState<boolean>(false)

  return (
    <>
      <input
        className={`bg-primary-color h-[25px] w-[25px] z-10 opacity-0 cursor-pointer ${positioning}`}
        onClick={() => setIsSettingOn((isOn) => !isOn)}
        type="checkbox"
        title={tip}
        {...register(formTitle)}
      />
      <button
        className={`${positioning} ${
          isSettingOn ? "text-green-600" : "text-gray-400"
        }`}
      >
        {btnComponent}
      </button>
    </>
  )
}

export default AdditionalFormSetting
