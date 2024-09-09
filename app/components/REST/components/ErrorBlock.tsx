import styles from './ErrorBlock.module.css';

export const ErrorBlock = ({ errorText }: { errorText: string }) => {
  if (!errorText) return <></>;

  return (
    <div className={styles.errorWrapper}>
      <h1 className={styles.title}>Error:</h1>
      <textarea className={styles.textarea} value={errorText} disabled />
    </div>
  );
};
