"use client";
import { app } from "@/firebase";
import { RoutePath, toastifyMessage } from "@/utils/utils";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type SignOutButtonProps = {
  title: string;
  toastMsg: string;
};

export const SignOutButton = ({ title, toastMsg }: SignOutButtonProps) => {
  const router = useRouter();

  async function handleLogout() {
    await signOut(getAuth(app));

    await fetch("/api/logout");

    router.push(RoutePath.HOME);
    router.refresh();
    toast.success(toastMsg, toastifyMessage);
  }

  return (
    <button className="linkDefault" onClick={handleLogout}>
      {title}
    </button>
  );
};
