import { useState, useEffect } from "react";
import UrlStats from "../components/UrlStats";
import { Typography, Box } from "@mui/material";
import { logger } from "../utils/logger";

function StatsPage() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    logger.info("StatsPage mounted");
    const saved = localStorage.getItem("shortenedUrls");
    if (saved) {
      setUrls(JSON.parse(saved));
    }
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>
      {urls.length > 0 ? (
        <UrlStats urls={urls} />
      ) : (
        <Typography>No URLs have been shortened yet.</Typography>
      )}
    </Box>
  );
}

export default StatsPage;
