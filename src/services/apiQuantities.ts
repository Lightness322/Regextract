import supabase from "./supabase"

import { IQuantityData } from "../types/quantitiesTypes"

export async function getQuantities(userId: string) {
  const { data: quantities, error } = await supabase
    .from("quantities")
    .select("*")
    .eq("userId", userId)

  if (error) {
    throw new Error(error.message)
  }

  return quantities
}

export async function updateQuantities({
  label,
  params,
  userId,
}: IQuantityData) {
  const { data, error } = await supabase
    .from("quantities")
    .update({ params })
    .eq("label", label)
    .eq("userId", userId)
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  return data
}
