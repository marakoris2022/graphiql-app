import styles from "./headerTemplates.module.css";
import { SignOutButton } from "./SignOutButton";
import { CustomLink } from "../CustomLink/CustomLink";
import { RoutePath } from "@/utils/utils";

export const HeaderLoggedUser = () => {
  return (
    <header>
      <div>Logo</div>
      <div>Toggle Language</div>
      <nav>
        <ul className={styles.buttonsContainer}>
          <li>
            <CustomLink href={RoutePath.HOME} title={"Main"} />
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};
