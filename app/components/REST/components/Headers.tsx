import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  FieldValues,
  UseFormRegister,
  UseFormUnregister,
} from "react-hook-form";

type HeadersProps = {
  register: UseFormRegister<FieldValues>;
  unregister: UseFormUnregister<FieldValues>;
};

export const Headers = ({ register, unregister }: HeadersProps) => {
  const params = useSearchParams();
  const arrayFromSearchParams = Array.from(params.keys());
  const paramsCount = arrayFromSearchParams.length;

  const [count, setCount] = useState<number[]>(
    Array.from({ length: paramsCount }, (_, i) => i)
  );

  function handleDelete(index: number) {
    unregister(`headerKey_${index}`);
    unregister(`headerValue_${index}`);
    setCount((prevCount) => prevCount.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            Headers
          </AccordionSummary>
          <AccordionDetails>
            {count.length > 0 ? (
              count.map((_, index) => {
                const key = arrayFromSearchParams[index];
                const value = key ? params.get(key) : "";

                return (
                  <div key={index}>
                    <TextField
                      label="key"
                      id="outlined-size-small"
                      size="small"
                      defaultValue={key || ""}
                      {...register(`headerKey_${index}`)}
                    />
                    <TextField
                      label="value"
                      id="outlined-size-small"
                      size="small"
                      defaultValue={value || ""}
                      {...register(`headerValue_${index}`)}
                    />

                    {index === count.length - 1 ? (
                      <IconButton
                        onClick={() => handleDelete(index)}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })
            ) : (
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                No any Headers. Press ADD button.
              </Typography>
            )}
          </AccordionDetails>
          <AccordionActions>
            <Button
              variant="contained"
              type="button"
              onClick={() => setCount((state) => [...state, state.length])}
            >
              Add
            </Button>
          </AccordionActions>
        </Accordion>
      </div>
    </div>
  );
};
