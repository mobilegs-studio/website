import { OrganizationJsonLd } from "@/components/json-ld";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getTranslations } from "@/i18n/translations";
import { pageMetadata } from "@/i18n/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata(locale, "home");
}

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
