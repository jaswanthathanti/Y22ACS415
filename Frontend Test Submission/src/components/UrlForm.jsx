import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { logger } from "../utils/logger";
import { validateUrl, validateShortCode } from "../utils/validation";

function UrlForm({ onShorten, existingShortCodes }) {
  const [urlInputs, setUrlInputs] = useState([
    { originalUrl: "", validity: 30, shortCode: "" },
  ]);
  const [errors, setErrors] = useState([]);

  const handleInputChange = (index, field, value) => {
    const newInputs = [...urlInputs];
    newInputs[index][field] = value;
    setUrlInputs(newInputs);
  };

  const handleAddRow = () => {
    if (urlInputs.length < 5) {
      setUrlInputs([
        ...urlInputs,
        { originalUrl: "", validity: 30, shortCode: "" },
      ]);
    }
  };

  const handleRemoveRow = (index) => {
    if (urlInputs.length > 1) {
      const newInputs = urlInputs.filter((_, i) => i !== index);
      setUrlInputs(newInputs);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = [];
    const validInputs = [];

    urlInputs.forEach((input, index) => {
      const urlError = validateUrl(input.originalUrl);
      const shortCodeError = input.shortCode
        ? validateShortCode(input.shortCode, existingShortCodes)
        : null;

      if (urlError || shortCodeError) {
        newErrors[index] = {
          originalUrl: urlError,
          shortCode: shortCodeError,
        };
      } else {
        validInputs.push(input);
      }
    });

    setErrors(newErrors);

    if (validInputs.length > 0) {
      validInputs.forEach((input) => {
        const shortCode = input.shortCode || generateShortCode();
        const expiryDate = new Date();
        expiryDate.setMinutes(
          expiryDate.getMinutes() + parseInt(input.validity)
        );

        const newUrl = {
          originalUrl: input.originalUrl,
          shortCode,
          createdAt: new Date().toISOString(),
          expiresAt: expiryDate.toISOString(),
          clicks: [],
        };

        onShorten(newUrl);
      });

      setUrlInputs([{ originalUrl: "", validity: 30, shortCode: "" }]);
    } else {
      logger.error("Form submission failed due to validation errors", {
        errors: newErrors,
      });
    }
  };

  const generateShortCode = () => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    if (existingShortCodes.includes(result)) {
      return generateShortCode();
    }

    return result;
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Shorten URLs
      </Typography>
      <form onSubmit={handleSubmit}>
        {urlInputs.map((input, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="Original URL"
                value={input.originalUrl}
                onChange={(e) =>
                  handleInputChange(index, "originalUrl", e.target.value)
                }
                error={!!errors[index]?.originalUrl}
                helperText={errors[index]?.originalUrl}
                required
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField
                fullWidth
                label="Validity (minutes)"
                type="number"
                value={input.validity}
                onChange={(e) =>
                  handleInputChange(index, "validity", e.target.value)
                }
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={5} sm={3}>
              <TextField
                fullWidth
                label="Custom shortcode (optional)"
                value={input.shortCode}
                onChange={(e) =>
                  handleInputChange(index, "shortCode", e.target.value)
                }
                error={!!errors[index]?.shortCode}
                helperText={errors[index]?.shortCode}
              />
            </Grid>
            <Grid item xs={1} sx={{ display: "flex", alignItems: "center" }}>
              {urlInputs.length > 1 && (
                <Tooltip title="Remove URL">
                  <IconButton onClick={() => handleRemoveRow(index)}>
                    <RemoveIcon />
                  </IconButton>
                </Tooltip>
              )}
              {index === urlInputs.length - 1 && urlInputs.length < 5 && (
                <Tooltip title="Add another URL">
                  <IconButton onClick={handleAddRow}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
          </Grid>
        ))}
        <Button type="submit" variant="contained" color="primary">
          Shorten URLs
        </Button>
      </form>
    </Paper>
  );
}

export default UrlForm;
