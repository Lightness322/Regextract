import CheckBox from "./UI/CheckBox"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { IWord } from "../types/wordsTypes"
import { formatLabel } from "../utils/helpers"
import { useState } from "react"
import AnimateHeight, { Height } from "react-animate-height"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  deleteWord as handleDeleteWord,
  updateWords as handleUpdateWords,
} from "../services/apiWords"
import { FaCheck } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { CiSquarePlus } from "react-icons/ci"

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
  const [height, setHeight] = useState<Height>(0)
  const [buttonsHeight, setButtonsHeight] = useState<Height>(0)

  const [currentWords, setCurrentWords] = useState<IWord[]>(words)

  const queryClient = useQueryClient()

  const {
    mutate: updateWords,
    isPending: isColorUpdating,
    error: colorUpdatingError,
  } = useMutation({
    mutationFn: handleUpdateWords,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] })
      setButtonsHeight(0)
      setCurrentWords((curWords) =>
        curWords.sort((a, b) => {
          if (a.variants > b.variants) {
            return 1
          }
          if (a.variants < b.variants) {
            return -1
          }
          return 0
        })
      )
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const {
    mutate: deleteWord,
    isPending: isDeletingWord,
    error: deleteError,
  } = useMutation({
    mutationFn: handleDeleteWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] })
    },
    onError: (error) => {
      console.log(error)
    },
  })

  function handleShowOptions() {
    if (height === 0) {
      setHeight("auto")
      setCurrentWords(words)
    }
    if (height === "auto") {
      setHeight(0)
      setButtonsHeight(0)
    }
  }

  function handleShowButtons(
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) {
    const defaultValue = words.filter((_, index) => i === index).at(0)!

    if (defaultValue.variants !== e.target.value && !buttonsHeight) {
      setButtonsHeight("auto")
    }
    if (defaultValue.variants === e.target.value && buttonsHeight) {
      setButtonsHeight(0)
    }
  }

  function handleChangeWords(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    handleShowButtons(e, index)

    setCurrentWords((prevState) =>
      prevState.map((measureObj, i) => {
        if (index === i) {
          return { ...measureObj, variants: e.target.value }
        }
        return { ...measureObj }
      })
    )
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
        height={height}
        handleShowOptions={handleShowOptions}
        deleteExtractionOption={deleteWord}
      ></CheckBox>
      <AnimateHeight height={buttonsHeight} duration={500}>
        <button
          type="button"
          onClick={() => updateWords({ label, params: currentWords })}
        >
          Сохранить
        </button>
      </AnimateHeight>
      <AnimateHeight duration={500} height={height}>
        <table className="text-left border-spacing-x-4 border-spacing-y-1 border-separate mt-3">
          <thead>
            <tr>
              <th>Величина</th>
            </tr>
          </thead>
          <tbody>
            {currentWords.map((word, i) => (
              <tr key={i}>
                <td>
                  <input
                    className="p-0 border border-solid border-[#ca8544] rounded-md text-center w-[500px]"
                    value={word.variants}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChangeWords(e, i)
                    }}
                  />
                </td>
                <td className="flex justify-center items-center">
                  <button
                    className="text-red-700 hover:text-red-500"
                    type="button"
                    onClick={() => {
                      const newMeasures = currentWords.filter(
                        (_, deleteIndex) => deleteIndex !== i
                      )
                      // updateWords({ label, params: newMeasures })

                      setCurrentWords(newMeasures)
                      setButtonsHeight("auto")
                    }}
                  >
                    <IoClose size="30" />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <button
                  className="text-green-700 hover:text-green-500"
                  type="button"
                  onClick={() => {
                    // updateWords({
                    //   label,
                    //   params: [{ variants: "" }, ...currentWords],
                    // })
                    setCurrentWords((curWords) => [
                      { variants: "" },
                      ...curWords,
                    ])
                    setButtonsHeight("auto")
                  }}
                >
                  <CiSquarePlus size="30" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </AnimateHeight>
    </div>
  )
}

export default WordsOption
