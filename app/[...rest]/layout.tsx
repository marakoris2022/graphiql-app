import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type GenerateMetadataParams = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: GenerateMetadataParams) {
  const t = await getTranslations({ locale, namespace: 'metaRest' });

  return {
    title: t('title'),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
