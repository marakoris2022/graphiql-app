"use client";

import { EndpointURL } from "./components/EndpointURL";
import { SelectMethod } from "./components/SelectMethod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Headers } from "./components/Headers";
import { BodyEditor } from "./components/BodyEditor";
import { useRouter } from "next/navigation";
import { generateURL } from "@/app/[...rest]/utils";
import SendIcon from "@mui/icons-material/Send";

import styles from "./MainForm.module.css";
import { useEffect, useState } from "react";
import { Variables } from "./components/Variables";
import { Box, Button, colors, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export const MainForm = () => {
  const t = useTranslations("apiClient");

  const [urlError, setUrlError] = useState("");
  const [errorBody, setBodyError] = useState("");

  const {
    register,
    handleSubmit,
    unregister,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useRouter();

  useEffect(() => {
    if (urlError) {
      setUrlError(t("errEmptyUrl"));
    }
    if (errorBody) {
      setBodyError(t("errInvalidJson"));
    }
  }, [t]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.EndpointURL === "") {
      setUrlError(t("errEmptyUrl"));
      return;
    }

    const generatedURL = generateURL(data);
    setUrlError("");
    navigate.push(generatedURL);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          flexDirection: { lg: "row", md: "column", xs: "column" },
        }}
      >
        <SelectMethod register={register} />

        <EndpointURL register={register} />

        <Button
          sx={{ minWidth: "fit-content" }}
          {...register("submit")}
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
        >
          {t("send")}
        </Button>
      </Box>

      <Typography sx={{ color: "red", textAlign: "center", fontSize: "14px" }}>
        {Boolean(urlError) ? urlError : ""}
      </Typography>

      <Headers register={register} unregister={unregister} />

      <Variables />

      <BodyEditor
        errorBody={errorBody}
        setBodyError={setBodyError}
        setValue={setValue}
        register={register}
      />
    </form>
  );
};
