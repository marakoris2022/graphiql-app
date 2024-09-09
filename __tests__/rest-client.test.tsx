import { screen } from '@testing-library/react';
import { renderWithProvider } from './utils/testUtils';
import { MainForm } from '@/app/components/REST/MainForm';
import { ResultBlock } from '@/app/components/REST/components/ResultBlock';
import { ErrorBlock } from '@/app/components/REST/components/ErrorBlock';

test("REST MainForm / ResultBlock render 'Endpoint URL'", async () => {
  renderWithProvider(
    <>
      <MainForm />

      <ResultBlock
        title={'result'}
        responseData={'test response'}
        statusCode={'200'}
      />

      <ErrorBlock errorText="Error Text" />
    </>
  );

  const element = await screen.findAllByText('Endpoint URL');
  expect(element[0]).not.toBeNull();
});
