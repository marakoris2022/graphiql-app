'use client';

import { useTranslations } from 'next-intl';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('globalError');

  return (
    <html>
      <body>
        <h2>{t('errMsg')}</h2>
        <button onClick={() => reset()}>{t('errBtn')}</button>
      </body>
    </html>
  );
}
