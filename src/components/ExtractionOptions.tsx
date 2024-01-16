import { useState, useEffect } from "react"
import { useCreateSemanticFile } from "../hooks/useCreateSemanticFile"
import { useGetMeasures } from "../hooks/useGetMeasures"
import { useGetWords } from "../hooks/useGetWords"
import { FieldValues, useForm } from "react-hook-form"

import { sortExtractionOption } from "../utils/sortExtractionOption"
import { useGetQuantities } from "../hooks/useGetQuantities"

import { Height } from "react-animate-height"
import Excel from "exceljs"

import AddMeasureExtractionForm from "./AddMeasureExtractionForm"
import AddWordExtractionForm from "./AddWordExtractionForm"
import ExtractionTypesFields from "./ExtractionTypesFields"
import CreateRegExpButton from "./UI/CreateRegExpButton"
import UploadFileParams from "./UploadFileParams"
import ErrorMessage from "./UI/ErrorMessage"
import Loader from "./UI/Loader"
import Modal from "./UI/Modal"

interface IExtractionOptionsProps {
  sheet: Excel.Worksheet | undefined
  workbook: Excel.Workbook | undefined
  setObjUrl: (url: string) => void
}

const ExtractionOptions: React.FC<IExtractionOptionsProps> = ({
  sheet,
  workbook,
  setObjUrl,
}) => {
  const [createRegExpButtonHeight, setCreateRegExpButtonHeight] =
    useState<Height>(0)

  const [productsColumnLetter, setProductsColumnLetter] = useState<string>("A")
  const [regExpColumnLetter, setRegExpColumnLetter] = useState<string>("E")

  const [isMeasuresModalShow, setIsMeasuresModalShow] = useState<boolean>(false)
  const [isWordsModalShow, setIsWordsModalShow] = useState<boolean>(false)

  const { measuresData, isMeasuresLoading, measuresError } = useGetMeasures()

  const { wordsData, isWordsLoading, wordsError } = useGetWords()

  const { quantitiesData, isQuantitiesLoading, quantitiesError } =
    useGetQuantities()

  const { handleSubmit, register } = useForm()

  const { createSemanticFile, isRegExpCreating, setIsRegExpCreating } =
    useCreateSemanticFile({
      measuresData,
      wordsData,
      quantitiesData,
      workbook,
      sheet,
      productsColumnLetter,
      regExpColumnLetter,
      setObjUrl,
    })

  useEffect(() => {
    if (sheet !== undefined) {
      setCreateRegExpButtonHeight("auto")
    } else {
      setCreateRegExpButtonHeight(0)
    }
  }, [sheet])

  function onSubmit(formData: FieldValues) {
    setIsRegExpCreating(true)

    createSemanticFile(formData)
  }

  if (isMeasuresLoading || isWordsLoading || isQuantitiesLoading)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="-translate-y-20 text-primary-color">
          <Loader size="big" />
        </div>
      </div>
    )

  if (wordsError || measuresError || quantitiesError)
    return <ErrorMessage error={wordsError || measuresError} />

  sortExtractionOption(measuresData!)

  sortExtractionOption(wordsData!)

  return (
    <>
      <Modal
        isModalShow={isMeasuresModalShow}
        setIsModalShow={setIsMeasuresModalShow}
      >
        <AddMeasureExtractionForm
          measuresData={measuresData!}
          setIsModalShow={setIsMeasuresModalShow}
        />
      </Modal>
      <Modal
        isModalShow={isWordsModalShow}
        setIsModalShow={setIsWordsModalShow}
      >
        <AddWordExtractionForm
          wordsData={wordsData!}
          setIsModalShow={setIsWordsModalShow}
        />
      </Modal>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <UploadFileParams
          register={register}
          productsColumnLetter={productsColumnLetter}
          regExpColumnLetter={regExpColumnLetter}
          setProductsColumnLetter={setProductsColumnLetter}
          setRegExpColumnLetter={setRegExpColumnLetter}
        />
        <CreateRegExpButton
          buttonHeight={createRegExpButtonHeight}
          isRegExpCreating={isRegExpCreating}
        />
        <ExtractionTypesFields
          register={register}
          measuresData={measuresData}
          wordsData={wordsData}
          quantitiesData={quantitiesData}
          setIsMeasuresModalShow={setIsMeasuresModalShow}
          setIsWordsModalShow={setIsWordsModalShow}
        />
      </form>
    </>
  )
}

export default ExtractionOptions
