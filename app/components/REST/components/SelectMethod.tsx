import { Dispatch, SetStateAction } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type SelectMethodProps = {
  register: UseFormRegister<FieldValues>;
};

export const SelectMethod = ({ register }: SelectMethodProps) => {
  return (
    <div>
      <select {...register("method")}>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="PATCH">PATCH</option>
        <option value="DELETE">DELETE</option>
      </select>
    </div>
  );
};
