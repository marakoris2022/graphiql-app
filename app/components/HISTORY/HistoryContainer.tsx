"use client";

import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { HistoryPops } from "@/app/interface/interface";
import Loading from "@/app/loading";
import HistoryItems from "./HistoryItems";
import EmptyHistory from "./EmptyHistory";
import HistoryLinks from "./HistoryLinks";

export const HistoryContainer = ({
  currUser,
}: {
  currUser: string | undefined;
}) => {
  const t = useTranslations("history");

  const [history, setHistory] = useState<HistoryPops>([]);
  const [mount, setMount] = useState(false);

  const removeHistoryItem = (date: number) => {
    const updatedHistory = history.filter((item) => item.Date !== date);
    setHistory(updatedHistory);
    const historyFromLS = localStorage.getItem("requestHistory");

    if (historyFromLS && currUser) {
      const parsedHistory = JSON.parse(historyFromLS);
      parsedHistory[currUser] = updatedHistory;
      localStorage.setItem("requestHistory", JSON.stringify(parsedHistory));
    }
  };

  useEffect(() => {
    const historyFromLS = localStorage.getItem("requestHistory");

    if (historyFromLS && currUser) {
      const parsedHistory = JSON.parse(historyFromLS);
      const userHistory = parsedHistory[currUser] || [];
      setHistory(userHistory);
    }

    setMount(true);
  }, [currUser]);

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
};
