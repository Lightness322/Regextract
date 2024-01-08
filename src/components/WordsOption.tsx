import { useState } from "react"
import { useChangeWordOption } from "../hooks/useChangeWordOption"
import { useShowSaveWordButton } from "../hooks/useShowSaveWordButton"

import { formatLabel } from "../utils/helpers"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { IWord } from "../types/wordsTypes"
import { Height } from "react-animate-height"

import WordsOptionTable from "./WordsOptionTable"
import SaveButton from "./UI/SaveButton"
import CheckBox from "./CheckBox"

interface IWordsOptionProps {
  register: UseFormRegister<FieldValues>
  label: string
  words: IWord[]
}
const WordsOption: React.FC<IWordsOptionProps> = ({
  register,
  label,
  words,
}) => {
  const [optionTableHeight, setOptionTableHeight] = useState<Height>(0)

  const [currentWords, setCurrentWords] = useState<IWord[]>(words)

  const {
    saveButtonHeight,
    setSaveButtonHeight,
    updateWords,
    deleteWord,
    isWordsUpdating,
    isWordDeleting,
  } = useChangeWordOption({ setCurrentWords })

  const { handleShowSaveWordButton } = useShowSaveWordButton({
    saveButtonHeight,
    setSaveButtonHeight,
    words,
  })

  function handleShowOptions() {
    if (optionTableHeight === 0) {
      setOptionTableHeight("auto")
      setCurrentWords(words)
    }
    if (optionTableHeight === "auto") {
      setOptionTableHeight(0)
      setSaveButtonHeight(0)
    }
  }

  words = [
    ...words.sort((a, b) => {
      if (a.variants > b.variants) {
        return 1
      }
      if (a.variants < b.variants) {
        return -1
      }
      return 0
    }),
  ]

  return (
    <div>
      <CheckBox
        label={`${label}`}
        formValue={formatLabel(label)}
        register={register}
        tableHeight={optionTableHeight}
        handleShowOptions={handleShowOptions}
        deleteExtractionOption={deleteWord}
        isOptionDeleting={isWordDeleting}
      ></CheckBox>
      <SaveButton
        buttonHeight={saveButtonHeight}
        updateFn={() => updateWords({ label, params: currentWords })}
        isUpdating={isWordsUpdating}
      />
      <WordsOptionTable
        currentWords={currentWords}
        setCurrentWords={setCurrentWords}
        handleShowSaveWordButton={handleShowSaveWordButton}
        optionTableHeight={optionTableHeight}
        setSaveButtonHeight={setSaveButtonHeight}
      />
    </div>
  )
}

export default WordsOption
