import { signOutUser } from "@/utils/firebaseConfig";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./headerTemplates.module.css";
import { toast } from "react-toastify";
import { toastifyMessage } from "@/utils/utils";

export const HeaderLoggedUser = () => {
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
              size="small"
              variant="contained"
              onClick={async () => {
                await signOutUser();
                toast.success("Sign out success", toastifyMessage);
              }}
            >
              Sign Out
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
