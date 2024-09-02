"use client";
import { useTranslation } from "@/i18n/client";
import styles from "./ResultBlock.module.css";

export const ResultBlock = ({
  responseData,
}: {
  responseData: typeof Object | string;
}) => {
  let resData = "";

  const { t } = useTranslation("rest");

  if (typeof responseData === "string") {
    resData = responseData;
  } else {
    resData = JSON.stringify(responseData, null, 2);
  }

  return (
    <div className={styles.resultWrapper}>
      <h1 className={styles.title}>{t("response")}</h1>
      <textarea className={styles.textarea} value={resData} disabled />
    </div>
  );
};
