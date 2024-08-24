"use client";
import useUserStore from "@/app/store/userStore";

export const Footer = () => {
  const user = useUserStore((state) => state.user);
  const loadingUser = useUserStore((state) => state.loadingUser);

  if (loadingUser) {
    return null;
  }

  return <footer>Footer</footer>;
};
