import { useTranslations } from "next-intl";
import styles from "./page.module.css";
import { CustomLink } from "../components/CustomLink/CustomLink";
import { RoutePath } from "@/utils/utils";

export default function NotFoundPage() {
  const t = useTranslations("404");
  return (
    <div className={styles.notFoundContainer}>
      <h2>{t("title")}</h2>
      <CustomLink href={RoutePath.HOME} title={t("main")} />
    </div>
  );
}
