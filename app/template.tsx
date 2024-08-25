"use client";
import { onAuthStateChanged } from "firebase/auth";
import useUserStore from "./store/userStore";
import { useEffect, useState } from "react";
import { auth } from "@/utils/firebaseConfig";
import Loader from "./components/Loader/Loader";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastContainerConfig, toastifyMessage } from "@/utils/utils";

export default function Template({ children }: { children: React.ReactNode }) {
  const loadingUser = useUserStore((state) => state.loadingUser);
  const setLoadingUser = useUserStore((state) => state.setLoadingUser);
  const setUser = useUserStore((state) => state.setUser);
  const removeUser = useUserStore((state) => state.removeUser);
  const router = useRouter();
  const isFirstAuthCheck = useUserStore((state) => state.isFirstAuthCheck);
  const setIsFirstAuthCheck = useUserStore(
    (state) => state.setIsFirstAuthCheck
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user
          .getIdToken()
          .then(() => {
            setUser(user);

            if (isFirstAuthCheck) {
              toast.success("You are successfully signed in!", toastifyMessage);
              setIsFirstAuthCheck(false);
            }
          })
          .catch(() => {
            removeUser();
            router.push("/");
            toast.error("Your session has expired", toastifyMessage);
          })
          .finally(() => {
            setLoadingUser(false);
          });
      } else {
        removeUser();
        setLoadingUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loadingUser) {
    return <Loader></Loader>;
  }

  return (
    <main>
      {children}
      <ToastContainer {...toastContainerConfig} />
    </main>
  );
}
