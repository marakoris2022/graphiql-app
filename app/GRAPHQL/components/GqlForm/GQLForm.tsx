'use client';

import { createQuery } from '@/lib/actions/form.actions';
import { useRef, useState } from 'react';
import SubmitButton from '../buttons/SubmitButton';
import styles from './gqlForm.module.css';
import { useFormState } from 'react-dom';
import PrettifyButton from '../buttons/PrettifyButton';
import SDLButton from '../SDLButton/SDLButton';
import gqlPrettier from 'graphql-prettier';
import EndpointURL from '../endpointUrl/EndpointURL';
import EndpointSDL from '../endpointSDL/EndpointSDL';
import QuerySection from '../querySection/QuerySection';
import VariablesSection from '../variables/VariablesSection';
import ExplorerButton from '../buttons/ExplorerButton';
import Headers from '../headers/Headers';
import SchemaDocumentation from '../schemaDocumentation/SchemaDocumentation';
import { ResultBlock } from '@/app/components/REST/components/ResultBlock';
import { gqlFormSchema, prettifySchema } from '@/lib/formValidationSchema/validationSchema';
import * as Yup from 'yup';
import { usePathname } from 'next/navigation';
import { decodeBase64 } from '@/app/[...rest]/utils';

const GQLForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [data, action] = useFormState(createQuery, {
    title: '',
    status: null,
    message: '',
  });
  const pathname = usePathname();
  const [endpointURL, setEndpointURL] = useState<string>(() => {
    const pathArray = pathname.split('/');
    const url = pathArray[2];
    const decodedUrl = url ? decodeURIComponent(decodeBase64(url)) : '';
    return decodedUrl;
  });
  const [endpointSDL, setEndpointSDL] = useState<string>('');
  const [variablesArea, setVariablesArea] = useState<string>(() => {
    const pathArray = pathname.split('/');
    const query = pathArray[3];
    const decodedVariables = query
      ? JSON.parse(decodeURIComponent(decodeBase64(query))).variables
      : '';
    return decodedVariables;
  });

  const [queryArea, setQueryArea] = useState<string>(() => {
    const pathArray = pathname.split('/');
    const query = pathArray[3];
    const decodedQuery = query ? JSON.parse(decodeURIComponent(decodeBase64(query))).query : '';
    return decodedQuery;
  });
  const [open, setOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const formData = {
      endpointURL,
      endpointSDL,
      query: queryArea,
      variables: variablesArea || null,
    };

    try {
      await gqlFormSchema.validate(formData, { abortEarly: false });
      setErrors({});
      action(data);
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        const formErrors = validationError.inner.reduce(
          (acc, err) => ({
            ...acc,
            [err.path!]: err.message,
          }),
          {},
        );
        setErrors(formErrors);
      }
    }
  };

  const formatQuery = async () => {
    if (ref.current) {
      const formData = {
        query: queryArea,
        variables: variablesArea || null,
      };

      try {
        await prettifySchema.validate(formData, { abortEarly: false });
        setErrors({});
        if (queryArea) {
          setQueryArea(gqlPrettier(queryArea));
        }

        if (variablesArea) {
          setVariablesArea(JSON.stringify(JSON.parse(variablesArea), null, 2));
        }
      } catch (validationError) {
        if (validationError instanceof Yup.ValidationError) {
          const formErrors = validationError.inner.reduce(
            (acc, err) => ({
              ...acc,
              [err.path!]: err.message,
            }),
            {},
          );
          setErrors(formErrors);
        }
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
      <form className={styles.form} ref={ref} action={action} onSubmit={handleSubmit} noValidate>
        <EndpointURL setURL={setEndpointURL} urlValue={endpointURL} setOpen={setOpen} />
        {errors.endpointURL && <p className={styles.errorText}>{errors.endpointURL}</p>}
        <EndpointSDL setSDL={setEndpointSDL} sdlValue={endpointSDL} setOpen={setOpen} />
        {errors.endpointSDL && <p className={styles.errorText}>{errors.endpointSDL}</p>}
        <Headers />
        <div className={styles.buttonContainer}>
          <span style={{ fontSize: '1.5rem' }}>
            Graph<i>i</i>QL
          </span>
          <SubmitButton />
          <SDLButton
            open={open}
            setOpen={setOpen}
            endpointURL={endpointURL}
            endpointSDL={endpointSDL}
            setErrors={setErrors}
          />
          <PrettifyButton handler={formatQuery} />
          {open && <ExplorerButton showFn={() => setShow((prev) => !prev)} />}
        </div>
        <QuerySection variables={variablesArea} setQueryArea={setQueryArea} queryArea={queryArea} />
        {errors.query && <p className={styles.errorText}>{errors.query}</p>}
        <VariablesSection setVariables={setVariablesArea} variables={variablesArea} />
        {errors.variables && <p className={styles.errorText}>{errors.variables}</p>}
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
