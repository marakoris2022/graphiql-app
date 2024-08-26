import { FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./EndpointURL.module.css";

type EndpointURLProps = {
  register: UseFormRegister<FieldValues>;
};

export const EndpointURL = ({ register }: EndpointURLProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        {...register("EndpointURL")}
        placeholder="Endpoint URL"
      ></input>
    </div>
  );
};
