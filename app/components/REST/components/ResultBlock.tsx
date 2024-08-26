import styles from "./ResultBlock.module.css";

export const ResultBlock = ({
  responseData,
}: {
  responseData: typeof Object;
}) => {
  return (
    <div className={styles.resultWrapper}>
      <h1 className={styles.title}>Result:</h1>
      <textarea
        className={styles.textarea}
        value={JSON.stringify(responseData, null, 2)}
        disabled
      />
    </div>
  );
};
