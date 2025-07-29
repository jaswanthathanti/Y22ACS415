import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { logger } from "../utils/logger";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          URL Shortener
        </Typography>
        <Button
          color="inherit"
          component={RouterLink}
          to="/"
          onClick={() => logger.info("Navigated to home")}
        >
          Shortener
        </Button>
        <Button
          color="inherit"
          component={RouterLink}
          to="/stats"
          onClick={() => logger.info("Navigated to stats")}
        >
          Statistics
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
