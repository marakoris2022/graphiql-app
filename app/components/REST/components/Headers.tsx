import { useState } from "react";
import {
  FieldValues,
  UseFormRegister,
  UseFormUnregister,
  useForm,
} from "react-hook-form";

type HeadersProps = {
  register: UseFormRegister<FieldValues>;
  unregister: UseFormUnregister<FieldValues>;
};

export const Headers = ({ register, unregister }: HeadersProps) => {
  const [count, setCount] = useState<number[]>([]);

  function handleDelete(index: number) {
    // Удаляем поля с помощью unregister
    unregister(`headerKey_${index}`);
    unregister(`headerValue_${index}`);

    // Обновляем массив count
    setCount((prevCount) => prevCount.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div>
        <h5>Headers:</h5>
        <button
          type="button"
          onClick={() => setCount((state) => [...state, state.length])}
        >
          Add
        </button>
      </div>
      {count.map((item, index) => {
        return (
          <div key={index}>
            <input
              placeholder="key"
              {...register(`headerKey_${index}`)}
            ></input>
            <input
              placeholder="value"
              {...register(`headerValue_${index}`)}
            ></input>

            {index === count.length - 1 ? (
              <button type="button" onClick={() => handleDelete(index)}>
                Del
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
