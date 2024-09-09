import { FC, useEffect, useState } from "react";
import styles from "./headers.module.css";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { usePathname, useSearchParams } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";

type HeadersProps = {};

const Headers: FC<HeadersProps> = ({}) => {
  const t = useTranslations("apiClient");

  const search = useSearchParams();

  const [headers, setHeaders] = useState(() => {
    if (!search.toString()) return [{ key: "", value: "" }];
    const arr = [];

    const keys = [...search.keys()];

    for (const key of keys) {
      const value = search.get(key);
      if (value) {
        arr.push({ key, value });
      }
    }
    return arr;
  });

  const [showHeaders, setShowHeaders] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams();
    headers.forEach((header) => {
      if (header.key && header.value) {
        params.set(
          encodeURIComponent(header.key),
          encodeURIComponent(header.value)
        );
      }
    });
    const pewPath = pathname + "?" + params.toString();
    history.replaceState(null, "", pewPath);
  }, [headers]);

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const deleteHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const handleHeaderChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const modified = [...headers];
    modified[index][field] = value;
    setHeaders(modified);
  };

  return (
    <div className={styles.headersContainer}>
      <div className={styles.headersTitleBlock}>
        <Button
          variant="text"
          type="button"
          onClick={() => setShowHeaders((prev) => !prev)}
          size="small"
          sx={{
            color: "grey",
            border: "1px solid grey",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "20px",
            height: "20px",
            minWidth: "20px",
            padding: 0,
            marginRight: "10px",
          }}
        >
          {showHeaders ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </Button>
        <h3>{t("graphHeaders")}</h3>
      </div>
      {showHeaders && (
        <fieldset>
          {headers.map((header, index) => (
            <div className={styles.headerWrapper} key={index}>
              <TextField
                label={`${t("keyUpper")}:`}
                variant="outlined"
                name="headerKey"
                id={`headerKey${index}`}
                value={header.key}
                onChange={(e) =>
                  handleHeaderChange(index, "key", e.target.value)
                }
                sx={{ flex: "1" }}
              />
              <TextField
                label={`${t("valueUpper")}:`}
                variant="outlined"
                name="headerValue"
                id={`headerValue${index}`}
                value={header.value}
                onChange={(e) =>
                  handleHeaderChange(index, "value", e.target.value)
                }
                sx={{ flex: "1" }}
              />
              <Button
                variant="text"
                size="small"
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "30%",
                  color: "grey",
                  border: "1px solid grey",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "20px",
                  height: "20px",
                  minWidth: "20px",
                  padding: 0,
                  marginRight: "10px",
                }}
                type="button"
                onClick={() => deleteHeader(index)}
              >
                <IoMdClose />
              </Button>
            </div>
          ))}
          <Button
            size="small"
            sx={{ color: "white", background: "grey" }}
            variant="contained"
            color="primary"
            type="button"
            onClick={addHeader}
          >
            {t("addHeader")}
          </Button>
        </fieldset>
      )}
    </div>
  );
};

export default Headers;
