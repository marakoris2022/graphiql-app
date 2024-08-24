"use client";
import Link from "next/link";
import styles from "./page.module.css";
import useUserStore from "./store/userStore";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { MainUnLoggedUser } from "./components/MainTemplates/MainUnLoggedUser";
import { MainLoggedUser } from "./components/MainTemplates/MainLoggedUser";

export default function Home() {
  const user = useUserStore((state) => state.user);

  if (user) {
    return <MainLoggedUser user={user} />;
  }
  return <MainUnLoggedUser />;
}
