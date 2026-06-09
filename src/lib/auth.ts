import { createClient } from "@/lib/supabase/server";

// Haalt de ingelogde gebruiker op (of null).
export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// Controleert of de huidige gebruiker admin is (via de is_admin() RPC).
export async function checkIsAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;
  const { data, error } = await supabase.rpc("is_admin");
  if (error) return false;
  return data === true;
}
