import { RoutePath } from "@/utils/utils";
import { CustomLink } from "../CustomLink/CustomLink";
import styles from "./headerTemplates.module.css";
import { createTranslation, getLocale } from "@/i18n/server";
import ChangeLocale from "./ChangeLocale";

export const HeaderUnLoggedUser = async () => {
  const locale = getLocale();
  const { t } = await createTranslation("header");
  return (
    <>
      <div>Logo</div>
      <ChangeLocale />
      <nav>
        <ul className={styles.buttonsContainer}>
          <li>
            <CustomLink
              href={RoutePath.HOME}
              title={t("unLoggedUserHeader.main")}
            />
          </li>
          <li>
            <CustomLink
              href={RoutePath.SIGN_IN}
              title={t("unLoggedUserHeader.signIn")}
            />
          </li>
          <li>
            <CustomLink
              href={RoutePath.SIGN_UP}
              title={t("unLoggedUserHeader.signUp")}
            />
          </li>
        </ul>
      </nav>
    </>
  );
};
