import { usePathname, useSearchParams } from "next/navigation";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { ChangeEvent } from "react";

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
  const pathname = usePathname();
  const pathMethod = pathname.split("/")[1].toUpperCase();
  const searchParams = useSearchParams().toString();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const pathArray = pathname.split("/");
    pathArray[1] = e.target.value;
    let newPath = pathArray.join("/");
    if (searchParams) newPath = newPath + `?${searchParams}`;

    history.replaceState(null, "", newPath);
  }

  const selectedMethod = Object.values(METHOD).includes(pathMethod as METHOD)
    ? pathMethod
    : METHOD.GET;

  return (
    <div>
      <select
        {...register("method")}
        onChange={handleChange}
        defaultValue={selectedMethod}
      >
        <option value={METHOD.GET}>{METHOD.GET}</option>
        <option value={METHOD.POST}>{METHOD.POST}</option>
        <option value={METHOD.PUT}>{METHOD.PUT}</option>
        <option value={METHOD.PATCH}>{METHOD.PATCH}</option>
        <option value={METHOD.DELETE}>{METHOD.DELETE}</option>
      </select>
    </div>
  );
};
