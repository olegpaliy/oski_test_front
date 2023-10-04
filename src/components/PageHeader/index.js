import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@mui/material";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../../context/AuthProvider";
import { logout } from "../../api/logout";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function PageHeader({ pageTitle }) {
  const { authUser, clearAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = () => {
    logout(JSON.parse(localStorage.getItem("authToken")));
    clearAuth();
    navigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar
        position="relative"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Toolbar>
          <PersonIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            {authUser ? `${authUser.firstName} ${authUser.lastName}` : "- -"}
          </Typography>
        </Toolbar>
        <Box sx={{ maxWidth: 120 }}>
          <Button
            onClick={submitHandler}
            variant="outlined"
            sx={{ color: "white", mr: 2 }}
          >
            Logout
          </Button>
        </Box>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {pageTitle}
            </Typography>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
