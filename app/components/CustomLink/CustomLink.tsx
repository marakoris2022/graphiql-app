"use client";
import { usePathname } from "next/navigation";

type CustomLinkProps = {
  href: string;
  title: string;
};

export const CustomLink = ({ href, title }: CustomLinkProps) => {
  const pathName = usePathname();
  return (
    <a className={pathName === href ? "linkActive" : "linkDefault"} href={href}>
      {title}
    </a>
  );
};
