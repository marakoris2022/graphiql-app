"use client";

import { EndpointURL } from "./components/EndpointURL";
import { SelectMethod } from "./components/SelectMethod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Headers } from "./components/Headers";
import { BodyEditor } from "./components/BodyEditor";
import { useRouter } from "next/navigation";
import { generateURL } from "@/app/[...rest]/utils";

import styles from "./MainForm.module.css";
import { useState } from "react";

export const MainForm = () => {
  const [urlError, setUrlError] = useState("");
  const [errorBody, setBodyError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    unregister,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.EndpointURL === "") {
      setUrlError("URL can't be empty.");
      return;
    }

    if (data.body !== "") {
      try {
        const parsedBody = JSON.parse(data.body); // Parse the JSON string
        console.log("Parsed body:", parsedBody);
        // Handle the parsed body as needed (send to API, etc.)
        data = { ...data, body: parsedBody };
      } catch {
        setBodyError("Невалидный JSON формат."); // Если текст не является JSON
        return;
      }
    }

    console.log("data", data);

    const generatedURL = generateURL(data);
    setUrlError("");
    navigate.push(generatedURL);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.topWrapper}>
        <SelectMethod register={register} />
        <EndpointURL register={register} />
        <button
          {...register("submit")}
          className={styles.sendBtn}
          type="submit"
        >
          SEND
        </button>
      </div>
      <p className={styles.error}>{urlError}</p>
      <Headers register={register} unregister={unregister} />
      <BodyEditor
        errorBody={errorBody}
        setBodyError={setBodyError}
        setValue={setValue}
        register={register}
      />
    </form>
  );
};
