import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./BodyEditor.module.css";
import { usePathname } from "next/navigation";
import { decodeBase64, encodeBase64 } from "@/app/[...rest]/utils";

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

  const bodyFromUrl = usePathname().split("/")[3];

  useEffect(() => {
    if (bodyFromUrl) {
      const decodedBodyFromUrl = decodeBase64(decodeURIComponent(bodyFromUrl));
      setBody(decodedBodyFromUrl);
      setValue("body", decodedBodyFromUrl);
    }
  }, [bodyFromUrl]);

  const formatJson = () => {
    try {
      let formattedInput = body.replace(/'/g, '"');

      formattedInput = formattedInput.replace(/(\w+)\s*:/g, '"$1":');

      formattedInput = formattedInput.replace(/,\s*([\]}])/g, "$1");

      const parsedObject = JSON.parse(formattedInput);

      const jsonString = JSON.stringify(parsedObject, null, 2);

      setBody(jsonString);
      setValue("body", jsonString);
      setBodyError("");
    } catch (error) {
      setBodyError("Невалидный JSON формат.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>Body:</h5>
      <p className={styles.example}>
        Пример: {JSON.stringify({ name: "pikachu" })}
      </p>
      <textarea
        className={styles.textarea}
        {...register("body")}
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
        rows={10}
        cols={50}
        placeholder="Введите JSON"
      ></textarea>
      <div className={styles.formatWrapper}>
        <button className={styles.formatBtn} type="button" onClick={formatJson}>
          FORMAT
        </button>
        <span className={styles.errorSpan}>{errorBody ?? ""}</span>
      </div>
    </div>
  );
};
