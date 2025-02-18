import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Layout from "../components/Layout.tsx";

const WorkspaceConfig = () => {
  const [workspaces, setWorkspaces] = useState([
    { id: 1, name: "Automation Team", members: ["John Doe", "Jane Smith"] },
  ]);
  const [openInvite, setOpenInvite] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<number | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");

  // ✅ Delete Workspace
  const handleDeleteWorkspace = (id: number) => {
    setWorkspaces(workspaces.filter((workspace) => workspace.id !== id));
  };

  // ✅ Invite Member
  const handleInviteMember = () => {
    if (!selectedWorkspace || inviteEmail.trim() === "") return;
    setWorkspaces((prev) =>
      prev.map((ws) =>
        ws.id === selectedWorkspace ? { ...ws, members: [...ws.members, inviteEmail] } : ws
      )
    );
    setInviteEmail("");
    setOpenInvite(false);
  };

  return (
    <Layout>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="#004aad" mb={3}>
          Workspace Configuration
        </Typography>

        {/* WORKSPACE LIST */}
        <Box mt={3}>
          {workspaces.map((workspace) => (
            <Paper key={workspace.id} sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                {workspace.name}
              </Typography>

              {/* Invite Members Button */}
              <Button
                startIcon={<GroupAddIcon />}
                sx={{ mt: 1 }}
                onClick={() => {
                  setSelectedWorkspace(workspace.id);
                  setOpenInvite(true);
                }}
              >
                Invite Members
              </Button>

              {/* Member List */}
              <Typography fontWeight="bold" mt={2}>
                Team Members
              </Typography>
              <List>
                {workspace.members.map((member, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={member} />
                  </ListItem>
                ))}
              </List>

              {/* Delete Workspace */}
              <IconButton onClick={() => handleDeleteWorkspace(workspace.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Paper>
          ))}
        </Box>

        {/* INVITE MEMBER MODAL */}
        <Dialog open={openInvite} onClose={() => setOpenInvite(false)}>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Email Address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenInvite(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleInviteMember}>
              Invite
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default WorkspaceConfig;
