import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./headerTemplates.module.css";

export const HeaderUnLoggedUser = () => {
  const router = useRouter();

  return (
    <header>
      <div>Logo</div>
      <div>Toggle Language</div>
      <nav>
        <ul className={styles.buttonsContainer}>
          <li>
            <Button
              type="button"
              variant="contained"
              size="small"
              onClick={() => router.push("/")}
            >
              To Main
            </Button>
          </li>
          <li>
            <Button
              type="button"
              variant="contained"
              size="small"
              onClick={() => router.push("/sign-in")}
            >
              Sign In
            </Button>
          </li>
          <li>
            <Button
              type="button"
              variant="contained"
              size="small"
              onClick={() => router.push("/sign-up")}
            >
              Sign Up
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
