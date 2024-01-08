import supabase from "./supabase"

import { IWordData } from "../types/wordsTypes"

export async function getWords() {
  const { data: words, error } = await supabase.from("words").select("*")

  if (error) {
    throw new Error(error.message)
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
    throw new Error(error.message)
  }

  return data
}

export async function insertWord({ label, params }: IWordData) {
  const { data, error } = await supabase
    .from("words")
    .insert([{ label, params }])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function deleteWord(label: string) {
  const { error } = await supabase.from("words").delete().eq("label", label)

  if (error) {
    throw new Error(error.message)
  }
}
