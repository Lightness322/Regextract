import { useEffect, useState } from "react"
import { useChangeMeasureOption } from "../hooks/useChangeMeasureOption"
import { useUserId } from "../hooks/useUserId"

import { formatLabel } from "../utils/helpers"
import { DeleteContext } from "../context/DeleteContext"

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

  const { userId } = useUserId()

  useEffect(() => {
    if (JSON.stringify(currentMeasures) === JSON.stringify(measures)) {
      setSaveButtonHeight(0)
    } else {
      setSaveButtonHeight("auto")
    }
  }, [currentMeasures, measures, setSaveButtonHeight])

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
      <DeleteContext.Provider
        value={{
          deleteFn: deleteMeasure,
          isDeleting: isMeasureDeleting,
        }}
      >
        <CheckBox
          label={`${label}`}
          formValue={formatLabel(label)}
          register={register}
          tableHeight={optionTableHeight}
          handleShowOptions={handleShowOptions}
        />
      </DeleteContext.Provider>
      <SaveButton
        buttonHeight={saveButtonHeight}
        updateFn={() =>
          updateMeasures({ label, params: currentMeasures, userId })
        }
        isUpdating={isMeasureUpdating}
      />
      <MeasuresOptionTable
        currentMeasures={currentMeasures}
        optionTableHeight={optionTableHeight}
        setCurrentMeasures={setCurrentMeasures}
        setSaveButtonHeight={setSaveButtonHeight}
      />
    </div>
  )
}

export default MeasuresOption
