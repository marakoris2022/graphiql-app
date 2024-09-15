'use client';

import { useTransition } from 'react';
import styles from './SDLButton.module.css';
import { createSDLQuery } from '@/lib/actions/form.actions';
import Button from '@mui/material/Button';
import { useTranslations } from 'next-intl';
import { endpointSDLSchema } from '@/lib/formValidationSchema/validationSchema';
import * as Yup from 'yup';

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
  const SDLSchema = endpointSDLSchema(t);

  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    if (endpointURL || endpointSDL) {
      const valueSDL = endpointSDL ? endpointSDL : endpointURL;
      const formData = {
        valueSDL,
      };
      try {
        await SDLSchema.validate(formData, { abortEarly: false });

        setErrors({});
        if (open) {
          setOpen(false);
        }

        startTransition(async () => {
          try {
            const result = await createSDLQuery(`${valueSDL}`);
            if (result && '__schema' in result) {
              setOpen(true);
            }
          } catch (e) {}
        });
      } catch (validationError) {
        if (validationError instanceof Yup.ValidationError) {
          setErrors({
            endpointURL: t('errInvalidUrl'),
          });
        }
      }
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
