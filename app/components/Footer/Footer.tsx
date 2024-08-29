import Image from "next/image";
import { CustomLink } from "../CustomLink/CustomLink";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className={styles.footerContainer}>
          <div style={{ fontSize: "18px" }}>2024 ©</div>
          <div className={styles.githubContainer}>
            <div className={styles.githubUserContainer}>
              <a href="https://github.com/marakoris2022">
                <Image
                  src="/github.png"
                  alt="github"
                  width={30}
                  height={30}
                ></Image>
                <span>Marakoris2022</span>
              </a>
            </div>
            <div className={styles.githubUserContainer}>
              <a href="https://github.com/LokiSpirit">
                <Image
                  src="/github.png"
                  alt="github"
                  width={30}
                  height={30}
                ></Image>
                <span>LokiSpirit</span>
              </a>
            </div>
            <div className={styles.githubUserContainer}>
              <a href="https://github.com/OxygeniumO2">
                <Image
                  src="/github.png"
                  alt="github"
                  width={30}
                  height={30}
                ></Image>
                <span>OxygeniumO2</span>
              </a>
            </div>
          </div>
          <div className={styles.rsschoolLogo}>
            <a href="https://rs.school/react/">
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
