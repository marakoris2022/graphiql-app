'use client';

import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('graphError');

  return (
    <div className="globalError">
      <h2 className="globalErrorTitle">{t('errMsg')}</h2>
      <h3>
        {t('errDesc')}
        {error.message}
      </h3>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={() => reset()}
      >
        {t('errBtn')}
      </Button>
    </div>
  );
}
