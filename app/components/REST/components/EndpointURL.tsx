import { FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./EndpointURL.module.css";
import { usePathname } from "next/navigation";
import { decodeBase64 } from "@/app/[...rest]/utils";

type EndpointURLProps = {
  register: UseFormRegister<FieldValues>;
};

export const EndpointURL = ({ register }: EndpointURLProps) => {
  const url = usePathname().split("/")[2]; // Extract and capitalize path method
  const decodedUrl =
    url === "_blank" ? "" : decodeBase64(decodeURIComponent(url));

  return (
    <div className={styles.wrapper}>
      <input
        defaultValue={decodedUrl}
        className={styles.input}
        {...register("EndpointURL")}
        placeholder="Endpoint URL"
      ></input>
    </div>
  );
};
