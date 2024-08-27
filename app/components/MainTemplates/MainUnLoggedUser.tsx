import { CustomLink } from "../CustomLink/CustomLink";
import styles from "./mainTemplates.module.css";

export const MainUnLoggedUser = () => {
  return (
    <div className={styles.main}>
      <h1>Welcome!</h1>
      <div className={styles.buttonsContainer}>
        <CustomLink href={"/sign-in"} title={"Sign In"} />
        <CustomLink href={"/sign-up"} title={"Sign Up"} />
      </div>
    </div>
  );
};
