import { User } from "firebase/auth";
import Link from "next/link";
import React from "react";
import styles from "./mainTemplates.module.css";

type MainLoggedUserProps = {
  user: User;
};

export const MainLoggedUser = ({ user }: MainLoggedUserProps) => {
  return (
    <div className={styles.main}>
      {user?.displayName && <h1>Welcome back, {user.displayName}!</h1>}
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
