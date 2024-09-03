import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  FieldValues,
  UseFormRegister,
  UseFormUnregister,
} from "react-hook-form";

type HeadersProps = {
  register: UseFormRegister<FieldValues>;
  unregister: UseFormUnregister<FieldValues>;
};

export const Headers = ({ register, unregister }: HeadersProps) => {
  const params = useSearchParams();
  const arrayFromSearchParams = Array.from(params.keys());
  const paramsCount = arrayFromSearchParams.length;
  const t = useTranslations("rest");

  const [count, setCount] = useState<number[]>(
    Array.from({ length: paramsCount }, (_, i) => i)
  );

  function handleDelete(index: number) {
    unregister(`headerKey_${index}`);
    unregister(`headerValue_${index}`);
    setCount((prevCount) => prevCount.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div>
        <h5>{t("headers")}</h5>

        <button
          type="button"
          onClick={() => setCount((state) => [...state, state.length])}
        >
          {t("add")}
        </button>
      </div>

      {count.map((_, index) => {
        const key = arrayFromSearchParams[index];
        const value = key ? params.get(key) : "";

        return (
          <div key={index}>
            <input
              placeholder={t("key")}
              defaultValue={key || ""}
              {...register(`headerKey_${index}`)}
            ></input>

            <input
              placeholder={t("value")}
              defaultValue={value || ""}
              {...register(`headerValue_${index}`)}
            ></input>

            {index === count.length - 1 ? (
              <button type="button" onClick={() => handleDelete(index)}>
                {t("delete")}
              </button>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};
