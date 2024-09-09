import * as Yup from 'yup';
import { parse } from 'graphql';

const variablesValidation = Yup.string()
    .nullable()
    .transform(value => (value === '' ? null : value))
    .test('isValidJSON', 'Invalid JSON format', (value) => {
        if (!value) return true;
        try {
            JSON.parse(value);
            return true;
        } catch {
            return false;
        }
    });

const queryValidation = Yup.string()
    .nullable()
    .transform(value => (value === '' ? null : value))
    .test('is-valid-graphql', 'Invalid GraphQL query', (value) => {
        if (!value) return true;
        try {
            parse(value);
            return true;
        } catch (error) {
            return false;
        }
    });

export const prettifySchema = Yup.object().shape({
    query: queryValidation,
    variables: variablesValidation
});

export const gqlFormSchema = Yup.object().shape({
    endpointURL: Yup.string().url('Invalid URL format').required('URL is required'),
    endpointSDL: Yup.string()
        .url('Invalid URL format')
        .nullable()
        .transform(value => (value === '' ? null : value)),
    query: Yup.string()
        .required('Query is required')
        .test('is-valid-graphql', 'Invalid GraphQL query', (value) => {
            if (!value) return false;
            try {
                parse(value);
                return true;
            } catch (error) {
                return false;
            }
        }),
    variables: variablesValidation
});

