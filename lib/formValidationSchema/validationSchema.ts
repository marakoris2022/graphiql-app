import * as Yup from 'yup';

export const endpointURLSchema = Yup.string().url('Invalid URL format').required('URL is required');

export const endpointSDLSchema = Yup.string()
  .url('Invalid URL format')
  .nullable()
  .transform(value => (value === '' ? null : value));

export const prettifySchema = Yup.object().shape({
    variables: Yup.string()
        .test('isValidJSON', 'Invalid JSON format', (value) => {
            if (!value) return true;
            try {
                JSON.parse(value);
                return true;
            } catch {
                return false;
            }
        }),
});
