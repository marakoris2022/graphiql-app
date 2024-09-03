import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import {
  Dispatch,
  FocusEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styles from "./BodyEditor.module.css";
import { usePathname, useSearchParams } from "next/navigation";
import {
  decodeBase64,
  encodeBase64,
  replaceVariables,
  stringToJSONString,
} from "@/app/[...rest]/utils";

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
  const pathname = usePathname();
  const bodyFromUrl = pathname.split("/")[3];
  const searchParams = useSearchParams().toString();

  function handleBlur(e: FocusEvent<HTMLTextAreaElement, Element>) {
    const pathArray = pathname.split("/");
    console.log("pathArray", pathArray);

    if (!pathArray[2]) pathArray[2] = "";

    pathArray[3] = encodeBase64(e.target.value);
    let newPath = pathArray.join("/");
    if (searchParams) newPath = newPath + `?${searchParams}`;

    history.replaceState(null, "", newPath);
  }

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
      setBodyError("Невалидный JSON формат.");
      return;
    }

    setBody(JSONString);
    setValue("body", JSONString);
    setBodyError("");
    return;
  };

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>Body:</h5>
      <p className={styles.example}>
        Пример: {`{ "name": "pikachu", "count": {{variableName}} }`}
      </p>
      <textarea
        className={styles.textarea}
        {...register("body")}
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
        onBlur={handleBlur}
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
