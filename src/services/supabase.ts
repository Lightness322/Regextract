import { Netlify } from "@netlify/edge-functions/node/dist/bootstrap/globals"
import { createClient } from "@supabase/supabase-js"

const supabaseKey = await getApiKey()

const supabaseUrl = "https://syqduwcsavdxsqlxwrwi.supabase.co"
// const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey!)

export default supabase

export async function getApiKey() {
  const supabaseKey = await Netlify.env.get("VITE_SUPABASE_API_KEY")

  return supabaseKey
}
