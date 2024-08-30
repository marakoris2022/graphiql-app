import styles from "./footer.module.css";
import Image from "next/image";

type GitHubUserContainerProps = {
  href: string;
  userName: string;
};

export const GitHubUserContainer = ({
  href,
  userName,
}: GitHubUserContainerProps) => {
  return (
    <div className={styles.githubUserContainer}>
      <a href={href}>
        <Image src="/github.png" alt="github" width={30} height={30}></Image>
        <span>{userName}</span>
      </a>
    </div>
  );
};
