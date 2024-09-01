import { RoutePath } from "@/utils/utils";
import { CustomLink } from "../CustomLink/CustomLink";
import styles from "./headerTemplates.module.css";

export const HeaderUnLoggedUser = () => {
  return (
    <>
      <div>Logo</div>
      <div>Toggle Language</div>
      <nav>
        <ul className={styles.buttonsContainer}>
          <li>
            <CustomLink href={RoutePath.HOME} title={"Main"} />
          </li>
          <li>
            <CustomLink href={RoutePath.SIGN_IN} title={"Sign In"} />
          </li>
          <li>
            <CustomLink href={RoutePath.SIGN_UP} title={"Sign Up"} />
          </li>
        </ul>
      </nav>
    </>
  );
};
