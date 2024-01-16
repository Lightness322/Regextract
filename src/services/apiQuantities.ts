import supabase from "./supabase"

import { IQuantityData } from "../types/quantitiesTypes"

export async function getQuantities() {
  const { data: quantities, error } = await supabase
    .from("quantities")
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  return quantities
}

export async function updateQuantities({ label, params }: IQuantityData) {
  const { data, error } = await supabase
    .from("quantities")
    .update({ params })
    .eq("label", label)
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  return data
}
