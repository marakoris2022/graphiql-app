"use client";
import useUserStore from "@/app/store/userStore";
import { HeaderLoggedUser } from "../HeaderTemplates/HeaderLoggedUser";
import { HeaderUnLoggedUser } from "../HeaderTemplates/HeaderUnLoggedUser";

export const Header = () => {
  const user = useUserStore((state) => state.user);
  const loadingUser = useUserStore((state) => state.loadingUser);

  if (loadingUser) {
    return null;
  }

  if (user) {
    return <HeaderLoggedUser />;
  }

  return <HeaderUnLoggedUser />;
};
