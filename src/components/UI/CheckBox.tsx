import { Height } from "react-animate-height"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { IoClose, IoSettingsOutline } from "react-icons/io5"
import Label from "./Label"
import { deleteMeasure as handleDeleteMeasure } from "../../services/apiMeasures"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface ICheckBoxProps {
  className?: string
  label: string
  formValue: string
  register: UseFormRegister<FieldValues>
  height?: Height
  handleShowOptions?: () => void
  deleteExtractionOption?: (label: string) => void
}

const CheckBox: React.FC<ICheckBoxProps> = ({
  className,
  label,
  formValue,
  register,
  height,
  handleShowOptions,
  deleteExtractionOption,
}) => {
  // const queryClient = useQueryClient()

  const {
    mutate: deleteMeasure,
    isPending: isDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: handleDeleteMeasure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["measures"] })
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return (
    <div
      className={`grid grid-cols-[250px,_min-content] items-center ${
        className ? className : ""
      }`}
    >
      <div className="flex gap-x-2 items-center">
        <Label>{label}</Label>
        {handleShowOptions && (
          <>
            <button
              className={`transition-transform duration-500 ${
                height === 0 ? "rotate-0" : "rotate-90"
              } text-[#ca8544] hover:text-[#d4ab85]
          `}
              type="button"
              onClick={handleShowOptions}
            >
              <IoSettingsOutline size="24" />
            </button>
            {height !== 0 && (
              <button
                className="text-red-700 hover:text-red-500"
                type="button"
                // onClick={() => deleteMeasure(label)}
                onClick={() => deleteExtractionOption!(label)}
              >
                <IoClose size="30" />
              </button>
            )}
          </>
        )}
      </div>
      <input
        className="bg-[#dfba8688] text-primary-color focus:ring-secondary-color h-5 w-5 rounded-md cursor-pointer hover:outline hover:outline-secondary-color hover:outline-2 hover:outline-offset-2"
        defaultChecked
        type="checkbox"
        {...register(formValue)}
      />
    </div>
  )
}

export default CheckBox
