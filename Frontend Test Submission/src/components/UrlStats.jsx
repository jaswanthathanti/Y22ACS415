import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function UrlStats({ urls }) {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      {urls.map((url) => (
        <Accordion key={url.shortCode} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {url.shortCode}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Clicks: {url.clicks.length}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle1" gutterBottom>
              Original URL:{" "}
              <a
                href={url.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {url.originalUrl}
              </a>
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Created: {new Date(url.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Expires: {new Date(url.expiresAt).toLocaleString()}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Status:{" "}
              <Chip
                label={
                  new Date(url.expiresAt) > new Date() ? "Active" : "Expired"
                }
                color={
                  new Date(url.expiresAt) > new Date() ? "success" : "error"
                }
                size="small"
              />
            </Typography>

            {url.clicks.length > 0 ? (
              <>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Click Details
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Source</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {url.clicks.map((click, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {new Date(click.timestamp).toLocaleString()}
                          </TableCell>
                          <TableCell>{click.location || "Unknown"}</TableCell>
                          <TableCell>{click.source || "Direct"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No clicks recorded yet.
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
}

export default UrlStats;
