'use client';

import { createQuery } from '@/lib/actions/form.actions';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import SubmitButton from './SubmitButton';
import styles from './gqlForm.module.css';
import { useFormState } from 'react-dom';
import PrettifyButton from './PrettifyButton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { encodeBase64 } from '@/app/[...rest]/utils';
import SDLExplorerButton from './SDLExplorerButton';
import gqlPrettier from 'graphql-prettier';
import { useSDLStore } from '../../../store/useSDLStore';

const GQLForm = () => {
  const documentationSDL = useSDLStore((state) => state.documentationSDL);
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const ref = useRef<HTMLFormElement>(null);
  const [data, action] = useFormState(createQuery, {
    status: null,
    message: '',
  });

  const [endpointURL, setEndpointURL] = useState<string>('');
  const [queryArea, setQueryArea] = useState<string>('');
  const [variablesArea, setVariablesArea] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);

  const formatQuery = () => {
    if (ref.current) {
      const queryStr = ref.current.query.value;
      ref.current.query.value = gqlPrettier(queryStr);
    }
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  /* useEffect(() => {
    const pathnamePieces = pathname.split('/');
    if (endpointURL) {
      const copy = endpointURL;
      const encodedEndpointURL = encodeBase64(copy);
      if (pathnamePieces.length <= 3) {
        router.push(`/${pathnamePieces[1]}/${encodedEndpointURL}`);
      } else {
        router.push(`/${pathnamePieces[1]}/${encodedEndpointURL}/${pathnamePieces[3]}`);
      }
    } else {
      if (pathnamePieces.length === 3) {
        router.push(`/${pathnamePieces[1]}`);
      } else {
        router.push(`/${pathnamePieces[1]}//${pathnamePieces[3]}`);
      }
    }
  }, [endpointURL]);

  useEffect(() => {
    if (queryArea) {
      const encodedQuery = encodeBase64(
        JSON.stringify({ query: queryArea, variables: variablesArea ? variablesArea : '' }),
      );
      router.push(`/${pathname.slice(0, pathname.lastIndexOf('/'))}/${encodedQuery}`);
    }
  }, [variablesArea]); */

  const handleQueryFocusOut = () => {
    const pathnamePieces = pathname.split('/');
    if (queryArea) {
      const encodedQuery = encodeBase64(
        JSON.stringify({ query: queryArea, variables: variablesArea ? variablesArea : '' }),
      );
      if (pathnamePieces.length === 2 || !pathnamePieces[2]) {
        router.push(`/${pathnamePieces[1]}//${encodedQuery}`);
      } else {
        router.push(`/${pathnamePieces[1]}/${pathnamePieces[2]}/${encodedQuery}`);
      }
    } else {
      pathnamePieces.length === 4 && router.push(`/${pathnamePieces[1]}/${pathnamePieces[2]}`);
    }
  };

  return (
    <div className={styles.graphiqlContainer}>
      <form className={styles.form} ref={ref} action={action} noValidate>
        <div className={styles.endpointField}>
          <label htmlFor="endpointURL">
            Endpoint URL:
            <input
              type="text"
              name="endpointURL"
              id="endpointURL"
              value={endpointURL}
              onChange={(e) => setEndpointURL(e.target.value)}
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
              value={queryArea}
              onChange={(e) => setQueryArea(e.target.value)}
              onBlur={handleQueryFocusOut}
            ></textarea>
          </fieldset>
          <fieldset>
            <legend>Variables</legend>
            <textarea
              className={styles.variablesGraphQL}
              name="variables"
              id="variables"
              placeholder="Variables..."
              value={variablesArea}
              onChange={(e) => setVariablesArea(e.target.value)}
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
            <p>{documentationSDL}</p>
          </div>
        )}
      </article>
    </div>
  );
};

export default GQLForm;
