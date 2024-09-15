import { screen } from '@testing-library/react';
import { renderWithProvider } from './utils/testUtils';
import SignIn from '@/app/sign-in/page';
import SignUp from '@/app/sign-up/page';

test("SignIn render 'E-mail'", async () => {
  renderWithProvider(<SignIn />);

  const element = await screen.findAllByText('E-mail');
  expect(element[0]).not.toBeNull();
});

test("SignUp render 'E-mail'", async () => {
  renderWithProvider(<SignUp />);

  const element = await screen.findAllByText('E-mail');

  expect(element[0]).not.toBeNull();
});
