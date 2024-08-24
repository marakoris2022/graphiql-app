import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./mainTemplates.module.css";

export const MainUnLoggedUser = () => {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <h1>Welcome!</h1>
      <div className={styles.buttonsContainer}>
        <Button
          type="button"
          variant="contained"
          onClick={() => router.push("/sign-in")}
        >
          Sign In
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => router.push("/sign-up")}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};
