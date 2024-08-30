import { usePathname } from "next/navigation";
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
  const pathMethod = usePathname().split("/")[1].toUpperCase();

  const selectedMethod = Object.values(METHOD).includes(pathMethod as METHOD)
    ? pathMethod
    : METHOD.GET;

  return (
    <div>
      <select {...register("method")} defaultValue={selectedMethod}>
        <option value={METHOD.GET}>{METHOD.GET}</option>
        <option value={METHOD.POST}>{METHOD.POST}</option>
        <option value={METHOD.PUT}>{METHOD.PUT}</option>
        <option value={METHOD.PATCH}>{METHOD.PATCH}</option>
        <option value={METHOD.DELETE}>{METHOD.DELETE}</option>
      </select>
    </div>
  );
};
