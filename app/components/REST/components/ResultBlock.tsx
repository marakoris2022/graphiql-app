import { Box, Typography, TextField } from "@mui/material";
import { useTranslations } from "next-intl";

export const ResultBlock = ({
  title,
  responseData,
  statusCode,
}: {
  title: string;
  responseData: string;
  statusCode: string;
}) => {
  const t = useTranslations("apiClient");

  return (
    <Box sx={{ paddingBottom: "10px" }} width={"100%"}>
      <Typography variant="h4" gutterBottom>
        {t(title)}
      </Typography>

      {Boolean(statusCode) && (
        <Typography sx={{ mb: "20px" }} variant="body1">
          {t("statusCode")} {statusCode}
        </Typography>
      )}

      <TextField
        fullWidth
        multiline
        rows={18}
        value={responseData}
        disabled
        variant="outlined"
        label={t("responseData")}
      />
    </Box>
  );
};
