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
import SchemaDocumentation from '../schemaDocumentation/SchemaDocumentation';
import { ResultBlock } from '@/app/components/REST/components/ResultBlock';

const GQLForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [data, action] = useFormState(createQuery, {
    title: '',
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
      if (queryStr) {
        ref.current.query.value = gqlPrettier(queryStr);
      }
      if (variablesStr) {
        ref.current.variables.value = JSON.stringify(JSON.parse(variablesStr), null, 2);
      }
    }
  };

  return (
    <div className={styles.graphiqlContainer}>
      {open && show && (
        <article className={styles.docsContainer}>
          {<SchemaDocumentation valueSDL={endpointSDL ? endpointSDL : endpointURL} />}
        </article>
      )}
      <form className={styles.form} ref={ref} action={action} noValidate>
        <EndpointURL setURL={setEndpointURL} />
        <EndpointSDL setSDL={setEndpointSDL} />
        <Headers />
        <div className={styles.buttonContainer}>
          <span style={{ fontSize: '1.5rem' }}>
            Graph<i>i</i>QL
          </span>
          <SubmitButton />
          <SDLButton
            open={open}
            setOpen={setOpen}
            valueSDL={endpointSDL ? endpointSDL : endpointURL}
          />
          <PrettifyButton handler={formatQuery} />
          {open && <ExplorerButton showFn={() => setShow((prev) => !prev)} />}
        </div>
        <QuerySection variables={variablesArea} />
        <VariablesSection setVariables={setVariablesArea} />
      </form>
      <div className={styles.responseField}>
        {data.message && (
          <ResultBlock
            title={data.title}
            responseData={data.message}
            statusCode={`${data.status}`}
          />
        )}
      </div>
    </div>
  );
};

export default GQLForm;
