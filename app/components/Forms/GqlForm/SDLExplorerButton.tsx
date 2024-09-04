/* 'use client';

import { buildClientSchema } from 'graphql/utilities';
import { useTransition } from 'react';
import styles from './gqlForm.module.css';
import { createSDLQuery } from '@/lib/actions/form.actions';
import { useSDLStore } from '../../../store/useSDLStore';
import { GraphQLSchema } from 'graphql';

type SDLExplorerButtonProps = {
  setOpen: (data: boolean) => void;
  endpointSDL: string;
};
const SDLExplorerButton = ({ setOpen, endpointSDL }: SDLExplorerButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const addDocumentationSDL = useSDLStore((state) => state.addDocumentationSDL);

  return (
    <button
      className={styles.sdlDocBtn}
      type="button"
      onClick={async () => {
        startTransition(async () => {
          const result = await createSDLQuery(`${endpointSDL}`);
          if (result instanceof GraphQLSchema) {
            const builtSchema = buildClientSchema(result);
            addDocumentationSDL(builtSchema);
            setOpen();
          }
        });
      }}
    >
      {isPending ? 'Downloading...' : 'Explorer'}
    </button>
  );
};

export default SDLExplorerButton;
 */

'use client';

import { buildClientSchema } from 'graphql/utilities';
import { useTransition } from 'react';
import styles from './gqlForm.module.css';
import { createSDLQuery } from '@/lib/actions/form.actions';
import { useSDLStore } from '../../../store/useSDLStore';
import { IntrospectionQuery, GraphQLSchema } from 'graphql';

type SDLExplorerButtonProps = {
  open: boolean;
  setOpen: (data: boolean) => void;
  endpointSDL: string;
};

const SDLExplorerButton = ({ open, setOpen, endpointSDL }: SDLExplorerButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const addDocumentationSDL = useSDLStore((state) => state.addDocumentationSDL);

  return (
    <button
      className={styles.sdlDocBtn}
      type="button"
      onClick={async () => {
        if (open) {
          setOpen(false);
          return;
        }
        startTransition(async () => {
          const result = await createSDLQuery(`${endpointSDL}`);

          if (result && typeof result === 'object' && '__schema' in result) {
            const builtSchema = buildClientSchema(result as IntrospectionQuery);
            addDocumentationSDL(builtSchema);
            setOpen(true);
          }
        });
      }}
    >
      {isPending ? 'Downloading...' : 'Explorer'}
    </button>
  );
};

export default SDLExplorerButton;
