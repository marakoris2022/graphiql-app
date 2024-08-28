import styles from "./ResultBlock.module.css";

export const ResultBlock = ({
  responseData,
}: {
  responseData: typeof Object | string;
}) => {
  console.log("responseData type", typeof responseData);

  let resData = "";

  if (typeof responseData === "string") {
    resData = responseData;
  } else {
    resData = JSON.stringify(responseData, null, 2);
    // try {
    //   resData = JSON.stringify(
    //     JSON.parse(Object.keys(responseData)[0]),
    //     null,
    //     2
    //   );
    // } catch {
    //   console.error("Wrong data from server");
    // }
  }

  return (
    <div className={styles.resultWrapper}>
      <h1 className={styles.title}>Result:</h1>
      <textarea className={styles.textarea} value={resData} disabled />
    </div>
  );
};
