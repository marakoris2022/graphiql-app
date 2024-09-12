import { screen } from '@testing-library/react';
import { renderWithProvider } from './utils/testUtils';
import { Header } from '@/app/components/Header/Header';
import { HeaderContainer } from '@/app/components/Header/HeaderContainer';
import { HeaderLoggedUser } from '@/app/components/HeaderTemplates/HeaderLoggedUser';
import { HeaderUnLoggedUser } from '@/app/components/HeaderTemplates/HeaderUnLoggedUser';

test("Header render 'HeaderLoggedUser'", async () => {
  renderWithProvider(
    <HeaderContainer>
      <HeaderLoggedUser />
    </HeaderContainer>
  );

  const element = await screen.findByText('English');
  expect(element).not.toBeNull();
});

test("Header render 'HeaderUnLoggedUser'", async () => {
  renderWithProvider(
    <HeaderContainer>
      <HeaderUnLoggedUser />
    </HeaderContainer>
  );

  const element = await screen.findAllByText('English');
  expect(element[0]).not.toBeNull();
});
