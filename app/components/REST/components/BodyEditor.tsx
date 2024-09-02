import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./BodyEditor.module.css";
import { usePathname } from "next/navigation";
import {
  decodeBase64,
  encodeBase64,
  replaceVariables,
  stringToJSONString,
} from "@/app/[...rest]/utils";
import { useTranslation } from "@/i18n/client";

type BodyEditorProps = {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errorBody: string;
  setBodyError: Dispatch<SetStateAction<string>>;
};

export const BodyEditor = ({
  register,
  setValue,
  errorBody,
  setBodyError,
}: BodyEditorProps) => {
  const [body, setBody] = useState<string>("");
  const { t } = useTranslation("rest");

  const bodyFromUrl = usePathname().split("/")[3];

  useEffect(() => {
    if (bodyFromUrl) {
      const decodedBodyFromUrl = decodeBase64(decodeURIComponent(bodyFromUrl));
      setBody(decodedBodyFromUrl);
      setValue("body", decodedBodyFromUrl);
    }
  }, [bodyFromUrl]);

  const formatJson = () => {
    const variables = JSON.parse(localStorage.getItem("RESTVariables") ?? "");
    const replacedString = replaceVariables(body, variables);

    const JSONString = stringToJSONString(replacedString);

    if (!JSONString) {
      setBodyError(t("errInvalidJson"));
      return;
    }

    setBody(replacedString);
    setValue("body", replacedString);
    setBodyError("");
    return;
  };

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>{t("body")}</h5>
      <p className={styles.example}>{t("example")}</p>
      <textarea
        className={styles.textarea}
        {...register("body")}
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
        rows={10}
        cols={50}
        placeholder={t("bodyPlaceholder")}
      ></textarea>
      <div className={styles.formatWrapper}>
        <button className={styles.formatBtn} type="button" onClick={formatJson}>
          {t("format")}
        </button>
        <span className={styles.errorSpan}>{errorBody ?? ""}</span>
      </div>
    </div>
  );
};
