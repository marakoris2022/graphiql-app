"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import StreamIcon from "@mui/icons-material/Stream";
import Link from "next/link";

function EmptyHistory() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "30px 0px",
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: { lg: "4rem", md: "3rem", xs: "2rem" }, mb: "20px" }}
      >
        Request History
      </Typography>

      <Typography variant="body1">
        There are no requests in the history.
      </Typography>

      <Typography variant="body1">
        Please select a client and make your first request.
      </Typography>

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
    </Box>
  );
}

export default function History() {
  return (
    <Container>
      <EmptyHistory />
    </Container>
  );
}
