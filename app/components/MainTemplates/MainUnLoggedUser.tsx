import { RoutePath } from "@/utils/utils";
import { CustomLink } from "../CustomLink/CustomLink";
import styles from "./mainTemplates.module.css";
import { createTranslation } from "@/i18n/server";

export const MainUnLoggedUser = async () => {
  const { t } = await createTranslation("main");
  return (
    <div className={styles.main}>
      <h1>{t("mainUnLoggedUser.title")}</h1>
      <div className={styles.buttonsContainer}>
        <CustomLink
          href={RoutePath.SIGN_IN}
          title={t("mainUnLoggedUser.signIn")}
        />
        <CustomLink
          href={RoutePath.SIGN_UP}
          title={t("mainUnLoggedUser.signUp")}
        />
      </div>
    </div>
  );
};
