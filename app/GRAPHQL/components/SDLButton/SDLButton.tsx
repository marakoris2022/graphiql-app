'use client';

import { useTransition } from 'react';
import styles from './SDLButton.module.css';
import { createSDLQuery } from '@/lib/actions/form.actions';
import Button from '@mui/material/Button';

type SDLExplorerButtonProps = {
  open: boolean;
  setOpen: (data: boolean) => void;
  valueSDL: string;
};

const SDLButton = ({ open, setOpen, valueSDL }: SDLExplorerButtonProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      sx={{ color: 'white', background: 'grey' }}
      disabled={isPending}
      variant="contained"
      color="primary"
      className={styles.sdlDocBtn}
      type="button"
      onClick={async () => {
        if (!valueSDL) {
          throw new Error('Endpoint must be a not empty valid string');
        }
        if (open) {
          setOpen(false);
        }
        startTransition(async () => {
          const result = await createSDLQuery(`${valueSDL}`);
          if (result && '__schema' in result) {
            setOpen(true);
          }
        });
      }}
    >
      {isPending ? 'Downloading...' : 'Get Schema'}
    </Button>
  );
};

export default SDLButton;
