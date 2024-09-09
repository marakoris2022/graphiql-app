import Image from 'next/image';
import styles from './aboutCard.module.css';

type AboutCProps = {
  authorName: string;
  title: string;
  bio: string;
  git: string;
  photo: string;
};

export const AboutCard = ({
  authorName,
  title,
  bio,
  git,
  photo,
}: AboutCProps) => {
  return (
    <div className={styles.aboutCardWrapper}>
      <div className={styles.imgWrapper}>
        <Image src={photo} alt="" width={200} height={380} />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.titleWrapper}>
          <span className={styles.titleName}>{authorName}</span>
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.bioWrapper}>
          <p className={styles.bioText}>{bio}</p>
        </div>
        <div className={styles.githubWrapper}>
          <a className={styles.githubLink} href={git} target="blank">
            GitHub
            <Image src="/github.png" alt="github" width={20} height={20} />
          </a>
        </div>
      </div>
    </div>
  );
};
