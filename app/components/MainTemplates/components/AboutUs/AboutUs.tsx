import { AboutCard } from './AboutCard/AboutCard';
import styles from './aboutUs.module.css';

export const AboutUs = () => {
  return (
    <div className={styles.aboutPageWrapper}>
      <h2 className={styles.aboutPageTitle}>About Us</h2>
      <div className={styles.aboutCardsWrapper}>
        <AboutCard
          authorName="Olga"
          title="Theoretical Master"
          bio="Intelligent and purposeful, Olga is our strategic thinker. She always thoroughly understands each issue before taking action, ensuring our solutions are well-informed and effective."
          git="https://github.com/lokispirit"
          photo={'/photo_olga.jpg'}
        />
        <AboutCard
          authorName="Alexandr"
          title="Anonymous Coder"
          bio="Modest and persistent, Alexander is our dedicated learner. He prefers to gain knowledge through hands-on experience, bringing a practical approach to our projects."
          git="https://github.com/oxygeniumo2"
          photo={'/photo_alex.jpg'}
        />
        <AboutCard
          authorName="Sergey"
          title="Not the most Important"
          bio="Confident and grounded, Sergey values everyone's input but stands firm on his convictions. His balanced approach ensures we stay true to our vision while considering all perspectives."
          git="https://github.com/marakoris2022"
          photo={'/photo_sergey.jpg'}
        />
      </div>
    </div>
  );
};
