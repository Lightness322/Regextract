import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import Label from "./UI/Label"
import { CiSquarePlus } from "react-icons/ci"
import { IoClose } from "react-icons/io5"
import Button from "./UI/Button"
import { IWord } from "../types/wordsTypes"
import { insertWord as handleWordInsert } from "../services/apiWords"

interface IAddWordExtractionFormProps {
  setIsModalShow: (isShow: boolean) => void
}

const array: IWord[] = [{ variants: "" }]

const AddWordExtractionForm: React.FC<IAddWordExtractionFormProps> = ({
  setIsModalShow,
}) => {
  const [currentWords, setCurrentWords] = useState<IWord[]>(array)
  const [label, setLabel] = useState<string>("Извлечь ...")

  const queryClient = useQueryClient()

  const {
    mutate: insertWord,
    // isPending: isColorUpdating,
    // error: colorUpdatingError,
  } = useMutation({
    mutationFn: handleWordInsert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] })
      setIsModalShow(false)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    insertWord({
      label,
      params: currentWords,
    })
  }

  function handleChangeWords(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    setCurrentWords((prevState) =>
      prevState.map((wordObj, i) => {
        if (index === i) {
          return { ...wordObj, variants: e.target.value }
        }
        return { ...wordObj }
      })
    )
  }

  return (
    <form
      className="bg-white p-20 flex flex-col gap-y-5 rounded-xl shadow-xl shadow-[#0000005f]"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="px-4 flex gap-x-5">
        <Label>Название</Label>
        <input
          className="p-0 border border-solid border-[#ca8544] rounded-md text-center w-full"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <table className="text-left border-spacing-x-4 border-spacing-y-1 border-separate">
        <thead>
          <tr>
            <th>Величина</th>
          </tr>
        </thead>
        <tbody>
          {currentWords.map((wordObj, i) => (
            <tr key={i}>
              <td>
                <input
                  className="p-0 border border-solid border-[#ca8544] rounded-md text-center w-[500px]"
                  value={wordObj.variants}
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
                    setCurrentWords((curArray) =>
                      curArray.filter((_, ind) => ind !== i)
                    )
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
                onClick={() =>
                  setCurrentWords((curArray) => [...curArray, { variants: "" }])
                }
              >
                <CiSquarePlus size="30" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center">
        <Button type="submit">Добавить</Button>
      </div>
    </form>
  )
}

export default AddWordExtractionForm
