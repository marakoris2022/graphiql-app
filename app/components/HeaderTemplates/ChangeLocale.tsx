"use client";
import { ChangeEventHandler } from "react";
import { switchLocaleAction } from "../../../actions/switch-locale";

export default function ChangeLocale({ locale }: { locale: string }) {
  const handleLocaleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    switchLocaleAction(event.target.value);
  };

  return (
    <div>
      <select onChange={handleLocaleChange} value={locale}>
        <option value="en">🇺🇸 English</option>
        <option value="ru">RU</option>
      </select>
    </div>
  );
}
