"use server";

import type { FormCheckResult } from "@/lib/types";

type GraphQLRequest = {
  endpointURL: string;
  query: string;
  queryHeaders: { [key: string]: string },
  variablesOfJSONFormat: { [key: string]: string | number }
}

const makeRequest = ({ endpointURL, query, queryHeaders={}, variablesOfJSONFormat = {} }: GraphQLRequest): Promise<Response>  => {
  return fetch(endpointURL, {
    method: "POST",
    headers: {
      ...queryHeaders,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query, variables: variablesOfJSONFormat})
  });
};

export async function createQuery(
  prevState: FormCheckResult,
  data: FormData
): Promise<FormCheckResult> {
  try {
    const endpointURL = data.get("endpointURL") as string | null;
    const query = data.get("query") as string | null;
    if (!endpointURL) {
      throw new Error('Endpoint is required')
    }
    if (!query) {
      throw new Error('Body of GraphQL Query is required')
    }
    const variables = (data.get("variables") as string | null) || '{}';
    const headersKeys = data.getAll("headerKey") as string[];
    const headersValues = data.getAll("headerValue") as string[];
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
      return {title: 'Error', status: null, message: "Invalid JSON format for variables." };
    }

    const response = await makeRequest({ endpointURL, query, queryHeaders, variablesOfJSONFormat });

    if (response.status >= 400 && response.status <= 499) {
      const responseOfJSONFormat = await response.json();
      return {
         title: 'Response',
         status: response.status,
         message: `${JSON.stringify(responseOfJSONFormat, null, 2)}`,
      }
  } else if (response.status >= 500 && response.status <= 599) {
      const responseOfTextFormat = await response.text();
      return {
        title: 'Response',
         status: response.status,
         message: responseOfTextFormat,
      }
  } else if(response.status >= 200 && response.status <= 299){
      const responseOfJSONFormat = await response.json();
      return {
         title: 'Response',
        status: response.status,
         message: `${JSON.stringify(responseOfJSONFormat, null, 2)}`,
      }
    } else {
      const responseOfTextFormat = await response.text();
      return  {
      title: 'Error',
      status: response.status,
      message: responseOfTextFormat
    };
  }
  } catch (error) {
    return {
      title: 'Error',
      status: null,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
}



import { getIntrospectionQuery } from 'graphql/utilities';

export async function createSDLQuery(endpointSDL: string): Promise<typeof Object> {
  try {
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

    if (response.status >= 500 && response.status <= 599) {
      throw new Error ( '500 Internal Server Error');
    }

    if (response.status >= 400 && response.status <= 499) {
      throw new Error (`Client Error: ${response.status} ${response.statusText}`);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.data) {
      throw new Error('No data found in the response.');
    }
    return result.data;

  } catch (error) {
    throw error;
  }
}
