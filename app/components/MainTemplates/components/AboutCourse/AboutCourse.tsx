import { Grid, Grid2 } from '@mui/material';
import styles from './aboutCourse.module.css';

export const AboutCourse = () => {
  return (
    <section className={styles.aboutCourseContainer}>
      <h3>About course</h3>
      <div>
        <h4>For everyone</h4>
        <p>
          Everyone can study at RS School, regardless of age, professional
          employment, or place of residence. However, you should have sufficient
          base knowledge before the program begins.
        </p>
      </div>
      <div>
        <h4>Free education</h4>
        <p>Feel the desire to share your experience and knowledge</p>
      </div>
      <div>
        <h4>Certificate</h4>
        <p>
          After successful completion of the course, students will receive an
          electronic certificate.
        </p>
      </div>
      <div>
        <h4>Materials</h4>
        <a href="">School documentation</a>
        <p>
          All materials are publicly available on the YouTube channel and GitHub
        </p>
      </div>
    </section>
  );
};
