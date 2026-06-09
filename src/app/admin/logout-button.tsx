"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/nl");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="text-xs text-(--color-muted-light) hover:text-(--color-foreground) transition-colors"
    >
      Uitloggen
    </button>
  );
}
