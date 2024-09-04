import { usePathname, useSearchParams } from "next/navigation";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { ChangeEvent } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type SelectMethodProps = {
  register: UseFormRegister<FieldValues>;
};

enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  HEAD = "HEAD",
  CONNECT = "CONNECT",
  OPTIONS = "OPTIONS",
  TRACE = "TRACE",
}

export const SelectMethod = ({ register }: SelectMethodProps) => {
  const pathname = usePathname();
  const pathMethod = pathname.split("/")[1].toUpperCase();
  const searchParams = useSearchParams().toString();

  function handleChange(e: SelectChangeEvent<string>) {
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
    <FormControl sx={{ minWidth: "140px" }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        {...register("method")}
        onChange={handleChange}
        defaultValue={selectedMethod}
      >
        {Object.values(METHOD).map((method) => (
          <MenuItem key={method} value={method}>
            {method}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
