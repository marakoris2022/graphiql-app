import { MainUnLoggedUser } from './components/MainTemplates/MainUnLoggedUser';
import { MainLoggedUser } from './components/MainTemplates/MainLoggedUser';
import { cookies } from 'next/headers';
import { getTokens } from 'next-firebase-auth-edge';
import { clientConfig, serverConfig } from '@/config';

export default async function Home() {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!tokens) {
    return <MainUnLoggedUser />;
  }

  return <MainLoggedUser userName={tokens.decodedToken.name} />;
}
