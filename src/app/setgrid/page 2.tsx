import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { setgridLangFromHeader } from "@/content/setgrid";

export const dynamic = "force-dynamic";

export default async function SetgridIndex() {
  const headerList = await headers();
  const lang = setgridLangFromHeader(headerList.get("accept-language"));
  redirect(`/setgrid/${lang}`);
}
