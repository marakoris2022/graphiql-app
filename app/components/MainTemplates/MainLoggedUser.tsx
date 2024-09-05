import React from "react";
import styles from "./mainTemplates.module.css";
import { CustomLink } from "../CustomLink/CustomLink";
import { RoutePath } from "@/utils/utils";
import { useTranslations } from "next-intl";

type MainLoggedUserProps = {
  userName: string;
};

export const MainLoggedUser = ({ userName }: MainLoggedUserProps) => {
  const t = useTranslations("mainLoggedUser");
  return (
    <section className={styles.main}>
      <h2>
        {t("title")} {userName}
      </h2>
      <nav>
        <ul>
          <li>
            <CustomLink href={"/GRAPHQL"} title={t("graphiql")} />
          </li>
          <li>
            <CustomLink href={RoutePath.REST_CLIENT_GET} title={t("rest")} />
          </li>
          <li>
            <CustomLink href={RoutePath.HISTORY} title={t("history")} />
          </li>
        </ul>
      </nav>
    </section>
  );
};
