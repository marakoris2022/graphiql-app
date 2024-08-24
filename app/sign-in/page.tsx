"use client";
import { Button, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormUserData, validationSchema } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmail } from "@/utils/firebaseConfig";
import useUserStore from "../store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { toastifyMessage } from "@/utils/utils";

export default function SignIn() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const onSubmit = async (data: FormUserData) => {
    if (data.email && data.password) {
      try {
        await signInWithEmail(data.email, data.password);
        toast.success("Sign in success", toastifyMessage);
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
          disabled={Object.entries(errors).length > 0}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
