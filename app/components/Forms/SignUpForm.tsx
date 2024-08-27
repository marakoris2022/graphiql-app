"use client";
import { signInWithEmail } from "@/utils/firebaseApi";
import { FormUserData, validationSchema } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { toastifyMessage } from "@/utils/utils";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { app } from "@/firebase";
import Loader from "../Loader/Loader";
import { CustomLink } from "../CustomLink/CustomLink";

export const SignUpForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    context: { isRegistration: true },
  });

  const router = useRouter();

  const onSubmit = async (data: FormUserData) => {
    if (data.email && data.password && data.name) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          getAuth(app),
          data.email,
          data.password
        );
        const user = userCredential.user;
        await updateProfile(user, { displayName: data.name });
        await signInWithEmail(data.email, data.password);
        router.push("/");
        router.refresh();
        toast.success("You are successfully signed up!", toastifyMessage);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`${error.message}`, toastifyMessage);
        }
      }
    }
  };

  return (
    <div className="formContainer">
      <CustomLink href={"/"} title={"To Main"} />
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="formUser">
        <div className="formField">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="E-mail"
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
                label="Password"
                {...field}
                type="password"
                autoComplete="password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            )}
          ></Controller>
        </div>

        <div className="formField">
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Your name"
                {...field}
                type="text"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
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
          Sign Up
        </Button>
      </form>
      {isSubmitting && <Loader />}
    </div>
  );
};
