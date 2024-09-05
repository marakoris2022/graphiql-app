import { Typography } from "@mui/material";

export default function EmptyHistory() {
  return (
    <>
      <Typography variant="body1">
        There are no requests in the history.
      </Typography>
      <Typography variant="body1">
        Please select a client and make your first request.
      </Typography>
    </>
  );
}
