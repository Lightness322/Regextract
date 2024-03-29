import { useEffect, useState } from "react"
import { useChangeWordOption } from "../hooks/useChangeWordOption"
import { useUserId } from "../hooks/useUserId"

import { deleteWordDuplicates, formatLabel } from "../utils/helpers"
import { DeleteContext } from "../context/DeleteContext"

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

  const { userId } = useUserId()

  useEffect(() => {
    if (JSON.stringify(currentWords) === JSON.stringify(words)) {
      setSaveButtonHeight(0)
    } else {
      setSaveButtonHeight("auto")
    }
  }, [currentWords, setSaveButtonHeight, words])

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
      if (a.variants.toLowerCase() > b.variants.toLowerCase()) {
        return 1
      }
      if (a.variants.toLowerCase() < b.variants.toLowerCase()) {
        return -1
      }
      return 0
    }),
  ]

  return (
    <div>
      <DeleteContext.Provider
        value={{
          deleteFn: deleteWord,
          isDeleting: isWordDeleting,
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
          updateWords({
            label,
            params: deleteWordDuplicates(currentWords),
            userId,
          })
        }
        isUpdating={isWordsUpdating}
      />
      <WordsOptionTable
        currentWords={currentWords}
        setCurrentWords={setCurrentWords}
        optionTableHeight={optionTableHeight}
        setSaveButtonHeight={setSaveButtonHeight}
      />
    </div>
  )
}

export default WordsOption
