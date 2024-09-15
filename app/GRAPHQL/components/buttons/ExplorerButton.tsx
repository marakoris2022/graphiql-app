'use client';

import Button from '@mui/material/Button';
import { useTranslations } from 'next-intl';

type ExplorerButtonProps = {
  showFn: () => void;
};

const ExplorerButton = ({ showFn }: ExplorerButtonProps) => {
  const t = useTranslations('apiClient');

  return (
    <Button
      sx={{ color: 'white' }}
      variant="contained"
      color="success"
      type="button"
      onClick={showFn}
    >
      {t('explorer')}
    </Button>
  );
};

export default ExplorerButton;
