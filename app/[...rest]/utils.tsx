import { FieldValues } from "react-hook-form";

export interface FormData {
  method: string;
  EndpointURL: string;
  body?: string;
  [key: `headerKey_${number}`]: string;
  [key: `headerValue_${number}`]: string;
}

export function encodeBase64(str: string) {
  return Buffer.from(str).toString("base64");
}

export function decodeBase64(base64Str: string) {
  return Buffer.from(base64Str, "base64").toString("ascii");
}

export const stringToJSONString = (rawString: string) => {
  try {
    let formattedInput = rawString.replace(/'/g, '"');

    formattedInput = formattedInput.replace(/(\w+)\s*:/g, '"$1":');

    formattedInput = formattedInput.replace(/,\s*([\]}])/g, "$1");

    const parsedObject = JSON.parse(formattedInput);

    const jsonString = JSON.stringify(parsedObject, null, 2);

    return jsonString;
  } catch {
    return null;
  }
};

export const replaceVariables = (str: string, variables: string[][]) => {
  let newStr = str;
  variables.forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, "g"); // ищем {{key}}
    newStr = newStr.replace(regex, `"${value}"`); // заменяем на значение
  });
  return newStr;
};

export function generateHeaders(headers: {
  [key: `headerKey_${number}`]: string;
  [key: `headerValue_${number}`]: string;
}) {
  return Object.keys(headers)
    .filter(
      (key) =>
        key.startsWith("headerKey_") && headers[key as keyof typeof headers]
    )
    .map((key) => {
      const index = key.split("_")[1];
      const headerKey = encodeURIComponent(
        headers[key as keyof typeof headers]
      );
      const headerValue = encodeURIComponent(
        headers[`headerValue_${index}` as keyof typeof headers]
      );
      return `${headerKey}=${headerValue}`;
    })
    .join("&");
}

export function generateURL(data: FormData | FieldValues) {
  const { EndpointURL, method, body, ...headers } = data as FormData;

  const localStorageData = localStorage.getItem("RESTVariables") ?? "";
  const variables = localStorageData ? JSON.parse(localStorageData) : [];

  const variableURL = replaceVariables(EndpointURL, variables).replaceAll(
    '"',
    ""
  );

  const encodedURL = encodeBase64(variableURL);

  const encodedBody = body ? encodeBase64(body) : null;

  const headerParams = generateHeaders(headers);

  let generatedURL = `/${method}/${encodedURL}`;

  if (encodedBody) {
    generatedURL += `/${encodedBody}`;
  }
  if (headerParams) {
    generatedURL += `?${headerParams}`;
  }

  return generatedURL;
}

export function saveRequestToLS({
  method,
  generatedURL,
  EndpointURL,
}: {
  method: string;
  generatedURL: string;
  EndpointURL: string;
}) {
  const history = localStorage.getItem("requestHistory");

  if (!history) {
    localStorage.setItem(
      "requestHistory",
      JSON.stringify([{ method, generatedURL, EndpointURL, Date: Date.now() }])
    );
    return;
  }

  const parsedHistory = JSON.parse(history);
  parsedHistory.unshift({
    method,
    generatedURL,
    EndpointURL,
    Date: Date.now(),
  });
  localStorage.setItem("requestHistory", JSON.stringify(parsedHistory));
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}
