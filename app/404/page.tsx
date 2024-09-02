import { createTranslation } from "@/i18n/server";

export default async function NotFoundPage() {
  const { t } = await createTranslation("404");
  return <div>{t("title")}</div>;
}
