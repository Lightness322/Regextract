import { FieldValues, UseFormRegister } from "react-hook-form"
import { IMeasureData } from "../types/measuresTypes"

import { CiSquarePlus } from "react-icons/ci"
import SwapSizesButton from "./UI/SwapSizesButton"
import MeasuresOption from "./MeasuresOption"
import CheckBox from "./CheckBox"
import Tip from "./UI/Tip"

interface IExtractionMeasureFieldProps {
  register: UseFormRegister<FieldValues>
  measuresData: IMeasureData[] | undefined
  setIsMeasuresModalShow: (isShow: boolean) => void
}

const ExtractionMeasureField: React.FC<IExtractionMeasureFieldProps> = ({
  register,
  measuresData,
  setIsMeasuresModalShow,
}) => {
  return (
    <div>
      <div className="text-2xl font-semibold mb-3 flex gap-x-4 items-center">
        <span>Извлечение величин</span>
        <Tip tip="В столбце 'Величина' указываются вариации величин через '|'. В столбце 'Коэффициент' нужно указать '1' для наименьшей величины, и затем коэффициент будет равен числу, которое в N раз больше величины с коэффициентом '1'" />
        <button
          className="text-green-700 hover:text-green-500"
          onClick={() => setIsMeasuresModalShow(true)}
          type="button"
        >
          <CiSquarePlus size="35" />
        </button>
      </div>
      <div className="flex flex-col gap-y-3">
        {measuresData!.map((measureObj) => (
          <MeasuresOption
            label={measureObj.label}
            register={register}
            measures={measureObj.params}
            key={measureObj.label}
          />
        ))}
        <div className="flex flex-col gap-y-3 mt-4">
          <CheckBox
            label="Извлечь количество"
            formValue="quantities"
            register={register}
          ></CheckBox>
          <div className="relative">
            <CheckBox
              label="Извлечь размер SxS"
              formValue="sizes"
              register={register}
            ></CheckBox>
            <SwapSizesButton register={register} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExtractionMeasureField
