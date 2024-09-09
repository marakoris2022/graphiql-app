'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';

const SubmitButton = () => {
  const t = useTranslations('apiClient');

  const { pending } = useFormStatus();

  return (
    <Button
      sx={{ color: 'white', background: 'grey' }}
      variant="contained"
      color="primary"
      type="submit"
      disabled={pending}
    >
      {pending ? t('submitting') : t('submit')}
    </Button>
  );
};

export default SubmitButton;
