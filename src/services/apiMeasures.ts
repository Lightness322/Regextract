import supabase from "./supabase"

import { IMeasureData } from "../types/measuresTypes"
import { IFindParams } from "../types/IFindParams"

export async function getMeasures(userId: string) {
  const { data: measures, error } = await supabase
    .from("measures")
    .select("*")
    .eq("userId", userId)

  if (error) {
    throw new Error(error.message)
  }

  return measures
}

export async function updateMeasures({ label, params, userId }: IMeasureData) {
  const { data, error } = await supabase
    .from("measures")
    .update({ params })
    .eq("label", label)
    .eq("userId", userId)
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function insertMeasure({ label, params, userId }: IMeasureData) {
  const { data, error } = await supabase
    .from("measures")
    .insert([{ label, params, userId }])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function deleteMeasure({ label, userId }: IFindParams) {
  const { error } = await supabase
    .from("measures")
    .delete()
    .eq("label", label)
    .eq("userId", userId)

  if (error) {
    throw new Error(error.message)
  }
}
