"use client";

import { getCookie, setCookie } from "@/utils/utils";

export const HeaderToggle = () => {
  const changeLocale = () => {
    if (getCookie("langRSTeam") === "ru") {
      setCookie("langRSTeam", "en");
    } else if (getCookie("langRSTeam") === "") {
      setCookie("langRSTeam", "en");
    } else {
      setCookie("langRSTeam", "ru");
    }
  };
  return <button onClick={changeLocale}>HeaderToggle</button>;
};
