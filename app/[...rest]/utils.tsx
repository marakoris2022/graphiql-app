import { FieldValues } from "react-hook-form";

interface FormData {
  method: string; // Метод запроса (GET, POST и т.д.)
  EndpointURL: string; // URL для запроса
  body?: string; // Тело запроса, опционально
  [key: `headerKey_${number}`]: string; // Заголовки запроса: ключи
  [key: `headerValue_${number}`]: string; // Заголовки запроса: значения
}

// Function to encode a string to Base64

export function encodeBase64(str: string) {
  return Buffer.from(str).toString("base64");
}

// Function to decode a Base64 string
export function decodeBase64(base64Str: string) {
  return Buffer.from(base64Str, "base64").toString("ascii");
}

export function generateURL(data: FormData | FieldValues) {
  const { EndpointURL, method, body, ...headers } = data as FormData; // Приводим к типу FormData

  // Закодировать URL
  const encodedURL = encodeBase64(EndpointURL);

  // Если есть тело запроса, закодировать его в JSON и Base64
  const encodedBody = body ? encodeBase64(JSON.stringify(body)) : null;

  // Сгенерировать строку с заголовками
  const headerParams = Object.keys(headers)
    .filter(
      (key) =>
        key.startsWith("headerKey_") && headers[key as keyof typeof headers]
    ) // Найти ключи заголовков
    .map((key) => {
      const index = key.split("_")[1]; // Извлекаем индекс из ключа (headerKey_X)
      const headerKey = encodeURIComponent(
        headers[key as keyof typeof headers]
      ); // Приводим тип
      const headerValue = encodeURIComponent(
        headers[`headerValue_${index}` as keyof typeof headers]
      ); // Используем индекс
      return `${headerKey}=${headerValue}`;
    })
    .join("&");

  // Формируем конечный URL
  let generatedURL = `/${method}/${encodedURL}`;
  if (encodedBody) {
    generatedURL += `/${encodedBody}`;
  }
  if (headerParams) {
    generatedURL += `?${headerParams}`;
  }

  return generatedURL;
}
