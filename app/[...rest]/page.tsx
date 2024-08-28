import axios from "axios";
import { decodeBase64 } from "@/app/[...rest]/utils"; // Функции декодирования base64
import { MainForm } from "../components/REST/MainForm";
import { ErrorBlock } from "../components/REST/components/ErrorBlock";
import { ResultBlock } from "../components/REST/components/ResultBlock";

import styles from "./page.module.css";

export default async function RestClient({ params, searchParams }) {
  const { rest } = params;

  let responseData = null;
  let errorData: null | string = null;
  let body = null;
  let url = undefined;

  // Проверяем наличие параметров
  const method = decodeURIComponent(rest?.[0]) || "GET"; // Если метод отсутствует, используем "GET" по умолчанию
  const encodedUrl = decodeURIComponent(rest?.[1]);
  const encodedBody = decodeURIComponent(rest?.[2]);

  try {
    // Декодируем URL
    url = decodeBase64(encodedUrl);
    // Если есть тело запроса, декодируем его, иначе - null
    if (encodedBody) {
      body = decodeBase64(encodedBody);
    }
  } catch (error) {
    errorData = error.message; // Сохраняем ошибку
  }

  // Инициализируем объект заголовков
  const headers = {};
  console.log("searchParams", searchParams);

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
    console.log("method", method.toLowerCase());
    console.log("url", url);
    console.log("data", body || undefined);
    console.log(
      "headers",
      Object.keys(headers).length > 0 ? headers : undefined
    );

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

  // если в URL стоит _blank
  if (encodedUrl === "_blank") {
    errorData = "";
    responseData = "Fill data to send REST request.";
  }

  return (
    <section className={styles.pageWrapper}>
      <MainForm />
      {responseData && <ResultBlock responseData={responseData} />}
      <ErrorBlock errorText={errorData!} />
    </section>
  );
}
