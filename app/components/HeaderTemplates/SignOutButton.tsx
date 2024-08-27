"use client";
import { app } from "@/firebase";
import { toastifyMessage } from "@/utils/utils";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const SignOutButton = () => {
  const router = useRouter();

  async function handleLogout() {
    await signOut(getAuth(app));

    await fetch("/api/logout");

    router.push("/");
    router.refresh();
    toast.success("You are successfully signed out!", toastifyMessage);
  }

  return (
    <button className="linkDefault" onClick={handleLogout}>
      Sign Out
    </button>
  );
};
