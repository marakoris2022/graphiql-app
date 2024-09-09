import { screen } from '@testing-library/react';
import { renderWithProvider } from './utils/testUtils';
import Headers from '@/app/GRAPHQL/components/headers/Headers';

test("Headers render 'Request Headers'", async () => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      search: '?key=value',
    },
  });

  renderWithProvider(<Headers />);

  const element = await screen.findByText('Request Headers');
  expect(element).not.toBeNull();
});
