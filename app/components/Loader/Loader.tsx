import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <div style={{ fontSize: "25px" }}>Loading...</div>
      <CircularProgress />
    </Box>
  );
}
