import styles from "./headerTemplates.module.css";
import { SignOutButton } from "./SignOutButton";
import { CustomLink } from "../CustomLink/CustomLink";

export const HeaderLoggedUser = () => {
  return (
    <header>
      <div>Logo</div>
      <div>Toggle Language</div>
      <nav>
        <ul className={styles.buttonsContainer}>
          <li>
            <CustomLink href={"/"} title={"Main"} />
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};
