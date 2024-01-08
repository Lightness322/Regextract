import { useState } from "react"
import { useShowSaveMeasureButton } from "../hooks/useShowSaveMeasureButton"
import { useChangeMeasureOption } from "../hooks/useChangeMeasureOption"

import { formatLabel } from "../utils/helpers"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { IMeasure } from "../types/measuresTypes"
import { Height } from "react-animate-height"

import MeasuresOptionTable from "./MeasuresOptionTable"
import SaveButton from "./UI/SaveButton"
import CheckBox from "./CheckBox"

interface IMeasuresOptionProps {
  register: UseFormRegister<FieldValues>
  label: string
  measures: IMeasure[]
}
const MeasuresOption: React.FC<IMeasuresOptionProps> = ({
  register,
  label,
  measures,
}) => {
  const [optionTableHeight, setOptionTableHeight] = useState<Height>(0)

  const [currentMeasures, setCurrentMeasures] = useState<IMeasure[]>(measures)

  const {
    saveButtonHeight,
    setSaveButtonHeight,
    updateMeasures,
    deleteMeasure,
    isMeasureUpdating,
    isMeasureDeleting,
  } = useChangeMeasureOption({ setCurrentMeasures })

  const { handleShowSaveMeasureButton } = useShowSaveMeasureButton({
    measures,
    saveButtonHeight,
    setSaveButtonHeight,
  })

  function handleShowOptions() {
    if (optionTableHeight === 0) {
      setOptionTableHeight("auto")
      setCurrentMeasures(measures)
    }
    if (optionTableHeight === "auto") {
      setOptionTableHeight(0)
      setSaveButtonHeight(0)
    }
  }

  measures = [...measures.sort((a, b) => a.coefficient - b.coefficient)]

  return (
    <div>
      <CheckBox
        label={`${label}`}
        formValue={formatLabel(label)}
        register={register}
        tableHeight={optionTableHeight}
        handleShowOptions={handleShowOptions}
        deleteExtractionOption={deleteMeasure}
        isOptionDeleting={isMeasureDeleting}
      />
      <SaveButton
        buttonHeight={saveButtonHeight}
        updateFn={() => updateMeasures({ label, params: currentMeasures })}
        isUpdating={isMeasureUpdating}
      />
      <MeasuresOptionTable
        currentMeasures={currentMeasures}
        handleShowSaveMeasureButton={handleShowSaveMeasureButton}
        optionTableHeight={optionTableHeight}
        setCurrentMeasures={setCurrentMeasures}
        setSaveButtonHeight={setSaveButtonHeight}
      />
    </div>
  )
}

export default MeasuresOption
