import { usePathname, useSearchParams } from "next/navigation";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  FormControl,
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
  const searchParams = useSearchParams().toString();

  const pathMethod = pathname.split("/")[1].toUpperCase();

  const [selectedMethod, setSelectedMethod] = useState(
    Object.values(METHOD).includes(pathMethod as METHOD)
      ? pathMethod
      : METHOD.GET
  );

  const handleChange = (e: SelectChangeEvent<string>) => {
    const newMethod = e.target.value;
    setSelectedMethod(newMethod);

    const pathArray = pathname.split("/");
    pathArray[1] = newMethod;
    let newPath = pathArray.join("/");
    if (searchParams) {
      newPath = `${newPath}?${searchParams}`;
    }

    history.replaceState(null, "", newPath);
  };

  useEffect(() => {
    setSelectedMethod(
      Object.values(METHOD).includes(pathMethod as METHOD)
        ? pathMethod
        : METHOD.GET
    );
  }, [pathname]);

  return (
    <FormControl sx={{ minWidth: "140px" }}>
      <Select
        labelId="method-select-label"
        id="method-select"
        {...register("method")}
        value={selectedMethod}
        onChange={handleChange}
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
