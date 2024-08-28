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
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 9999,
        backgroundColor: "white",
      }}
    >
      <div style={{ fontSize: "25px" }}>Loading...</div>
      <CircularProgress />
    </Box>
  );
}
