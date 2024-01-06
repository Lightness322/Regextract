import { IWordData } from "../types/wordsTypes"
import supabase from "./supabase"

export async function getWords() {
  const { data: words, error } = await supabase.from("words").select("*")

  if (error) {
    console.error(error)
    throw new Error("Ошибка при получении величин")
  }

  return words
}

export async function updateWords({ label, params }: IWordData) {
  const { data, error } = await supabase
    .from("words")
    .update({ params })
    .eq("label", label)
    .select("*")

  if (error) {
    console.error(error)
    throw new Error("Ошибка при получении величин")
  }

  return data
}

export async function insertWord({ label, params }: IWordData) {
  const { data, error } = await supabase
    .from("words")
    .insert([{ label, params }])
    .select()

  if (error) {
    console.error(error)
    throw new Error("Ошибка при получении величин")
  }

  return data
}

export async function deleteWord(label: string) {
  const { error } = await supabase.from("words").delete().eq("label", label)

  if (error) {
    console.error(error)
    throw new Error("Ошибка при получении величин")
  }
}
