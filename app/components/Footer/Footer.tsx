import Image from "next/image";
import styles from "./footer.module.css";
import { GitHubUserContainer } from "./GitHubUserContainer";

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className={styles.footerContainer}>
          <div style={{ fontSize: "18px" }}>2024 ©</div>
          <div className={styles.githubContainer}>
            <GitHubUserContainer
              href="https://github.com/marakoris2022"
              userName="Marakoris2022"
            />
            <GitHubUserContainer
              href="https://github.com/LokiSpirit"
              userName="LokiSpirit"
            />
            <GitHubUserContainer
              href="https://github.com/OxygeniumO2"
              userName="OxygeniumO2"
            />
          </div>
          <div className={styles.rsschoolLogo}>
            <a href="https://rs.school/courses/reactjs">
              <Image
                src="/rss-logo.svg"
                alt="logo"
                width={54}
                height={54}
              ></Image>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
