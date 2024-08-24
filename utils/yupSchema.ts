import { object, string } from "yup";

export interface FormUserData {
  email?: string;
  password?: string;
  name?: string;
}

export const validationSchema = object({
  email: string().matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    "Invalid email format"
  ),
  password: string().test("complexity", function (value) {
    const { path, createError } = this;

    if (!value) {
      return createError({
        path,
        message: "Password is required",
      });
    }

    if (!/[a-zA-Z]/.test(value)) {
      return createError({
        path,
        message: "Password must contain at least 1 letter (a-z or A-Z)",
      });
    }

    if (!/[0-9]/.test(value)) {
      return createError({
        path,
        message: "Password must contain at least 1 number",
      });
    }

    if (!/[!@#$%^&*]/.test(value)) {
      return createError({
        path,
        message: "Password must contain at least 1 special character",
      });
    }

    if (value.length < 8) {
      return createError({
        path,
        message: "Password must be at least 8 characters",
      });
    }

    return true;
  }),
  name: string().when("$isRegistration", {
    is: true,
    then: (schema) => schema.required("Name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
