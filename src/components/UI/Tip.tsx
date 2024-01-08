import { FaCircleInfo } from "react-icons/fa6"

interface ITipProps {
  tip: string
}

const Tip: React.FC<ITipProps> = ({ tip }) => {
  return <FaCircleInfo className="text-secondary-color" title={tip} size="20" />
}

export default Tip
