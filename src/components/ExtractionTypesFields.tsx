import { FieldValues, UseFormRegister } from "react-hook-form"
import { IMeasureData } from "../types/measuresTypes"
import { IWordData } from "../types/wordsTypes"
import { IQuantityData } from "../types/quantitiesTypes"

import ExtractionMeasureField from "./ExtractionMeasureField"
import ExtractionWordField from "./ExtractionWordField"

interface IExtractionTypesFieldsProps {
  register: UseFormRegister<FieldValues>
  measuresData: IMeasureData[] | undefined
  wordsData: IWordData[] | undefined
  quantitiesData: IQuantityData[] | undefined
  setIsMeasuresModalShow: (isShow: boolean) => void
  setIsWordsModalShow: (isShow: boolean) => void
}

const ExtractionTypesFields: React.FC<IExtractionTypesFieldsProps> = ({
  register,
  measuresData,
  wordsData,
  quantitiesData,
  setIsMeasuresModalShow,
  setIsWordsModalShow,
}) => {
  return (
    <div className="grid grid-cols-2 max-[1230px]:flex flex-col gap-y-10">
      <ExtractionMeasureField
        register={register}
        measuresData={measuresData}
        quantitiesData={quantitiesData}
        setIsMeasuresModalShow={setIsMeasuresModalShow}
      />
      <ExtractionWordField
        register={register}
        wordsData={wordsData}
        setIsWordsModalShow={setIsWordsModalShow}
      />
    </div>
  )
}

export default ExtractionTypesFields
