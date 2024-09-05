"use client";
import { app } from "@/firebase";
import { RoutePath, toastifyMessage } from "@/utils/utils";
import { getAuth, signOut } from "firebase/auth";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const SignOutButton = () => {
  const router = useRouter();
  const t = useTranslations("loggedUserHeader");

  async function handleLogout() {
    await signOut(getAuth(app));

    await fetch("/api/logout");

    router.push(RoutePath.HOME);
    router.refresh();
    toast.success(t("toastMsg"), toastifyMessage);
  }

  return (
    <button className="linkDefault" onClick={handleLogout}>
      {t("signOut")}
    </button>
  );
};
