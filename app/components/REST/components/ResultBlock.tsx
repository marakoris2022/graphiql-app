import { Box, Typography, TextField } from "@mui/material";

export const ResultBlock = ({
  title,
  responseData,
  statusCode,
}: {
  title: string;
  responseData: string;
  statusCode: string;
}) => {
  return (
    <Box sx={{ paddingBottom: "10px" }} width={"100%"}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>

      {Boolean(statusCode) && (
        <Typography sx={{ mb: "20px" }} variant="body1">
          Status Code: {statusCode}
        </Typography>
      )}

      <TextField
        fullWidth
        multiline
        rows={18}
        value={responseData}
        disabled
        variant="outlined"
        label="Response Data"
      />
    </Box>
  );
};
