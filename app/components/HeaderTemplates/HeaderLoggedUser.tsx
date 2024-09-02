import styles from "./headerTemplates.module.css";
import { SignOutButton } from "./SignOutButton";
import { CustomLink } from "../CustomLink/CustomLink";
import { RoutePath } from "@/utils/utils";
import ChangeLocale from "./ChangeLocale";
import { createTranslation, getLocale } from "@/i18n/server";
import { useTranslation } from "react-i18next";

export const HeaderLoggedUser = async () => {
  const locale = getLocale();
  const { t } = await createTranslation("header");
  return (
    <>
      <div>Logo</div>
      <ChangeLocale locale={locale} />
      <nav>
        <ul className={styles.buttonsContainer}>
          <li>
            <CustomLink
              href={RoutePath.HOME}
              title={t("loggedUserHeader.main")}
            />
          </li>
          <li>
            <SignOutButton
              title={t("loggedUserHeader.signOut")}
              toastMsg={t("loggedUserHeader.toastLogOut")}
            />
          </li>
        </ul>
      </nav>
    </>
  );
};
