import { cookies } from "next/headers";
import { getDictionary } from "./dictionaries";

type PageProps = {
  params: { lang: "en" | "ru" };
};

export default async function Page({ params: { lang } }: PageProps) {
  const dict = await getDictionary(lang); // en
  const Data = cookies();
  console.log("Data", Data.getAll());

  return (
    <button>{dict.products.cart}</button> // Add to Cart
  );
}
