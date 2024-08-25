import styles from "./mainTemplates.module.css";
import Link from "next/link";

export const MainUnLoggedUser = () => {
  return (
    <div className={styles.main}>
      <h1>Welcome!</h1>
      <div className={styles.buttonsContainer}>
        <Link href={"/sign-in"}>Sign In</Link>
        <Link href={"/sign-up"}>Sign Up</Link>
      </div>
    </div>
  );
};
