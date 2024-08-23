import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href={"/graphiql-client"}>graphiql-client</Link>
          </li>
          <li>
            <Link href={"/rest-client"}>rest-client</Link>
          </li>
          <li>
            <Link href={"/history"}>history</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
