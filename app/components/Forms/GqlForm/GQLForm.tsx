'use client';

import { createQuery } from '@/lib/actions/form.actions';
import { useEffect, useRef, useState } from 'react';
import SubmitButton from './SubmitButton';
import styles from './gqlForm.module.css';
import { useFormState } from 'react-dom';

const Form = () => {
  /* const router = useRouter(); */
  const ref = useRef<HTMLFormElement>(null);
  const [data, action] = useFormState(createQuery, {
    status: null,
    message: '',
  });
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);

  useEffect(() => {
    if (data.endpointURLEncoded && data.queryEncoded) {
      /* ref.current?.reset(); */
      /* router.push(`/GRAPHQL/${data.endpointURLEncoded}/${data.queryEncoded}`); */
    }
  }, [data]);

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  return (
    <form className={styles.form} ref={ref} action={action} noValidate>
      <div className={styles.queryField}>
        <label htmlFor="endpointURL">
          Endpoint URL:
          <input type="text" name="endpointURL" id="endpointURL" />
        </label>
        <label htmlFor="SDLURL">
          SDL URL:
          <input type="text" name="SDLURL" id="SDLURL" />
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
        <div className={styles.submit}>
          <SubmitButton />
        </div>
      </div>
      <div className={styles.responseField}>
        <fieldset>
          <legend>Response</legend>
          {data.message && (
            <div>
              <div>Status: {data.status}</div>
              <textarea className={styles.responseArea} readOnly value={data.message} />
            </div>
          )}
        </fieldset>
        {/*  <fieldset>
        <legend>Documentation</legend>
        {data.response?.ok && data.response?.documentation && (
          <textarea readOnly value={data.response.documentation} />
        )}
      </fieldset> */}
      </div>
    </form>
  );
};

export default Form;
