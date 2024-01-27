import { useQueryClient } from "@tanstack/react-query"
import { useLogOut } from "../hooks/useLogout"

import { User } from "@supabase/supabase-js"

import Button from "./UI/Button"
import Loader from "./UI/Loader"

const Header: React.FC = () => {
  const { handleLogOut, isLoggingOut } = useLogOut()

  const queryClient = useQueryClient()

  const user: User | undefined = queryClient.getQueryData(["currentUser"])

  const email = user?.email

  return (
    <div className="p-2 w-full left-0">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center">
        <img
          className="h-[50px]"
          src="https://manager.brandpolgroup.com/build/assets/bpg_h50.90099431.svg"
        />
        <div className="flex gap-2 items-center">
          <span>{email}</span>
          <Button type="button" size="sm" onClick={handleLogOut}>
            {isLoggingOut ? (
              <span className="h-[24px] w-[150.94px] flex justify-center">
                <Loader size="base" />
              </span>
            ) : (
              <span>Выйти из профиля</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header
