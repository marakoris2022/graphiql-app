import styles from "./headerTemplates.module.css";
import { SignOutButton } from "./SignOutButton";
import { CustomLink } from "../CustomLink/CustomLink";
import { RoutePath } from "@/utils/utils";
import { HeaderToggle } from "./HeaderToggle";

export const HeaderLoggedUser = () => {
  return (
    <>
      <div>Logo</div>
      <HeaderToggle />
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
    </>
  );
};
