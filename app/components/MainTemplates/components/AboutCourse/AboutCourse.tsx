import styles from './aboutCourse.module.css';
import SchoolIcon from '@mui/icons-material/School';
import Groups2Icon from '@mui/icons-material/Groups2';
import TaskIcon from '@mui/icons-material/Task';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Icon } from '@mui/material';

export const AboutCourse = () => {
  return (
    <section className={styles.aboutCourseContainer}>
      <h3>About course</h3>
      <div className={styles.cardContainer}>
        <div className={styles.cardTitleContainer}>
          <h4>For everyone</h4>
          <Groups2Icon sx={{ color: '#04851a' }} />
        </div>
        <p>
          Everyone can study at RS School, regardless of age, professional
          employment, or place of residence. However, you should have sufficient
          base knowledge before the program begins.
        </p>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardTitleContainer}>
          <h4>Free education</h4>

          <SchoolIcon sx={{ color: '#04851a' }} />
        </div>
        <p>Feel the desire to share your experience and knowledge.</p>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardTitleContainer}>
          <h4>Certificate</h4>
          <TaskIcon sx={{ color: '#04851a' }} />
        </div>
        <p>
          After successful completion of the course, students will receive an
          electronic certificate.
        </p>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardTitleContainer}>
          <h4>Materials</h4>
          <AutoStoriesIcon sx={{ color: '#04851a' }} />
        </div>
        <a href="https://docs.rs.school/#/">School documentation</a>
        <p>
          All materials are publicly available on the{' '}
          <a href="https://www.youtube.com/@RollingScopesSchool">YouTube</a>{' '}
          channel and{' '}
          <a href="https://github.com/rolling-scopes-school">GitHub</a>
        </p>
      </div>
    </section>
  );
};
