import supabase from "./supabase"

import { IMeasureData } from "../types/measuresTypes"

export async function getMeasures() {
  const { data: measures, error } = await supabase.from("measures").select("*")

  if (error) {
    throw new Error(error.message)
  }

  return measures
}

export async function updateMeasures({ label, params }: IMeasureData) {
  const { data, error } = await supabase
    .from("measures")
    .update({ params })
    .eq("label", label)
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function insertMeasure({ label, params }: IMeasureData) {
  const { data, error } = await supabase
    .from("measures")
    .insert([{ label, params }])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function deleteMeasure(label: string) {
  const { error } = await supabase.from("measures").delete().eq("label", label)

  if (error) {
    throw new Error(error.message)
  }
}
