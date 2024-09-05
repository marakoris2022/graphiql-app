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

const getVariablesFromLS = () => {
  try {
    const variablesStringFromLS = localStorage.getItem("RESTVariables");
    return variablesStringFromLS ? JSON.parse(variablesStringFromLS) : [];
  } catch (error) {
    console.error("Ошибка при получении данных из localStorage:", error);
    return [];
  }
};

export const Variables = () => {
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
          Variables
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
                    label="key"
                    id="outlined-size-small"
                    size="small"
                    defaultValue={variables[index][0] || ""}
                    onChange={(e) => handleChange(index, e.target.value, 0)}
                  />

                  <TextField
                    sx={{ width: "45%" }}
                    label="value"
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
              No any Variables. Press ADD button.
            </Typography>
          )}
        </AccordionDetails>
        <AccordionActions>
          <Button variant="contained" type="button" onClick={handleAdd}>
            Add
          </Button>
        </AccordionActions>
      </Accordion>
    </Box>
  );
};
