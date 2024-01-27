import supabase from "./supabase"

import { IWordData } from "../types/wordsTypes"
import { IFindParams } from "../types/IFindParams"

export async function getWords(userId: string) {
  const { data: words, error } = await supabase
    .from("words")
    .select("*")
    .eq("userId", userId)

  if (error) {
    throw new Error(error.message)
  }

  return words
}

export async function updateWords({ label, params, userId }: IWordData) {
  const { data, error } = await supabase
    .from("words")
    .update({ params })
    .eq("label", label)
    .eq("userId", userId)
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function insertWord({ label, params, userId }: IWordData) {
  const { data, error } = await supabase
    .from("words")
    .insert([{ label, params, userId }])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function deleteWord({ label, userId }: IFindParams) {
  const { error } = await supabase
    .from("words")
    .delete()
    .eq("label", label)
    .eq("userId", userId)

  if (error) {
    throw new Error(error.message)
  }
}
