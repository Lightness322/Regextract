import { FieldValues, useForm } from "react-hook-form"
import CheckBox from "./UI/CheckBox"
import { columns } from "../data/columns"
import Excel from "exceljs"
import ColumnSelect from "./UI/ColumnSelect"
import { IMeasuresResponse } from "../types/measuresTypes"
import { useQuery } from "@tanstack/react-query"
import { getMeasures } from "../services/apiMeasures"
import MeasuresOption from "./MeasuresOption"
import { getWords } from "../services/apiWords"
import WordsOption from "./WordsOption"
import { extractRegExp } from "../utils/extractRegExp"
import Modal from "./UI/Modal"
import { useState, useEffect } from "react"
import AddMeasureExtractionForm from "./AddMeasureExtractionForm"
import { CiSquarePlus } from "react-icons/ci"
import Button from "./UI/Button"
import AnimateHeight, { Height } from "react-animate-height"
import AddWordExtractionForm from "./AddWordExtractionForm"

interface IExtractionOptionsProps {
  sheet: Excel.Worksheet | undefined
  workbook: Excel.Workbook | undefined
  patternColumn: string[]
  setObjUrl: (url: string) => void
  productsColumnLetter: string
  setProductsColumnLetter: (letter: string) => void
}

const ExtractionOptions: React.FC<IExtractionOptionsProps> = ({
  patternColumn,
  sheet,
  workbook,
  setObjUrl,
  productsColumnLetter,
  setProductsColumnLetter,
}) => {
  const [isMeasuresModalShow, setIsMeasuresModalShow] = useState<boolean>(false)
  const [isWordsModalShow, setIsWordsModalShow] = useState<boolean>(false)
  const [createRegExpButtonHeight, setCreateRegExpButtonHeight] =
    useState<Height>(0)
  const [isRegExpCreating, setIsRegExpCreating] = useState<boolean>(false)
  const [regExpColumnLetter, setRegExpColumnLetter] = useState<string>("E")

  const {
    data: measuresData,
    isLoading: isMeasuresLoading,
  }: // error: measuresError,
  IMeasuresResponse = useQuery({
    queryKey: ["measures"],
    queryFn: getMeasures,
  })

  !isMeasuresLoading &&
    measuresData!.sort((a, b) => {
      if (a.label > b.label) {
        return 1
      }
      if (a.label < b.label) {
        return -1
      }
      return 0
    })

  const {
    data: wordsData,
  }: // isLoading: isWordsLoading,
  // error: wordsError,
  IMeasuresResponse = useQuery({
    queryKey: ["words"],
    queryFn: getWords,
  })

  const { handleSubmit, register } = useForm()

  async function onSubmit(formData: FieldValues) {
    setIsRegExpCreating(true)

    if (formData.headers) {
      patternColumn = patternColumn.slice(1)
    }

    const completeRegExpsArray = extractRegExp({
      formData,
      measuresData,
      wordsData,
      patternColumn,
    })

    sheet!.getColumn(columns.indexOf(regExpColumnLetter) + 1).values =
      completeRegExpsArray

    const bytes = await workbook!.xlsx.writeBuffer()

    const newTableData = new Blob([bytes], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })

    setObjUrl(URL.createObjectURL(newTableData))

    setIsRegExpCreating(false)
  }

  useEffect(() => {
    if (sheet !== undefined) {
      setCreateRegExpButtonHeight("auto")
    } else {
      setCreateRegExpButtonHeight(0)
    }
  }, [sheet])

  if (!measuresData || !wordsData) return <div>...loading</div>

  return (
    <>
      <Modal
        isModalShow={isMeasuresModalShow}
        setIsModalShow={setIsMeasuresModalShow}
      >
        <AddMeasureExtractionForm setIsModalShow={setIsMeasuresModalShow} />
      </Modal>
      <Modal
        isModalShow={isWordsModalShow}
        setIsModalShow={setIsWordsModalShow}
      >
        <AddWordExtractionForm setIsModalShow={setIsWordsModalShow} />
      </Modal>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-x-5">
          <ColumnSelect
            label="Столбец товаров"
            formValue="products"
            register={register}
            value={productsColumnLetter}
            setValue={setProductsColumnLetter}
          ></ColumnSelect>
          <ColumnSelect
            label="Столбец регулярки"
            formValue="regExp"
            register={register}
            value={regExpColumnLetter}
            setValue={setRegExpColumnLetter}
          ></ColumnSelect>
          <CheckBox
            className="grid-cols-[110px,_min-content]"
            label="Заголовки"
            formValue="headers"
            register={register}
          ></CheckBox>
        </div>
        <AnimateHeight duration={500} height={createRegExpButtonHeight}>
          <div className="flex justify-start">
            <Button
              type="submit"
              disabled={sheet === undefined || isRegExpCreating}
            >
              Создать регулярные выражения
            </Button>
          </div>
        </AnimateHeight>
        <div className="grid grid-cols-2">
          <div>
            <div className="text-2xl font-semibold mb-3 flex gap-x-4 items-center">
              <span>Извлечение величин</span>
              <button
                className="text-green-700 hover:text-green-500"
                type="button"
                onClick={() => setIsMeasuresModalShow(true)}
              >
                <CiSquarePlus size="35" />
              </button>
            </div>
            <div className="flex flex-col gap-y-3">
              {measuresData.map((measureObj) => (
                <MeasuresOption
                  label={measureObj.label}
                  register={register}
                  measures={measureObj.params}
                  key={measureObj.label}
                />
              ))}
              <CheckBox
                label="Извлечь количество"
                formValue="quantities"
                register={register}
              ></CheckBox>
              <CheckBox
                label="Извлечь размер"
                formValue="sizes"
                register={register}
              ></CheckBox>
            </div>
          </div>
          <div>
            <div className="text-2xl font-semibold mb-3 flex gap-x-4 items-center">
              <span>Извлечение слов</span>
              <button
                className="text-green-700 hover:text-green-500"
                type="button"
                onClick={() => setIsWordsModalShow(true)}
              >
                <CiSquarePlus size="35" />
              </button>
            </div>
            <div className="flex flex-col gap-y-3">
              {wordsData.map((wordObj) => (
                <WordsOption
                  words={wordObj.params}
                  label={wordObj.label}
                  register={register}
                  key={wordObj.label}
                />
              ))}
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ExtractionOptions
