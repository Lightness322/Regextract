import {
  getDefaultMeasures,
  getDefaultQuantities,
  getDefaultWords,
} from "../utils/defaultOptions"
import supabase from "./supabase"

export async function createProfile(userId: string) {
  const { error: measuresError } = await supabase
    .from("measures")
    .insert(getDefaultMeasures(userId))
    .select()

  if (measuresError) throw new Error("measuresError")

  const { error: quantitiesError } = await supabase
    .from("quantities")
    .insert(getDefaultQuantities(userId))
    .select()

  if (quantitiesError) throw new Error("quantitiesError")

  const { error: wordsError } = await supabase
    .from("words")
    .insert(getDefaultWords(userId))
    .select()

  if (wordsError) throw new Error("wordsError")
}
