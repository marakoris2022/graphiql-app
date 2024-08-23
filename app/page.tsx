import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <Link href={"/graphiql-client"} />
      <Link href={"/rest-client"} />
      <Link href={"/history"} />
    </div>
  );
}
