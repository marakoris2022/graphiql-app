import { RoutePath } from "@/utils/utils";
import { CustomLink } from "../CustomLink/CustomLink";
import styles from "./mainTemplates.module.css";

export const MainUnLoggedUser = () => {
  return (
    <div className={styles.main}>
      <h1>Welcome!</h1>
      <div className={styles.buttonsContainer}>
        <CustomLink href={RoutePath.SIGN_IN} title={"Sign In"} />
        <CustomLink href={RoutePath.SIGN_UP} title={"Sign Up"} />
      </div>
    </div>
  );
};
