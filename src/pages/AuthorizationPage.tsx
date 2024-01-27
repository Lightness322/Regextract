import { useState } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "../hooks/useAuth"

import { login, signIn } from "../services/apiUser"

import Button from "../components/UI/Button"
import Loader from "../components/UI/Loader"

const AuthorizationPage: React.FC = () => {
  const [loginType, setLoginType] = useState<"login" | "register">("login")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: { email: "test@mail.ru", password: "test11" },
  })

  const { onSubmit: onSignInSubmit, isLoading: isSignInLoading } = useAuth(
    signIn,
    "register"
  )

  const { onSubmit: onLoginSubmit, isLoading: isLoginLoading } = useAuth(
    login,
    "login"
  )

  return (
    <div className="flex items-center justify-center h-screen bg-[#dcbc9e59]">
      <form
        className="p-10 border-2 border-primary-color border-solid flex flex-col min-w-[600px] gap-7 rounded-3xl bg-white shadow-[10px_10px_10px_#00000044]"
        onSubmit={handleSubmit(
          loginType === "login" ? onLoginSubmit : onSignInSubmit
        )}
      >
        <h1 className="text-center text-2xl font-semibold">Вход в профиль</h1>
        <div className="grid grid-cols-[80px,_1fr] items-center relative">
          <label className="text-lg">Почта</label>
          <input
            className="border border-primary-color border-solid"
            {...register("email", {
              required: { value: true, message: "Обязательное поле!" },
            })}
          />
          {errors?.email && (
            <div className="absolute bottom-[-22px] left-[80px] text-red-500 text-sm">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="grid grid-cols-[80px,_1fr] items-center relative">
          <label className="text-lg">Пароль</label>
          <input
            className="border border-primary-color border-solid"
            {...register("password", {
              required: { value: true, message: "Обязательное поле!" },
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
            })}
          />
          {errors?.password && (
            <div className="absolute bottom-[-22px] left-[80px] text-red-500 text-sm">
              {errors.password.message}
            </div>
          )}
        </div>
        <div className="flex mx-auto gap-10">
          <Button type="submit" onClick={() => setLoginType("login")}>
            {isLoginLoading ? (
              <span className="h-[28px] w-[54.55px] flex justify-center">
                <Loader size="base" />
              </span>
            ) : (
              <span>Войти</span>
            )}
          </Button>
          <Button type="submit" onClick={() => setLoginType("register")}>
            {isSignInLoading ? (
              <span className="h-[28px] w-[71.88px] flex justify-center">
                <Loader size="base" />
              </span>
            ) : (
              <span>Создать профиль</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AuthorizationPage
