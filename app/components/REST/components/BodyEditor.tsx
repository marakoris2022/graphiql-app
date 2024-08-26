import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import { useState } from "react";

type BodyEditorProps = {
  register: UseFormRegister<FieldValues>;
};

export const BodyEditor = ({ register }: BodyEditorProps) => {
  const [body, setBody] = useState<string>("");
  const [error, setError] = useState("");

  // Функция для форматирования JSON текста
  const formatJson = () => {
    try {
      const parsed = JSON.parse(body); // Парсинг строки в объект
      const formatted = JSON.stringify(parsed, null, 2); // Форматирование с отступами
      setBody(formatted); // Обновление содержимого
      setError("");
    } catch (error) {
      setError("Невалидный JSON формат."); // Если текст не является JSON
    }
  };

  return (
    <div>
      <p>Пример: {JSON.stringify({ name: "pikachu" })}</p>
      <textarea
        {...register("body")}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={10}
        cols={50}
        placeholder="Введите JSON"
      ></textarea>
      <div>
        <button type="button" onClick={formatJson}>
          FORMAT
        </button>
        {error ?? <span>{error}</span>}
      </div>
    </div>
  );
};
