import { Box, Button } from "@mui/material";
import Link from "next/link";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import StreamIcon from "@mui/icons-material/Stream";

export default function HistoryLinks() {
  return (
    <Box
      sx={{
        padding: "30px 0px",
        display: "flex",
        flexDirection: { lg: "row", md: "row", xs: "column" },
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <Link href={"/GRAPHQL"}>
        <Button
          sx={{ color: "#e6009d" }}
          variant="outlined"
          startIcon={<StreamIcon />}
        >
          GraphQL Client
        </Button>
      </Link>

      <Link href={"/GET"}>
        <Button variant="outlined" startIcon={<SyncAltIcon />}>
          REST Client
        </Button>
      </Link>
    </Box>
  );
}
