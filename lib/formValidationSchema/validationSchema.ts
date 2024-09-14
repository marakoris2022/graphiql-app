import * as Yup from 'yup';
import { parse } from 'graphql';

export const createVariablesValidation = (t: (key: string) => string) => {
  return Yup.string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .test('isValidJSON', t('errInvalidJson'), (value) => {
      if (!value) return true;
      try {
        JSON.parse(value);
        return true;
      } catch {
        return false;
      }
    });
};

export const createQueryValidation = (t: (key: string) => string) => {
  return Yup.string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .test('is-valid-graphql', t('errInvalidGraphQLQuery'), (value) => {
      if (!value) return true;
      try {
        parse(value);
        return true;
      } catch (error) {
        return false;
      }
    });
};

export const createGqlFormSchema = (t: (key: string) => string) => {
  const variablesValidation = createVariablesValidation(t);
  const queryValidation = createQueryValidation(t);

  return Yup.object().shape({
    endpointURL: Yup.string()
      .url(t('errInvalidUrl'))
      .required(t('errRequiredUrl')),
    endpointSDL: Yup.string()
      .url(t('errInvalidUrl'))
      .nullable()
      .transform((value) => (value === '' ? null : value)),
    query: queryValidation,
    variables: variablesValidation,
  });
};

export const endpointSDLSchema = (t: (key: string) => string) => {
  return Yup.object().shape({
    valueSDL: Yup.string()
      .url(t('errInvalidUrl'))
  });
};

export const createPrettifySchema = (t: (key: string) => string) => {
  const variablesValidation = createVariablesValidation(t);
  const queryValidation = createQueryValidation(t);

  return Yup.object().shape({
    query: queryValidation,
    variables: variablesValidation,
  });
};
