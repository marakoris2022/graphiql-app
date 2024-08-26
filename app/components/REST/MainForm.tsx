"use client";

import { EndpointURL } from "./components/EndpointURL";
import { SelectMethod } from "./components/SelectMethod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Headers } from "./components/Headers";
import { BodyEditor } from "./components/BodyEditor";
import { useRouter } from "next/navigation";
import { encodeBase64 } from "@/utils/utils";

export const MainForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    unregister,
    formState: { errors },
  } = useForm();

  const navigate = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    navigate.push(`/${data.method}/${encodeBase64(data.EndpointURL)}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectMethod register={register} />
      <EndpointURL register={register} />
      <Headers register={register} unregister={unregister} />
      <BodyEditor register={register} />
      <button type="submit">SEND</button>
    </form>
  );
};
