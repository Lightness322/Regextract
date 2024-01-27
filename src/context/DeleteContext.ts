import { createContext } from "react"

import { IFindParams } from "../types/IFindParams"

interface IDeleteContext {
  deleteFn:
    | (({ label, userId }: IFindParams) => void)
    | (({ label, userId }: IFindParams) => void)

  isDeleting: boolean
}

export const DeleteContext = createContext<IDeleteContext | null>(null)
