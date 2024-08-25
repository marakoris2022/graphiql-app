import styles from "./headerTemplates.module.css";
import Link from "next/link";
import { SignOutButton } from "./SignOutButton";

export const HeaderLoggedUser = () => {
  return (
    <header>
      <div>Logo</div>
      <div>Toggle Language</div>
      <nav>
        <ul className={styles.buttonsContainer}>
          <li>
            <Link href="/">To Main</Link>
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};
