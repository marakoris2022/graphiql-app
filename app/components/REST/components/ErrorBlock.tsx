import { useTranslations } from "next-intl";
import styles from "./ErrorBlock.module.css";

export const ErrorBlock = ({ errorText }: { errorText: string }) => {
  const t = useTranslations("rest");

  if (!errorText) return <></>;

  return (
    <div className={styles.errorWrapper}>
      <h1 className={styles.title}>{t("error")}</h1>
      <textarea className={styles.textarea} value={errorText} disabled />
    </div>
  );
};
