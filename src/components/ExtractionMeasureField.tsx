import { FieldValues, UseFormRegister } from "react-hook-form"
import { IMeasureData } from "../types/measuresTypes"
import { IQuantityData } from "../types/quantitiesTypes"

import { extractMeasuresTip, extractSizesTip } from "../data/tips"

import { CiSquarePlus } from "react-icons/ci"
import { RiSwapBoxLine } from "react-icons/ri"
import AdditionalFormSetting from "./UI/AdditionalFormSetting"
import QuantitiesOption from "./QuantitiesOption"
import MeasuresOption from "./MeasuresOption"
import CheckBox from "./CheckBox"
import Tip from "./UI/Tip"

interface IExtractionMeasureFieldProps {
  register: UseFormRegister<FieldValues>
  measuresData: IMeasureData[] | undefined
  quantitiesData: IQuantityData[] | undefined
  setIsMeasuresModalShow: (isShow: boolean) => void
}

const ExtractionMeasureField: React.FC<IExtractionMeasureFieldProps> = ({
  register,
  measuresData,
  quantitiesData,
  setIsMeasuresModalShow,
}) => {
  return (
    <div>
      <div className="text-2xl font-semibold mb-3 flex gap-x-4 items-center">
        <span>Извлечение величин</span>
        <Tip tip={extractMeasuresTip} />
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
          <QuantitiesOption
            register={register}
            quantities={quantitiesData!.at(0)!.params}
          />
          <div className="relative">
            <CheckBox
              label="Извлечь размер SxS"
              formValue="sizes"
              register={register}
            ></CheckBox>
            <AdditionalFormSetting
              positioning="absolute left-[185px] top-[2px]"
              formTitle="isSwapSizes"
              btnComponent={<RiSwapBoxLine size="25" />}
              register={register}
              tip={extractSizesTip}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExtractionMeasureField
