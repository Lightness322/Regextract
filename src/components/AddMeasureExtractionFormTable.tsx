import { useChangeMeasureOptionValues } from "../hooks/useChangeMeasureOptionValues"

import { TypeSetStateFunction } from "../types/TypeSetStateFunction"
import { IMeasure } from "../types/measuresTypes"

import { IoClose } from "react-icons/io5"
import { CiSquarePlus } from "react-icons/ci"

interface IAddMeasureExtractionFormTableProps {
  currentMeasures: IMeasure[]
  setCurrentMeasures: TypeSetStateFunction<IMeasure[]>
}

const AddMeasureExtractionFormTable: React.FC<
  IAddMeasureExtractionFormTableProps
> = ({ currentMeasures, setCurrentMeasures }) => {
  const { handleChangeMeasures, handleChangeCoefficient } =
    useChangeMeasureOptionValues({
      setCurrentMeasures,
    })

  return (
    <table className="text-left border-spacing-x-4 border-spacing-y-1 border-separate max-[810px]:w-full max-[450px]:border-spacing-x-1">
      <thead>
        <tr>
          <th>Величина</th>
          <th>Коэффициент</th>
        </tr>
      </thead>
      <tbody>
        {currentMeasures.map((measureObj, i) => (
          <tr key={i}>
            <td className="max-[810px]:w-[70%]">
              <input
                className="p-0 border border-solid border-[#ca8544] rounded-md text-center w-[300px] max-[810px]:w-full"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeMeasures(e, i)
                }}
                value={measureObj.variants}
              />
            </td>
            <td className="max-[810px]:w-[30%]">
              <input
                className="p-0 border border-solid border-[#ca8544] rounded-md text-center w-[200px] max-[810px]:w-full"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeCoefficient(e, i)
                }}
                value={measureObj.coefficient}
                type="number"
                min={1}
              />
            </td>
            <td className="flex justify-center items-center w-[30px]">
              <button
                className="text-red-700 hover:text-red-500"
                onClick={() => {
                  setCurrentMeasures((curArray) =>
                    curArray.filter((_, ind) => ind !== i)
                  )
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
              onClick={() =>
                setCurrentMeasures((curArray) => [
                  ...curArray,
                  { variants: "", coefficient: 1 },
                ])
              }
              type="button"
            >
              <CiSquarePlus size="30" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default AddMeasureExtractionFormTable
