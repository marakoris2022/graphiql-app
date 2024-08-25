"use client";
import { Button, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormUserData, validationSchema } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { toastifyMessage } from "@/utils/utils";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebase";
import { signInWithEmail } from "@/utils/firebaseConfig";

export const SignInForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmit = async (data: FormUserData) => {
    if (data.email && data.password) {
      try {
        await signInWithEmail(data.email, data.password);
        router.push("/");
        router.refresh();
        toast.success("You are successfully signed in!", toastifyMessage);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`${error.message}`, toastifyMessage);
        }
      }
    }
  };

  return (
    <div className="formContainer">
      <Button
        sx={{ width: "fit-content" }}
        variant="contained"
        onClick={() => router.push("/")}
      >
        To Main
      </Button>
      <h2>Sign In</h2>
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
          Sign In
        </Button>
      </form>
    </div>
  );
};
