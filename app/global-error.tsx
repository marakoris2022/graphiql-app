'use client';

import { Button } from '@mui/material';
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
      <body className="globalError">
        <h2 className="globalErrorTitle">{t('errMsg')}</h2>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => reset()}
        >
          {t('errBtn')}
        </Button>
      </body>
    </html>
  );
}
