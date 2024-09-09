import { screen } from '@testing-library/react';
import { renderWithProvider } from './utils/testUtils';

import Loader from '@/app/components/Loader/Loader';

test("Loader render 'Loading...'", async () => {
  renderWithProvider(<Loader />);

  const element = await screen.findByText('Loading...');
  expect(element).not.toBeNull();
});
