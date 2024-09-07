'use client';

import { buildClientSchema, printIntrospectionSchema } from 'graphql/utilities';
import { useTransition } from 'react';
import styles from './SDLButton.module.css';
import { createSDLQuery } from '@/lib/actions/form.actions';
import { useSDLStore } from '../../../store/useSDLStore';
import { IntrospectionQuery, GraphQLSchema } from 'graphql';

type SDLExplorerButtonProps = {
  open: boolean;
  setOpen: (data: boolean) => void;
  valueSDL: string;
};

const SDLButton = ({ open, setOpen, valueSDL }: SDLExplorerButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const addDocumentationSDL = useSDLStore((state) => state.addDocumentationSDL);
  const addIntrospectionQuery = useSDLStore((state) => state.addIntrospectionQuery);

  return (
    <button
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
          /* if (result && '__schema' in result) {
            addIntrospectionQuery(result as IntrospectionQuery);
            setOpen(true);
          } */
        });
      }}
    >
      {isPending ? 'Downloading...' : 'Get Schema'}
    </button>
  );
};

export default SDLButton;
