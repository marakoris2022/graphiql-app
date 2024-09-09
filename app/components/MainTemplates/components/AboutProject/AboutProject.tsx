import { useTranslations } from 'next-intl';
import styles from './aboutProject.module.css';
import Image from 'next/image';

export const AboutProject = () => {
  const t = useTranslations('aboutProject');

  return (
    <section className={styles.aboutProjectContainer}>
      <h3>{t('title')}</h3>
      <div className={styles.cardContainer}>
        <div className={styles.cardTitleContainer}>
          <h4>
            NextJS{' '}
            <Image src="/nextjs-logo.svg" alt="nextjs" width={22} height={22} />{' '}
            <span>{t('and')}</span> Firebase
            <Image
              src="/firebase-logo.svg"
              alt="firebase"
              width={22}
              height={24}
            />
          </h4>
        </div>
        <p>{t('p1')}</p>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardTitleContainer}>
          <h4>{t('accessibility')}</h4>
          <Image
            src="/accessibility-logo.svg"
            alt="accessibility"
            width={22}
            height={22}
          />
        </div>
        <p>{t('p2')}</p>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardTitleContainer}>
          <h4>{t('history')}</h4>
          <Image src="/history-logo.svg" alt="history" width={22} height={22} />
        </div>
        <p>{t('p3')}</p>
      </div>
    </section>
  );
};

//accessibility-logo.svg
