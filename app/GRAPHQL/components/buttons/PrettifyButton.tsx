'use client';

import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';

type PrettifyButtonProps = {
  handler: () => void;
};

const PrettifyButton = ({ handler }: PrettifyButtonProps) => {
  const t = useTranslations('apiClient');

  return (
    <Button
      sx={{ color: 'white', background: 'grey' }}
      variant="contained"
      color="primary"
      onClick={handler}
    >
      {t('prettify')}
    </Button>
  );
};

export default PrettifyButton;
