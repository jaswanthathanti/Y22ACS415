import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
  Chip,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { logger } from "../utils/logger";

function UrlList({ urls }) {
  const getExpiryStatus = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    return now > expiry ? "Expired" : "Active";
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    logger.info("Copied to clipboard", { text });
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Your Shortened URLs
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Original URL</TableCell>
              <TableCell>Short URL</TableCell>
              <TableCell>Expires</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url.shortCode}>
                <TableCell
                  sx={{
                    maxWidth: 200,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Link href={url.originalUrl} target="_blank" rel="noopener">
                    {url.originalUrl}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    component={RouterLink}
                    to={`/${url.shortCode}`}
                    target="_blank"
                    onClick={() =>
                      copyToClipboard(
                        `${window.location.origin}/${url.shortCode}`
                      )
                    }
                  >
                    {`${window.location.host}/${url.shortCode}`}
                  </Link>
                </TableCell>
                <TableCell>
                  {new Date(url.expiresAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={getExpiryStatus(url.expiresAt)}
                    color={
                      getExpiryStatus(url.expiresAt) === "Active"
                        ? "success"
                        : "error"
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default UrlList;
