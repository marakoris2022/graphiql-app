import { screen } from '@testing-library/react';
import { renderWithProvider } from './utils/testUtils';
import { Footer } from '@/app/components/Footer/Footer';

test("Footer render 'Marakoris2022'", async () => {
  renderWithProvider(<Footer />);

  const element = await screen.findByText('Marakoris2022');
  expect(element).not.toBeNull();
});
