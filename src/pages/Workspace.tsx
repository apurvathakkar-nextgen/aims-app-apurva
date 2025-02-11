import { useState, useEffect } from "react";
import { Box, Button, Typography, Paper, Grid, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "aws-amplify/auth";
import { DarkMode, LightMode } from "@mui/icons-material";

const Workspace = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([{ id: 1, name: "Automation Team" }]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
      } catch {
        navigate("/"); // Redirect to login if not authenticated
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: darkMode ? "#121212" : "linear-gradient(to right, #e0eafc, #cfdef3)", padding: 3 }}>
      <Paper elevation={8} sx={{ padding: 4, borderRadius: 4, textAlign: "center", maxWidth: 600, width: "100%", background: darkMode ? "rgba(20, 20, 20, 0.9)" : "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(10px)", color: darkMode ? "#ffffff" : "#000000" }}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <LightMode sx={{ color: "yellow" }} /> : <DarkMode />}
          </IconButton>
        </Box>

        <Typography variant="h4" fontWeight="bold" color={darkMode ? "#ffffff" : "#004aad"} mb={3}>
          Your Workspace
        </Typography>

        {teams.map((team) => (
          <Paper key={team.id} sx={{ padding: 2, mb: 2, cursor: "pointer", textAlign: "left" }} onClick={() => navigate(`/teams?id=${team.id}`)}>
            <Typography variant="h6">{team.name}</Typography>
          </Paper>
        ))}

        <Button variant="contained" color="primary" onClick={() => navigate("/teams")}>+ Create or Join Team</Button>
      </Paper>
    </Box>
  );
};

export default Workspace;
