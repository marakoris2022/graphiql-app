 "use server";

import { revalidatePath } from "next/cache";
import type { FormCheckResult } from "@/lib/types";
import { encodeBase64, RoutePath } from "@/utils/utils";

type GraphQLRequest = {
  endpointURL: string;
  query: string;
  queryHeaders: { [key: string]: string },
  variablesOfJSONFormat: { [key: string]: string }
}

const makeRequest = ({ endpointURL, query, queryHeaders={}, variablesOfJSONFormat = {} }: GraphQLRequest): Promise<Response>  => {
  return fetch(endpointURL, {
    method: "POST",
    headers: {
      ...queryHeaders,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query, variablesOfJSONFormat})
  });
};

export async function createQuery(
  prevState: FormCheckResult,
  data: FormData
): Promise<FormCheckResult> {
  try {
    const endpointURL = data.get("endpointURL") as string;
    const query = data.get("query") as string;
    const variables = data.get("variables") as string || '{}';
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
      return {status: null, message: "Invalid JSON format for variables." };
    }

    const response = await makeRequest({ endpointURL, query, queryHeaders, variablesOfJSONFormat });

    if (response.status >= 400 && response.status <= 499) {
      const responseOfJSONFormat = await response.json();
       return {
         status: response.status,
         message: `${JSON.stringify(responseOfJSONFormat, null, 2)}`,
      }
  } else if (response.status >= 500 && response.status <= 599) {
      const responseOfTextFormat = await response.text();
      return {
         status: response.status,
         message: responseOfTextFormat,
      }
  } else {
      const responseOfJSONFormat = await response.json();
      const endpointURLEncoded = encodeBase64(endpointURL);
    const queryEncoded = encodeBase64(query);
       return {
        status: response.status,
         message: `${JSON.stringify(responseOfJSONFormat, null, 2)}`,
         endpointURLEncoded,
        queryEncoded
      }
  }
  } catch (error) {
    return {
      status: null,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
}