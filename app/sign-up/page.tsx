"use client";
import { registerUser } from "@/utils/firebaseConfig";
import { FormUserData, validationSchema } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useUserStore from "../store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { toastifyMessage } from "@/utils/utils";

export default function SignUp() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    context: { isRegistration: true },
  });

  const user = useUserStore((state) => state.user);
  const setIsFirstAuthCheck = useUserStore(
    (state) => state.setIsFirstAuthCheck
  );
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const onSubmit = async (data: FormUserData) => {
    if (data.email && data.password && data.name) {
      try {
        await registerUser(data.email, data.password, data.name);
        setIsFirstAuthCheck(false);
        router.push("/");
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
      <Button
        sx={{ width: "fit-content" }}
        variant="contained"
        onClick={() => router.push("/")}
      >
        To Main
      </Button>
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
          disabled={Object.entries(errors).length > 0}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}
