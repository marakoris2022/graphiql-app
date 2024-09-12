'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('graphError');

  return (
    <div>
      <h2>{t('errMsg')}</h2>
      <h3>
        {t('errDesc')}
        {error.message}
      </h3>
      <button onClick={() => reset()}>{t('errBtn')}</button>
    </div>
  );
}
