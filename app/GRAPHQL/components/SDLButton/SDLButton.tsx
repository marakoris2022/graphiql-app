'use client';

import { useTransition } from 'react';
import styles from './SDLButton.module.css';
import { createSDLQuery } from '@/lib/actions/form.actions';
import Button from '@mui/material/Button';

type SDLExplorerButtonProps = {
  open: boolean;
  setOpen: (data: boolean) => void;
  endpointURL: string;
  endpointSDL: string;
  setErrors: (data: Record<string, string>) => void;
};

const SDLButton = ({
  open,
  setOpen,
  endpointURL,
  endpointSDL,
  setErrors,
}: SDLExplorerButtonProps) => {
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
      setErrors({ endpointURL: 'Either endpointURL or endpointSDL is required' });
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
      {isPending ? 'Downloading...' : 'Get Schema'}
    </Button>
  );
};

export default SDLButton;
