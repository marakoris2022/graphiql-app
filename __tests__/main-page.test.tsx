import { screen } from '@testing-library/react';
import { MainUnLoggedUser } from '@/app/components/MainTemplates/MainUnLoggedUser';
import { renderWithProvider } from './utils/testUtils';
import { MainLoggedUser } from '@/app/components/MainTemplates/MainLoggedUser';

test('MainUnLoggedUser displays Welcome!', async () => {
  renderWithProvider(<MainUnLoggedUser />);

  const element = await screen.findByText('Welcome!');
  expect(element).not.toBeNull();
});

test('MainLoggedUser displays User Name', async () => {
  renderWithProvider(<MainLoggedUser userName={'TestUser'} />);

  const element = await screen.findByText('Welcome back, TestUser');
  expect(element).not.toBeNull();
});
