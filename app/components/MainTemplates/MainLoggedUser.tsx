import Link from "next/link";
import React from "react";
import styles from "./mainTemplates.module.css";

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
            <Link href={"/graphiql-client"}>graphiql-client</Link>
          </li>
          <li>
            <Link href={"/rest-client"}>rest-client</Link>
          </li>
          <li>
            <Link href={"/history"}>history</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
