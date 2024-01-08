import { useEffect, useState } from "react"

import AnimateHeight, { Height } from "react-animate-height"
import Button from "./UI/Button"

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
      <div className="flex gap-x-5 my-5">
        <a className="block" href={objUrl} download="regexp.xlsx">
          <Button type="button" color="green">
            Скачать семантику
          </Button>
        </a>
      </div>
    </AnimateHeight>
  )
}

export default DownloadButtons
