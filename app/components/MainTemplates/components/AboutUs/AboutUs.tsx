import { useTranslations } from 'next-intl';
import { AboutCard } from './AboutCard/AboutCard';
import styles from './aboutUs.module.css';

export const AboutUs = () => {
  const t = useTranslations('aboutUs');

  return (
    <div className={styles.aboutPageWrapper}>
      <h2 className={styles.aboutPageTitle}>{t('title')}</h2>
      <div className={styles.aboutCardsWrapper}>
        <AboutCard
          authorName={t('olga')}
          title={t('olgaTitle')}
          bio={t('olgaBio')}
          git="https://github.com/lokispirit"
          photo={'/photo_olga.jpg'}
        />
        <AboutCard
          authorName={t('alex')}
          title={t('alexTitle')}
          bio={t('alexBio')}
          git="https://github.com/oxygeniumo2"
          photo={'/photo_alex.jpg'}
        />
        <AboutCard
          authorName={t('sergey')}
          title={t('sergeyTitle')}
          bio={t('sergeyBio')}
          git="https://github.com/marakoris2022"
          photo={'/photo_sergey.jpg'}
        />
      </div>
    </div>
  );
};
