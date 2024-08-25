import { run } from "node:test";
import "server-only";

const dictionaries: Record<
  string,
  () => Promise<{ products: { cart: string } }>
> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  ru: () => import("./dictionaries/ru.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en" | "ru") =>
  dictionaries[locale]();
