import { Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function EmptyHistory() {
  const t = useTranslations('history');

  return (
    <>
      <Typography variant="body1">{t('desc1')}</Typography>
      <Typography variant="body1">{t('desc2')}</Typography>
    </>
  );
}
