import { FieldValues } from "react-hook-form";

interface FormData {
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

export function generateURL(data: FormData | FieldValues) {
  const { EndpointURL, method, body, ...headers } = data as FormData;

  const encodedURL = encodeBase64(EndpointURL);
  const encodedBody = body ? encodeBase64(JSON.stringify(body)) : null;

  const headerParams = Object.keys(headers)
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

  let generatedURL = `/${method}/${encodedURL}`;

  if (encodedBody) {
    generatedURL += `/${encodedBody}`;
  }
  if (headerParams) {
    generatedURL += `?${headerParams}`;
  }

  return generatedURL;
}
