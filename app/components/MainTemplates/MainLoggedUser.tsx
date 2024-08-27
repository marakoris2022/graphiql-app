import React from "react";
import styles from "./mainTemplates.module.css";
import { CustomLink } from "../CustomLink/CustomLink";

type MainLoggedUserProps = {
  userName: string;
};

export const MainLoggedUser = ({ userName }: MainLoggedUserProps) => {
  return (
    <div className={styles.main}>
      <h1>Welcome back, {userName}</h1>
      <nav>
        <ul>
          <li>
            <CustomLink href={"/graphiql-client"} title={"graphiql-client"} />
          </li>
          <li>
            <CustomLink href={"/rest-client"} title={"rest-client"} />
          </li>
          <li>
            <CustomLink href={"/history"} title={"history"} />
          </li>
        </ul>
      </nav>
    </div>
  );
};
