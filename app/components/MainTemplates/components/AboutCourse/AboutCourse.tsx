import styles from './aboutCourse.module.css';
import SchoolIcon from '@mui/icons-material/School';
import Groups2Icon from '@mui/icons-material/Groups2';
import TaskIcon from '@mui/icons-material/Task';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Icon } from '@mui/material';
import { useTranslations } from 'next-intl';

export const AboutCourse = () => {
  const t = useTranslations('aboutCourse');

  return (
    <section className={styles.aboutCourseContainer}>
      <h3>{t('title')}</h3>
      <div className={styles.cardsContainer}>
        <div className={styles.cardContainer}>
          <div className={styles.cardTitleContainer}>
            <h4>{t('everyoneTitle')}</h4>
            <Groups2Icon sx={{ color: '#04851a' }} />
          </div>
          <p>{t('everyoneDesc')}</p>
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.cardTitleContainer}>
            <h4>{t('educationTitle')}</h4>

            <SchoolIcon sx={{ color: '#04851a' }} />
          </div>
          <p>{t('educationDesc')}</p>
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.cardTitleContainer}>
            <h4>{t('certificateTitle')}</h4>
            <TaskIcon sx={{ color: '#04851a' }} />
          </div>
          <p>{t('certificateDesc')}</p>
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.cardTitleContainer}>
            <h4>{t('materialsTitle')}</h4>
            <AutoStoriesIcon sx={{ color: '#04851a' }} />
          </div>
          <a href="https://docs.rs.school/#/">{t('schoolDocs')}</a>
          <p>
            {t('materialsDesc')}
            <a href="https://www.youtube.com/@RollingScopesSchool">
              YouTube
            </a>{' '}
            {t('channel')} {t('and')}{' '}
            <a href="https://github.com/rolling-scopes-school">GitHub</a>
          </p>
        </div>
      </div>
    </section>
  );
};
