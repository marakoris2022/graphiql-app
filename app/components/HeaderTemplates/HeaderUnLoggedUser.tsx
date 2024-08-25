import styles from "./headerTemplates.module.css";
import Link from "next/link";

export const HeaderUnLoggedUser = () => {
  return (
    <header>
      <div>Logo</div>
      <div>Toggle Language</div>
      <nav>
        <ul className={styles.buttonsContainer}>
          <li>
            <Link href={"/"}>To Main</Link>
          </li>
          <li>
            <Link href={"/sign-in"}>Sign In</Link>
          </li>
          <li>
            <Link href={"/sign-up"}>Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
