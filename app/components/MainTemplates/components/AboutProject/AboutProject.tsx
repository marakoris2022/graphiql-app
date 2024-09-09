import { useTranslations } from 'next-intl';
import styles from './aboutProject.module.css';

export const AboutProject = () => {
  const t = useTranslations('aboutProject');

  return (
    <section className={styles.aboutProjectContainer}>
      <h3>{t('title')}</h3>
      <p>{t('p1')}</p>
      <p>{t('p2')}</p>
      <p>{t('p3')}</p>
    </section>
  );
};
