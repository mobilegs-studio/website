import { OrganizationJsonLd } from "@/components/json-ld";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getTranslations } from "@/i18n/translations";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <>
      <OrganizationJsonLd />
      <Navbar locale={locale} t={t.nav} />
      {children}
      <Footer locale={locale} t={t.footer} tNav={t.nav} />
    </>
  );
}
