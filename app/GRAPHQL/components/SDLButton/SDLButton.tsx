'use client';

import { useEffect, useTransition } from 'react';
import styles from './SDLButton.module.css';
import { createSDLQuery } from '@/lib/actions/form.actions';
import Button from '@mui/material/Button';
import { useTranslations } from 'next-intl';

type SDLExplorerButtonProps = {
  open: boolean;
  setOpen: (data: boolean) => void;
  endpointURL: string;
  endpointSDL: string;
  setErrors: (data: Record<string, string>) => void;
  errors: Record<string, string>;
};

const SDLButton = ({
  open,
  setOpen,
  endpointURL,
  endpointSDL,
  setErrors,
  errors,
}: SDLExplorerButtonProps) => {
  const t = useTranslations('apiClient');

  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    if (endpointURL || endpointSDL) {
      setErrors({});
      if (open) {
        setOpen(false);
      }
      const valueSDL = endpointSDL ? endpointSDL : endpointURL;
      startTransition(async () => {
        const result = await createSDLQuery(`${valueSDL}`);
        if (result && '__schema' in result) {
          setOpen(true);
        }
      });
    } else {
      setErrors({
        endpointURL: t('errEndpointUrl'),
      });
    }
  };

  return (
    <Button
      sx={{ color: 'white', background: 'grey' }}
      disabled={isPending}
      variant="contained"
      color="primary"
      className={styles.sdlDocBtn}
      type="button"
      onClick={handleClick}
    >
      {isPending ? t('downloading') : t('getSchema')}
    </Button>
  );
};

export default SDLButton;
