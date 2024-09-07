import axios, { AxiosError } from 'axios';
import { decodeBase64 } from '@/app/[...rest]/utils';
import { MainForm } from '../components/REST/MainForm';
import { ResultBlock } from '../components/REST/components/ResultBlock';

import styles from './page.module.css';
import { getTranslations } from 'next-intl/server';

type RestClientProps = {
  params: {
    rest: string[];
  };
  searchParams: { [K: string]: string };
};

export default async function RestClient({ params, searchParams }: RestClientProps) {
  const { rest } = params;

  const t = await getTranslations('apiClient');

  let responseTitle = '';
  let responseData = null;
  let responseStatusCode = '';
  let body = null;
  let url = undefined;

  const method = decodeURIComponent(rest?.[0]) || 'GET';
  const encodedUrl = decodeURIComponent(rest?.[1]);
  const encodedBody = Boolean(rest?.[2]) ? decodeURIComponent(rest?.[2]) : null;

  try {
    url = decodeBase64(encodedUrl);
    if (encodedBody) {
      body = decodeBase64(encodedBody);
    }
  } catch (error) {
    responseTitle = t('error');
    if (error instanceof Error) {
      responseData = error.message;
    } else {
      responseData = String(error);
    }
  }

  const headers: { [key: string]: string } = {};
  if (searchParams && Object.keys(searchParams).length > 0) {
    Object.keys(searchParams).forEach((key) => {
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeURIComponent(searchParams[key]);
      if (decodedKey && decodedValue) {
        headers[decodedKey] = decodedValue;
      }
    });
  }

  const requestData = {
    method: method.toLowerCase(),
    url,
    data: body || undefined,
    headers: Object.keys(headers).length > 0 ? headers : undefined,
  };

  try {
    const response = await axios(requestData);

    responseTitle = t('result');
    responseData = response.data;
    responseStatusCode = String(response.status);
  } catch (error) {
    responseTitle = t('error');

    if (error instanceof AxiosError) {
      responseData = error.message;
      responseStatusCode = String(error.response?.status);
    } else {
      responseData = (error as Error).message;
    }
  }

  if (rest.length === 1) {
    responseTitle = t('restTitle');
    responseData = t('responseTitle');
  }

  return (
    <section className={styles.pageWrapper}>
      <MainForm />

      <ResultBlock
        title={responseTitle}
        responseData={JSON.stringify(responseData, null, 2)}
        statusCode={responseStatusCode}
      />
    </section>
  );
}
