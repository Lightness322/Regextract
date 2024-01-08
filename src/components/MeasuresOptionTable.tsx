import { useChangeMeasureOptionValues } from "../hooks/useChangeMeasureOptionValues"

import { TypeSetStateFunction } from "../types/TypeSetStateFunction"
import { IMeasure } from "../types/measuresTypes"

import { CiSquarePlus } from "react-icons/ci"
import { IoClose } from "react-icons/io5"
import AnimateHeight, { Height } from "react-animate-height"

interface IMeasuresOptionTableProps {
  handleShowSaveMeasureButton: (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => void
  setCurrentMeasures: TypeSetStateFunction<IMeasure[]>
  optionTableHeight: Height
  currentMeasures: IMeasure[]
  setSaveButtonHeight: TypeSetStateFunction<Height>
}

const MeasuresOptionTable: React.FC<IMeasuresOptionTableProps> = ({
  handleShowSaveMeasureButton,
  setCurrentMeasures,
  optionTableHeight,
  currentMeasures,
  setSaveButtonHeight,
}) => {
  const { handleChangeMeasures, handleChangeCoefficient } =
    useChangeMeasureOptionValues({
      handleShowSaveMeasureButton,
      setCurrentMeasures,
    })

  return (
    <AnimateHeight duration={500} height={optionTableHeight}>
      <table className="text-left border-spacing-x-4 border-spacing-y-1 border-separate mt-3 max-[890px]:w-full">
        <thead>
          <tr>
            <th>Величина</th>
            <th>Коэффициент</th>
          </tr>
        </thead>
        <tbody>
          {currentMeasures.map((measureObj, i) => (
            <tr key={i}>
              <td className="max-[890px]:w-[67.5%]">
                <input
                  className="p-0 border border-solid border-[#ca8544] rounded-md text-center w-[250px] max-[1230px]:w-[500px] max-[890px]:w-full"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChangeMeasures(e, i)
                  }}
                  value={measureObj.variants}
                />
              </td>
              <td className="max-[890px]:w-[32.5%]">
                <input
                  className="p-0 border border-solid border-[#ca8544] rounded-md text-center w-[250px] max-[890px]:w-full"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChangeCoefficient(e, i)
                  }}
                  value={measureObj.coefficient}
                  type="number"
                />
              </td>
              <td className="flex justify-center items-center max-[890px]:w-[30px]">
                <button
                  className="text-red-700 hover:text-red-500"
                  onClick={() => {
                    const newMeasures = currentMeasures.filter(
                      (_, deleteIndex) => deleteIndex !== i
                    )
                    setCurrentMeasures(newMeasures)
                    setSaveButtonHeight("auto")
                  }}
                  type="button"
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
                onClick={() => {
                  setCurrentMeasures((curMeasures) => [
                    { variants: "", coefficient: 0 },
                    ...curMeasures,
                  ])
                  setSaveButtonHeight("auto")
                }}
                type="button"
              >
                <CiSquarePlus size="30" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </AnimateHeight>
  )
}

export default MeasuresOptionTable
