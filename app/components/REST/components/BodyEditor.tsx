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
import { Box, Button, TextField, Typography } from "@mui/material";
import ExampleJSON from "./ExampleJSON";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("apiClient");

  const [body, setBody] = useState<string>("");
  const pathname = usePathname();
  const bodyFromUrl = pathname.split("/")[3];
  const searchParams = useSearchParams().toString();

  function handleBlur(e: FocusEvent<HTMLTextAreaElement, Element>) {
    const pathArray = pathname.split("/");

    if (!pathArray[2]) pathArray[2] = "";

    pathArray[3] = encodeURIComponent(encodeBase64(e.target.value));
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
      setBodyError(t("errInvalidJson"));
      return;
    }

    setBody(JSONString);
    setValue("body", JSONString);
    setBodyError("");
    return;
  };

  return (
    <div className={styles.wrapper}>
      <ExampleJSON />

      <TextField
        {...register("body")}
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
        onBlur={handleBlur}
        fullWidth={true}
        id="outlined-multiline-static"
        placeholder={t("bodyPlaceholder")}
        label={t("requestBody")}
        multiline
        rows={10}
      />

      <div className={styles.formatWrapper}>
        <Button
          sx={{ width: "100%" }}
          onClick={formatJson}
          variant="outlined"
          color="primary"
        >
          {t("format")}
        </Button>

        <Typography
          sx={{ color: "red", textAlign: "center", fontSize: "14px" }}
        >
          {Boolean(errorBody) ? errorBody : ""}
        </Typography>
      </div>
    </div>
  );
};
