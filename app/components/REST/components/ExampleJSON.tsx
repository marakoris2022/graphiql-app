import { Box, Typography } from "@mui/material";

const TypographyStyle = {
  display: "inline",
  color: "gray",
  textAlign: "center",
  fontSize: "12px",
  mb: "10px",
};

export default function ExampleJSON() {
  return (
    <Box sx={{ width: "100%", textAlign: "center", mb: "10px" }}>
      <Typography sx={TypographyStyle}>Пример:</Typography>
      <Typography
        sx={{
          ...TypographyStyle,
          "&:hover": {
            color: "black",
          },
        }}
      >
        {`{ "name": "pikachu", "count": {{variableName}} }`}
      </Typography>
    </Box>
  );
}
