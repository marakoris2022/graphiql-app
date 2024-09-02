import { FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./EndpointURL.module.css";
import { usePathname } from "next/navigation";
import { decodeBase64 } from "@/app/[...rest]/utils";
import { useTranslation } from "@/i18n/client";

type EndpointURLProps = {
  register: UseFormRegister<FieldValues>;
};

export const EndpointURL = ({ register }: EndpointURLProps) => {
  const url = usePathname().split("/")[2];
  const decodedUrl = url ? decodeBase64(decodeURIComponent(url)) : "";
  const { t } = useTranslation("rest");

  return (
    <div className={styles.wrapper}>
      <input
        defaultValue={decodedUrl}
        className={styles.input}
        {...register("EndpointURL")}
        placeholder={t("urlPlaceholder")}
      ></input>
    </div>
  );
};
