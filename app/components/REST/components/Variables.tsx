import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const getVariablesFromLS = () => {
  try {
    const variablesStringFromLS = localStorage.getItem("RESTVariables");
    return variablesStringFromLS ? JSON.parse(variablesStringFromLS) : [];
  } catch (error) {
    return [];
  }
};

export const Variables = () => {
  const t = useTranslations("apiClient");

  const [variables, setVariables] = useState<string[][]>([]);
  const [didMount, setDidMount] = useState(false);

  function handleDelete(indexToDelete: number) {
    setVariables((prevState) => {
      return prevState.filter((_, index) => index !== indexToDelete);
    });
  }

  function handleAdd() {
    setVariables((state) => [...state, ["", ""]]);
  }

  function handleChange(index: number, value: string, cell: number) {
    setVariables((prevState) => {
      const newState = [...prevState];
      newState[index][cell] = value;
      return newState;
    });
  }

  useEffect(() => {
    setVariables(getVariablesFromLS);
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      localStorage.setItem("RESTVariables", JSON.stringify(variables));
    }
  }, [didMount, variables]);

  return (
    <Box>
      <Accordion sx={{ "&:hover": { backgroundColor: "#ECECEC" } }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          {t("variables")}
        </AccordionSummary>
        <AccordionDetails>
          {variables.length > 0 ? (
            variables.map((_, index) => {
              return (
                <Box
                  sx={{ display: "flex", gap: "10px", mb: "5px" }}
                  key={index}
                >
                  <TextField
                    sx={{ width: "45%" }}
                    label={t("key")}
                    id="outlined-size-small"
                    size="small"
                    defaultValue={variables[index][0] || ""}
                    onChange={(e) => handleChange(index, e.target.value, 0)}
                  />

                  <TextField
                    sx={{ width: "45%" }}
                    label={t("value")}
                    id="outlined-size-small"
                    size="small"
                    defaultValue={variables[index][1] || ""}
                    onChange={(e) => handleChange(index, e.target.value, 1)}
                  />

                  <IconButton
                    onClick={() => handleDelete(index)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              );
            })
          ) : (
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {t("emptyVariables")}
            </Typography>
          )}
        </AccordionDetails>
        <AccordionActions>
          <Button variant="contained" type="button" onClick={handleAdd}>
            {t("add")}
          </Button>
        </AccordionActions>
      </Accordion>
    </Box>
  );
};
