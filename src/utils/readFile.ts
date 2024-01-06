import { ChangeEvent } from "react"

export function readFile(
  event: ChangeEvent<HTMLInputElement>,
  setState: (state: string[]) => void
) {
  const reader = new FileReader()

  const file = event.target.files![0]

  reader.readAsText(file)

  reader.onload = function () {
    if (typeof reader.result === "string") {
      setState(reader.result.split("\r\n").slice(1, -1))
      console.log(reader.result)
    }
  }

  reader.onerror = function () {
    console.log(reader.error)
  }
}
