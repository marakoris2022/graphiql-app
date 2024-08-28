"use client";
import { useEffect, useRef, useState } from "react";

export const HeaderContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(() => true);
      } else {
        setIsSticky(() => false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header ref={ref} className={isSticky ? "sticky" : ""}>
      <div className="headerContainer">{children}</div>
    </header>
  );
};
