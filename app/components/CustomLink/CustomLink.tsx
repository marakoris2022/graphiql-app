"use client";
import { usePathname } from "next/navigation";

type CustomLinkProps = {
  href: string;
  title: string;
  children?: React.ReactNode;
};

export const CustomLink = ({ href, title, children }: CustomLinkProps) => {
  const pathName = usePathname();
  return (
    <a className={pathName === href ? "linkActive" : "linkDefault"} href={href}>
      {title}
      {children}
    </a>
  );
};
