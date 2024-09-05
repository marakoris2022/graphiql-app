import { getTokens } from "next-firebase-auth-edge";
import { HistoryContainer } from "../components/HISTORY/HistoryContainer";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "@/config";

export default async function History() {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  return <HistoryContainer currUser={tokens?.decodedToken.email} />;
}
