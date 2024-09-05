"use client";
import { setUserLocale } from "@/services/locale";
import { useLocale, useTranslations } from "next-intl";
import styles from "./headerTemplates.module.css";

export default function LocaleSwitcher() {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    if (newLocale === locale) return;

    setUserLocale(newLocale);
  };

  return (
    <select
      className={styles.localeSwitcher}
      defaultValue={locale}
      onChange={handleChange}
    >
      <option value="en">{t("en")}</option>
      <option value="ru">{t("ru")}</option>
    </select>
  );
}
