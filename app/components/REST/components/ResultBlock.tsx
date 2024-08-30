import styles from "./ResultBlock.module.css";

export const ResultBlock = ({
  responseData,
}: {
  responseData: typeof Object | string;
}) => {
  let resData = "";

  if (typeof responseData === "string") {
    resData = responseData;
  } else {
    resData = JSON.stringify(responseData, null, 2);
  }

  return (
    <div className={styles.resultWrapper}>
      <h1 className={styles.title}>Result:</h1>
      <textarea className={styles.textarea} value={resData} disabled />
    </div>
  );
};
