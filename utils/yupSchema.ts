import { object, string } from "yup";

export interface FormUserData {
  email?: string;
  password?: string;
  name?: string;
}

export const createValidationSchema = (t: (key: string) => string) =>
  object({
    email: string().matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      t("invalidEmail")
    ),
    password: string().test("complexity", function (value) {
      const { path, createError } = this;

      if (!value) {
        return createError({
          path,
          message: t("passwordRequired"),
        });
      }

      if (!/\p{L}/u.test(value)) {
        return createError({
          path,
          message: t("passwordOneLetter"),
        });
      }

      if (!/[0-9]/.test(value)) {
        return createError({
          path,
          message: t("passwordNumber"),
        });
      }

      if (!/[!@#$%^&*]/.test(value)) {
        return createError({
          path,
          message: t("passwordSpecialCharacter"),
        });
      }

      if (value.length < 8) {
        return createError({
          path,
          message: t("passwordLength"),
        });
      }

      return true;
    }),
    name: string().when("$isRegistration", {
      is: true,
      then: (schema) => schema.required(t("nameRequired")),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
