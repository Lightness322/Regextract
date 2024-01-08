import { FieldValues, UseFormRegister } from "react-hook-form"

import ColumnSelect from "./UI/ColumnSelect"
import CheckBox from "./CheckBox"

interface IUploadFileParamsProps {
  register: UseFormRegister<FieldValues>
  productsColumnLetter: string
  regExpColumnLetter: string
  setProductsColumnLetter: (letter: string) => void
  setRegExpColumnLetter: (letter: string) => void
}

const UploadFileParams: React.FC<IUploadFileParamsProps> = ({
  register,
  productsColumnLetter,
  setProductsColumnLetter,
  regExpColumnLetter,
  setRegExpColumnLetter,
}) => {
  return (
    <div className="flex items-center gap-x-5 gap-y-2 flex-wrap max-[545px]:flex-col max-[545px]:items-start">
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
        label="Заголовки"
        formValue="headers"
        register={register}
      ></CheckBox>
    </div>
  )
}

export default UploadFileParams
