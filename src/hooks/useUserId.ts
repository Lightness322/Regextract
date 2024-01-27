import { useQueryClient } from "@tanstack/react-query"

import { User } from "@supabase/supabase-js"

export function useUserId() {
  const queryClient = useQueryClient()

  const user: User | undefined = queryClient.getQueryData(["currentUser"])

  const userId = user!.id

  return { userId }
}
