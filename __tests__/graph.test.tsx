import { fireEvent, screen } from '@testing-library/react';
import { renderWithProvider } from './utils/testUtils';
import SchemaDocumentation from '@/app/GRAPHQL/components/schemaDocumentation/SchemaDocumentation';
import EndpointURL from '@/app/GRAPHQL/components/endpointUrl/EndpointURL';
import EndpointSDL from '@/app/GRAPHQL/components/endpointSDL/EndpointSDL';
import SubmitButton from '@/app/GRAPHQL/components/buttons/SubmitButton';
import SDLButton from '@/app/GRAPHQL/components/SDLButton/SDLButton';
import PrettifyButton from '@/app/GRAPHQL/components/buttons/PrettifyButton';
import ExplorerButton from '@/app/GRAPHQL/components/buttons/ExplorerButton';
import QuerySection from '@/app/GRAPHQL/components/querySection/QuerySection';
import VariablesSection from '@/app/GRAPHQL/components/variables/VariablesSection';
import GQLForm from '@/app/GRAPHQL/components/GqlForm/GQLForm';

jest.mock('react-dom', () => {
  const actual = jest.requireActual('react-dom');

  return {
    ...actual,
    useFormStatus: () => ({ pending: false }),
  };
});

test("EndpointURL renders 'Endpoint URL:'", async () => {
  renderWithProvider(
    <EndpointURL
      setURL={() => {}}
      urlValue={'Endpoint URL:'}
      setOpen={() => {}}
    />
  );

  const element = await screen.findByText('Endpoint URL:');
  expect(element).not.toBeNull();
});

test("EndpointSDL renders 'Endpoint SDL:'", async () => {
  renderWithProvider(
    <EndpointSDL setSDL={() => {}} sdlValue={'SDL'} setOpen={() => {}} />
  );

  const element = await screen.findAllByText('Endpoint SDL:');
  expect(element[0]).not.toBeNull();
});

test('SubmitButton renders with correct text based on pending state', async () => {
  renderWithProvider(<SubmitButton />);

  let element = await screen.findByText('Submit');
  expect(element).not.toBeNull();
});

test("SDLButton renders 'Get Schema'", async () => {
  renderWithProvider(
    <SDLButton
      open={false}
      setOpen={() => {}}
      endpointURL={'a'}
      endpointSDL={'b'}
      setErrors={() => {}}
      errors={{ a: 'b' }}
    />
  );

  const element = await screen.findByText('Get Schema');
  expect(element).not.toBeNull();
});

test("PrettifyButton renders 'Prettify'", async () => {
  renderWithProvider(<PrettifyButton handler={() => {}} />);

  const element = await screen.findByText('Prettify');
  expect(element).not.toBeNull();
});

test("ExplorerButton renders 'Explorer'", async () => {
  renderWithProvider(<ExplorerButton showFn={() => {}} />);

  const element = await screen.findByText('Explorer');
  expect(element).not.toBeNull();
});

test('QuerySection renders and interacts correctly', async () => {
  renderWithProvider(
    <QuerySection
      variables={`{ "Variables" : "Test Variables" }`}
      setQueryArea={() => {}}
      queryArea={`{ "Query" : "Test Query" }`}
    />
  );

  const element = await screen.findByText(`{ "Query" : "Test Query" }`);
  expect(element).not.toBeNull();

  const textarea: HTMLInputElement = screen.getByPlaceholderText('Query...');
  expect(textarea).not.toBeNull();

  expect(textarea.value).toBe(`{ "Query" : "Test Query" }`);

  fireEvent.change(textarea, {
    target: { value: '{ "Query" : "Updated Query" }' },
  });

  fireEvent.blur(textarea);
});

test("VariablesSection renders 'Explorer'", async () => {
  renderWithProvider(
    <VariablesSection setVariables={() => {}} variables={'a=b'} />
  );

  const element = await screen.findByText('Variables');
  expect(element).not.toBeNull();
});
