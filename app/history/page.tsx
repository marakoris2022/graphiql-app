"use client";

import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { HistoryPops } from "../interface/interface";
import HistoryItems from "../components/HISTORY/HistoryItems";
import EmptyHistory from "../components/HISTORY/EmptyHistory";
import HistoryLinks from "../components/HISTORY/HistoryLinks";
import { useTranslations } from "next-intl";

export default function History() {
  const t = useTranslations("history");

  const [history, setHistory] = useState<HistoryPops>([]);
  const [mount, setMount] = useState(false);

  const removeHistoryItem = (date: number) => {
    const updatedHistory = history.filter((item) => item.Date !== date);
    setHistory(updatedHistory);
    localStorage.setItem("requestHistory", JSON.stringify(updatedHistory));
  };

  useEffect(() => {
    const historyFromLS = localStorage.getItem("requestHistory");
    if (historyFromLS) setHistory(JSON.parse(historyFromLS));
    setMount(true);
  }, []);

  if (!mount) return <Loading />;

  return (
    <Container>
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
          {t("title")}
        </Typography>

        {Boolean(history.length) ? (
          <HistoryItems
            history={history}
            removeHistoryItem={removeHistoryItem}
          />
        ) : (
          <EmptyHistory />
        )}

        <HistoryLinks />
      </Box>
    </Container>
  );
}
