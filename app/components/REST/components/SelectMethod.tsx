import { Dispatch, SetStateAction } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type SelectMethodProps = {
  register: UseFormRegister<FieldValues>;
};

enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const SelectMethod = ({ register }: SelectMethodProps) => {
  return (
    <div>
      <select {...register("method")}>
        <option value={METHOD.GET}>{METHOD.GET}</option>
        <option value={METHOD.POST}>{METHOD.POST}</option>
        <option value={METHOD.PUT}>{METHOD.PUT}</option>
        <option value={METHOD.PATCH}>{METHOD.PATCH}</option>
        <option value={METHOD.DELETE}>{METHOD.DELETE}</option>
      </select>
    </div>
  );
};
