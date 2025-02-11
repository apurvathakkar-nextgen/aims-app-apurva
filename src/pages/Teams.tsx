import { useState } from "react";
import { Box, Button, TextField, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const Teams = () => {
  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState([{ id: 1, name: "Automation Team", members: ["User1", "User2"] }]);

  const handleCreateTeam = () => {
    if (teamName) {
      setTeams([...teams, { id: teams.length + 1, name: teamName, members: [] }]);
      setTeamName("");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: 4 }}>
      <Paper sx={{ padding: 4, textAlign: "center", maxWidth: 500, width: "100%" }}>
        <Typography variant="h5" mb={3}>Teams</Typography>
        <TextField fullWidth label="Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} sx={{ mb: 2 }} />
        <Button variant="contained" color="primary" onClick={handleCreateTeam}>Create Team</Button>

        <List sx={{ mt: 3 }}>
          {teams.map((team) => (
            <ListItem key={team.id} button>
              <ListItemText primary={team.name} secondary={`Members: ${team.members.length}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Teams;
