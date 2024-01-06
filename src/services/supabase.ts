import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://syqduwcsavdxsqlxwrwi.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5cWR1d2NzYXZkeHNxbHh3cndpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0MTYxNTUsImV4cCI6MjAxODk5MjE1NX0.Zz9tk4zvTDbRiUCzUIrvM8niQmRPEV-sc9yQvDdrHi4"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
