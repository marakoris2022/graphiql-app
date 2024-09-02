import React from "react";
import styles from "./mainTemplates.module.css";
import { CustomLink } from "../CustomLink/CustomLink";
import { RoutePath } from "@/utils/utils";
import { createTranslation } from "@/i18n/server";

type MainLoggedUserProps = {
  userName: string;
};

export const MainLoggedUser = async ({ userName }: MainLoggedUserProps) => {
  const { t } = await createTranslation("main");
  return (
    <div className={styles.main}>
      <h1>
        {t("mainLoggedUser.title")} {userName}
      </h1>
      <nav>
        <ul>
          <li>
            <CustomLink
              href={"/graphiql-client"}
              title={t("mainLoggedUser.graphiql")}
            />
          </li>
          <li>
            <CustomLink
              href={RoutePath.REST_CLIENT_GET}
              title={t("mainLoggedUser.rest")}
            />
          </li>
          <li>
            <CustomLink
              href={RoutePath.HISTORY}
              title={t("mainLoggedUser.history")}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};
