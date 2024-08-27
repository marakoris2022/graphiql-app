import { CustomLink } from "../CustomLink/CustomLink";
import styles from "./headerTemplates.module.css";

export const HeaderUnLoggedUser = () => {
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
            <CustomLink href={"/sign-in"} title={"Sign In"} />
          </li>
          <li>
            <CustomLink href={"/sign-up"} title={"Sign Up"} />
          </li>
        </ul>
      </nav>
    </header>
  );
};
