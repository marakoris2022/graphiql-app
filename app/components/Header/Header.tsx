import { HeaderLoggedUser } from '../HeaderTemplates/HeaderLoggedUser';
import { HeaderUnLoggedUser } from '../HeaderTemplates/HeaderUnLoggedUser';
import { cookies } from 'next/headers';
import { getTokens } from 'next-firebase-auth-edge';
import { clientConfig, serverConfig } from '@/config';
import { HeaderContainer } from './HeaderContainer';

export const Header = async () => {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (tokens) {
    return (
      <HeaderContainer>
        <HeaderLoggedUser />
      </HeaderContainer>
    );
  }

  return (
    <HeaderContainer>
      <HeaderUnLoggedUser />
    </HeaderContainer>
  );
};
