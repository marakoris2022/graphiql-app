'use server';

import type { FormCheckResult } from '@/lib/types';
import { HttpStatusCode, ResponseTitle } from '@/utils/utils';

type GraphQLRequest = {
  endpointURL: string;
  query: string;
  queryHeaders: { [key: string]: string };
  variablesOfJSONFormat: { [key: string]: string | number };
};

const makeRequest = ({
  endpointURL,
  query,
  queryHeaders = {},
  variablesOfJSONFormat = {},
}: GraphQLRequest): Promise<Response> => {
  return fetch(endpointURL, {
    method: 'POST',
    headers: {
      ...queryHeaders,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query, variables: variablesOfJSONFormat }),
  });
};

export async function createQuery(
  prevState: FormCheckResult,
  data: FormData
): Promise<FormCheckResult> {
  try {
    const endpointURL = data.get('endpointURL') as string | null;
    const query = data.get('query') as string | null;

    if (!endpointURL) {
      throw new Error('Endpoint is required');
    }

    if (!query) {
      throw new Error('Body of GraphQL Query is required');
    }

    const variables = (data.get('variables') as string | null) || '{}';
    const headersKeys = data.getAll('headerKey') as string[];
    const headersValues = data.getAll('headerValue') as string[];
    const queryHeaders: Record<string, string> = {};

    headersKeys.forEach((key, i) => {
      if (key) {
        queryHeaders[key] = headersValues[i];
      }
    });

    let variablesOfJSONFormat = {};
    try {
      variablesOfJSONFormat = JSON.parse(variables);
    } catch (e) {
      return {
        title: ResponseTitle.ERROR,
        status: null,
        message: 'Invalid JSON format for variables.',
      };
    }

    const response = await makeRequest({
      endpointURL,
      query,
      queryHeaders,
      variablesOfJSONFormat,
    });

    if (
      response.status >= HttpStatusCode.BAD_REQUEST &&
      response.status < HttpStatusCode.INTERNAL_SERVER_ERROR
    ) {
      const responseOfJSONFormat = await response.json();
      return {
        title: ResponseTitle.RESPONSE,
        status: response.status,
        message: `${JSON.stringify(responseOfJSONFormat, null, 2)}`,
      };
    }

    if (response.status >= HttpStatusCode.INTERNAL_SERVER_ERROR) {
      const responseOfTextFormat = await response.text();
      return {
        title: ResponseTitle.RESPONSE,
        status: response.status,
        message: responseOfTextFormat,
      };
    }

    if (
      response.status >= HttpStatusCode.OK &&
      response.status < HttpStatusCode.BAD_REQUEST
    ) {
      const responseOfJSONFormat = await response.json();
      return {
        title: ResponseTitle.RESPONSE,
        status: response.status,
        message: `${JSON.stringify(responseOfJSONFormat, null, 2)}`,
      };
    }

    const responseOfTextFormat = await response.text();
    return {
      title: ResponseTitle.ERROR,
      status: response.status,
      message: responseOfTextFormat,
    };
  } catch (error) {
    return {
      title: ResponseTitle.ERROR,
      status: null,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
}

import { getIntrospectionQuery } from 'graphql/utilities';

export async function createSDLQuery(
  endpointSDL: string
): Promise<typeof Object | null> {
  const response = await fetch(endpointSDL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getIntrospectionQuery(),
    }),
  });

  if (!response.ok) {
    return null;
  }

  const result = await response.json();

  if (!result.data) {
    return null;
  }
  return result.data;
}
