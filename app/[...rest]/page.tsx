import axios from "axios";
import { decodeBase64 } from "@/app/[...rest]/utils"; // Функции декодирования base64
import { MainForm } from "../components/REST/MainForm";
import { ErrorBlock } from "../components/REST/components/ErrorBlock";
import { ResultBlock } from "../components/REST/components/ResultBlock";

import styles from "./page.module.css";

export default async function RestClient({ params }) {
  const { rest, searchParams } = params;

  let responseData = null;
  let errorData: null | string = null;
  let body = null;

  // Проверяем наличие параметров
  const method = rest?.[0] || "GET"; // Если метод отсутствует, используем "GET" по умолчанию
  const encodedUrl = rest?.[1];
  const encodedBody = rest?.[2];

  // Проверяем наличие URL
  if (!encodedUrl) {
    return (
      <div>
        <MainForm />
        <ErrorBlock errorText={"URL не был передан!"} />
      </div>
    );
  }

  // Декодируем URL
  const url = decodeBase64(encodedUrl);

  // Если есть тело запроса, декодируем его, иначе - null

  try {
    if (encodedBody) {
      body = JSON.stringify(decodeBase64(encodedBody));
    }
  } catch (error) {
    errorData = error.message; // Сохраняем ошибку
  }

  // Инициализируем объект заголовков
  const headers = {};
  if (searchParams && Object.keys(searchParams).length > 0) {
    Object.keys(searchParams).forEach((key) => {
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeURIComponent(searchParams[key]);
      if (decodedKey && decodedValue) {
        headers[decodedKey] = decodedValue;
      }
    });
  }

  // Выполняем запрос
  try {
    const response = await axios({
      method: method.toLowerCase(),
      url,
      data: body || undefined, // Передаем тело запроса, если оно есть
      headers: Object.keys(headers).length > 0 ? headers : undefined, // Передаем заголовки, если они есть
    });

    responseData = response.data; // Сохраняем результат
  } catch (error) {
    errorData = error.message; // Сохраняем ошибку
  }

  return (
    <section className={styles.pageWrapper}>
      <MainForm />
      {responseData && <ResultBlock responseData={responseData} />}
      <ErrorBlock errorText={errorData!} />
    </section>
  );
}
