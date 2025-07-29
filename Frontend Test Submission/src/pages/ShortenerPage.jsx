import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UrlForm from "../components/UrlForm";
import UrlList from "../components/UrlList";
import { Typography, Box } from "@mui/material";
import { logger } from "../utils/logger";

function ShortenerPage() {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [urls, setUrls] = useState(() => {
    const saved = localStorage.getItem("shortenedUrls");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    logger.info("ShortenerPage mounted", { shortCode });

    if (shortCode) {
      const urlObj = urls.find((u) => u.shortCode === shortCode);
      if (urlObj) {
        logger.info("Redirecting to original URL", { urlObj });
        const updatedUrls = urls.map((u) =>
          u.shortCode === shortCode
            ? {
                ...u,
                clicks: [...u.clicks, { timestamp: new Date().toISOString() }],
              }
            : u
        );
        setUrls(updatedUrls);
        localStorage.setItem("shortenedUrls", JSON.stringify(updatedUrls));

        window.location.href = urlObj.originalUrl;
      } else {
        logger.warn("Short code not found", { shortCode });
      }
    }
  }, [shortCode, urls]); // Added 'urls' to dependency array as it's used inside useEffect

  const handleShorten = (newUrl) => {
    logger.info("Adding new shortened URL", { newUrl });
    const updatedUrls = [...urls, newUrl];
    setUrls(updatedUrls);
    localStorage.setItem("shortenedUrls", JSON.stringify(updatedUrls));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      <UrlForm
        onShorten={handleShorten}
        existingShortCodes={urls.map((u) => u.shortCode)}
      />
      {urls.length > 0 && <UrlList urls={urls} />}
    </Box>
  );
}

export default ShortenerPage;
