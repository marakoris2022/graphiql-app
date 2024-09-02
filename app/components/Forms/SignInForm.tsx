"use client";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { createValidationSchema, FormUserData } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { RoutePath, toastifyMessage } from "@/utils/utils";
import { signInWithEmail } from "@/utils/firebaseApi";
import Loader from "../Loader/Loader";
import { CustomLink } from "../CustomLink/CustomLink";
import { useTranslation } from "@/i18n/client";
import { useEffect } from "react";

export const SignInForm = () => {
  const { t, i18n } = useTranslation("signIn");
  const validationSchema = createValidationSchema(t);

  console.log(t("title"));

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {},
  });

  const router = useRouter();

  useEffect(() => {
    const changeLanguage = async () => {
      await i18n.changeLanguage(i18n.resolvedLanguage);
    };

    changeLanguage().then(() => {
      const errorFields = Object.keys(errors) as Array<keyof FormUserData>;
      if (errorFields.length > 0) {
        trigger(errorFields);
      }
    });
  }, [i18n.resolvedLanguage]);
  const onSubmit = async (data: FormUserData) => {
    if (data.email && data.password) {
      try {
        await signInWithEmail(data.email, data.password);
        router.push(RoutePath.HOME);
        router.refresh();
        toast.success(t("toastMsg"), toastifyMessage);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`${error.message}`, toastifyMessage);
        }
      }
    }
  };

  return (
    <div className="formContainer">
      <CustomLink href={"/"} title={t("main")} />
      <h2>{t("title")}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="formUser">
        <div className="formField">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label={t("email")}
                type="email"
                {...field}
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            )}
          ></Controller>
        </div>
        <div className="formField">
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label={t("password")}
                type="password"
                {...field}
                autoComplete="password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            )}
          ></Controller>
        </div>

        <Button
          type="submit"
          variant="contained"
          sx={{ width: "fit-content" }}
          disabled={Object.entries(errors).length > 0 || isSubmitting}
        >
          {t("signIn")}
        </Button>
      </form>
      {isSubmitting && <Loader />}
    </div>
  );
};
