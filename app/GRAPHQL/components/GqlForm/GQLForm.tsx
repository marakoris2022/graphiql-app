'use client';

import { createQuery } from '@/lib/actions/form.actions';
import { useRef, useState } from 'react';
import SubmitButton from '../buttons/SubmitButton';
import styles from './gqlForm.module.css';
import { useFormState } from 'react-dom';
import PrettifyButton from '../buttons/PrettifyButton';
import SDLButton from '../SDLButton/SDLButton';
import gqlPrettier from 'graphql-prettier';
import { useSDLStore } from '../../../store/useSDLStore';
import EndpointURL from '../endpointUrl/EndpointURL';
import EndpointSDL from '../endpointSDL/EndpointSDL';
import QuerySection from '../querySection/QuerySection';
import VariablesSection from '../variables/VariablesSection';
import ExplorerButton from '../buttons/ExplorerButton';
import Headers from '../headers/Headers';

const GQLForm = () => {
  const documentationSDL = useSDLStore((state) => state.documentationSDL);
  const ref = useRef<HTMLFormElement>(null);
  const [data, action] = useFormState(createQuery, {
    status: null,
    message: '',
  });

  const [endpointURL, setEndpointURL] = useState<string>('');
  const [endpointSDL, setEndpointSDL] = useState<string>('');
  const [variablesArea, setVariablesArea] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const formatQuery = () => {
    if (ref.current) {
      const queryStr = ref.current.query.value;
      const variablesStr = ref.current.variables.value;
      ref.current.query.value = gqlPrettier(queryStr);
      ref.current.variables.value = JSON.stringify(JSON.parse(variablesStr), null, 2);
    }
  };

  return (
    <div className={styles.graphiqlContainer}>
      <form className={styles.form} ref={ref} action={action} noValidate>
        <EndpointURL setURL={setEndpointURL} />
        <div className={styles.SDLContainer}>
          <EndpointSDL setSDL={setEndpointSDL} />
          <SDLButton
            open={open}
            setOpen={setOpen}
            valueSDL={endpointSDL ? endpointSDL : endpointURL}
          />
        </div>
        <Headers />
        <QuerySection variables={variablesArea} />
        <VariablesSection setVariables={setVariablesArea} />
        <div className={styles.buttonContainer}>
          <div className={styles.submit}>
            <SubmitButton />
          </div>
          <div className={styles.submit}>
            <PrettifyButton handler={formatQuery} />
          </div>
        </div>
      </form>
      <div className={styles.responseField}>
        {data.message && (
          <div>
            <div>Status: {data.status}</div>
            <textarea className={styles.responseArea} readOnly value={data.message} />
          </div>
        )}
      </div>
      <article className={styles.sdlContainer}>
        {open && documentationSDL && (
          <div>
            <ExplorerButton showFn={() => setShow((prev) => !prev)} />
            {show && (
              <div>
                <h3>Documentation</h3>
                <p>{documentationSDL}</p>
              </div>
            )}
          </div>
        )}
      </article>
    </div>
  );
};

export default GQLForm;
