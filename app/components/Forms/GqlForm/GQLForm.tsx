'use client';

import { createQuery } from '@/lib/actions/form.actions';
import { useEffect, useRef, useState } from 'react';
import SubmitButton from './SubmitButton';
import styles from './gqlForm.module.css';
import { useFormState } from 'react-dom';
import PrettifyButton from './PrettifyButton';
import { useRouter } from 'next/navigation';
import { encodeBase64 } from '@/app/[...rest]/utils';
import { printSchema } from 'graphql/utilities';
import SDLExplorerButton from './SDLExplorerButton';
import gqlPrettier from 'graphql-prettier';
import { useSDLStore } from '../../../store/useSDLStore';

const GQLForm = () => {
  const documentationSDL = useSDLStore((state) => state.documentationSDL);
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const [data, action] = useFormState(createQuery, {
    status: null,
    message: '',
  });

  const [endpointURL, setEndpointURL] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndpointURL(e.target.value);
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const formatQuery = () => {
    if (ref.current) {
      const queryStr = ref.current.query.value;
      ref.current.query.value = gqlPrettier(queryStr);
    }
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const handleURLFocusOut = () => {
    if (ref.current) {
      const queryStr = ref.current.query.value;

      const encodedQuery = encodeBase64(queryStr);

      router.push(`/GRAPHQL/${encodedQuery}`);
    }
  };

  return (
    <div className={styles.graphiqlContainer}>
      <form className={styles.form} ref={ref} action={action} noValidate>
        <div className={styles.queryField}>
          <label htmlFor="endpointURL">
            Endpoint URL:
            <input
              type="text"
              name="endpointURL"
              id="endpointURL"
              onBlur={handleURLFocusOut}
              value={endpointURL}
              onChange={handleURLChange}
            />
          </label>
          <label htmlFor="endpointSDL">
            SDL URL:
            <input type="text" name="endpointSDL" id="endpointSDL" />
          </label>
          <fieldset>
            <legend>Headers</legend>
            {headers.map((header, index) => (
              <div key={index}>
                <label htmlFor={`headerKey${index}`}>
                  Header Key:
                  <input
                    type="text"
                    name="headerKey"
                    id={`headerKey${index}`}
                    value={header.key}
                    onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                  />
                </label>
                <label htmlFor={`headerValue${index}`}>
                  Header Value:
                  <input
                    type="text"
                    name="headerValue"
                    id={`headerValue${index}`}
                    value={header.value}
                    onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                  />
                </label>
              </div>
            ))}
            <button type="button" onClick={addHeader}>
              Add Header
            </button>
          </fieldset>
          <fieldset>
            <legend>Query</legend>
            <textarea
              className={styles.queryArea}
              name="query"
              id="query"
              placeholder="Query..."
            ></textarea>
          </fieldset>
          <fieldset>
            <legend>Variables</legend>
            <textarea
              className={styles.variablesGraphQL}
              name="variables"
              id="variables"
              placeholder="Variables..."
            ></textarea>
          </fieldset>
          <div className={styles.buttonContainer}>
            <div className={styles.submit}>
              <SubmitButton />
            </div>
            <div className={styles.submit}>
              <PrettifyButton handler={formatQuery} />
            </div>
          </div>
        </div>
        <div className={styles.responseField}>
          <fieldset>
            {data.message && (
              // Substitute with the ResponseBlock from REST Api
              <div>
                <div>Status: {data.status}</div>
                <textarea className={styles.responseArea} readOnly value={data.message} />
              </div>
            )}
          </fieldset>
        </div>
      </form>
      <article className={styles.sdlContainer}>
        <SDLExplorerButton
          open={open}
          setOpen={setOpen}
          endpointSDL={endpointURL ? endpointURL : ''}
        ></SDLExplorerButton>

        {open && documentationSDL && (
          <div>
            <h3>Documentation</h3>
            <p>{JSON.stringify(documentationSDL, null, 2)}</p>
          </div>
        )}
      </article>
    </div>
  );
};

export default GQLForm;
