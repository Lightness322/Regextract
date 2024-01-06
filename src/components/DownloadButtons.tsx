import AnimateHeight, { Height } from "react-animate-height"
import Button from "./UI/Button"
import { useEffect, useState } from "react"

interface IDownloadButtonsProps {
  objUrl: string
}

const DownloadButtons: React.FC<IDownloadButtonsProps> = ({ objUrl }) => {
  const [buttonsHeight, setButtonsHeight] = useState<Height>(0)

  useEffect(() => {
    if (objUrl) {
      setButtonsHeight("auto")
    } else {
      setButtonsHeight(0)
    }
  }, [objUrl])

  return (
    <AnimateHeight height={buttonsHeight} duration={500}>
      <div className="flex gap-x-5">
        <a className="block" href={objUrl} download="report.xlsx">
          <Button type="button">Скачать</Button>
        </a>
        <a href={objUrl} download="report.xlsx">
          Загрузить
        </a>
      </div>
    </AnimateHeight>
  )
}

export default DownloadButtons
