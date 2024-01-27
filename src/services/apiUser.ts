import { createProfile } from "./apiProfile"
import supabase from "./supabase"

interface IParams {
  email: string
  password: string
}

export async function login({ email, password }: IParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw new Error("Incorrect username or password")

  return data
}

export async function signIn({ email, password }: IParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw new Error("Incorrect username or password")

  if (error) return error

  await createProfile(data!.user!.id)

  return data
}

export async function logOut() {
  const { error } = await supabase.auth.signOut()

  return error
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()
  if (!session.session) return null

  const { data, error } = await supabase.auth.getUser()

  if (error) throw new Error(error.message)
  return data?.user
}
