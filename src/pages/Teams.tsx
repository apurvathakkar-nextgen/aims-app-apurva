import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Box,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Checkbox,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

const Teams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [selectedWorkspace, setSelectedWorkspace] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [availableMembers, setAvailableMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Mock workspaces data (replace with actual API call)
  useEffect(() => {
    console.log('Fetching workspaces and teams...');
    const mockWorkspaces = [
      {
        id: 1,
        name: "Automation Team",
        members: ["Jane Smith", "Alice Brown"],
        teams: [
          { id: 1, name: "Development", members: ["Jane Smith"], projects: ["Project A"] },
          { id: 2, name: "QA", members: ["Alice Brown"], projects: ["Project B"] },
        ],
      },
      {
        id: 2,
        name: "Marketing Team",
        members: ["John Doe", "Emily Davis"],
        teams: [
          { id: 3, name: "Design", members: ["John Doe"], projects: ["Project C"] },
          { id: 4, name: "Content", members: ["Emily Davis"], projects: ["Project D"] },
        ],
      },
    ];
    setWorkspaces(mockWorkspaces);
    const allTeams = mockWorkspaces.flatMap((workspace) =>
      workspace.teams.map((team) => ({
        ...team,
        workspaceName: workspace.name,
        workspaceId: workspace.id,
      }))
    );
    setTeams(allTeams);
    setIsLoading(false);
  }, []);

  // Authentication check
  useEffect(() => {
    console.log('Running authentication check effect');
    const checkAuth = async () => {
      try {
        console.log('Checking user authentication...');
        await getCurrentUser();
        console.log('User is authenticated');
      } catch (error) {
        console.error('Authentication check failed:', error);
        console.log('Redirecting to home page');
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  // Handle team creation
  const handleCreateTeam = () => {
    if (!teamName || !selectedWorkspace) {
      setError('Team name and workspace are required');
      return;
    }

    const newTeam = {
      id: teams.length + 1,
      name: teamName,
      members: [],
      projects: [],
      workspaceId: selectedWorkspace,
      workspaceName: workspaces.find((ws) => ws.id === selectedWorkspace)?.name || 'Unknown Workspace',
    };

    setTeams([...teams, newTeam]);
    setSuccessMessage(`Team "${teamName}" created successfully`);
    setTeamName('');
    setSelectedWorkspace('');
    setOpenDialog(null);
  };

  // Handle managing members in a team
  const handleManageMembers = (team) => {
    setSelectedTeam(team);
    const workspace = workspaces.find((ws) => ws.id === team.workspaceId);
    setAvailableMembers(workspace?.members || []);
    setSelectedMembers(team.members);
    setOpenDialog('manageMembers');
  };

  // Handle saving member changes
  const handleSaveMembers = () => {
    const updatedTeams = teams.map((team) =>
      team.id === selectedTeam.id
        ? { ...team, members: selectedMembers }
        : team
    );
    setTeams(updatedTeams);
    setSuccessMessage(`Members updated for team "${selectedTeam.name}"`);
    setOpenDialog(null);
  };

  // Handle selecting/deselecting members
  const handleMemberSelection = (member) => {
    if (selectedMembers.includes(member)) {
      setSelectedMembers(selectedMembers.filter((m) => m !== member));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  // Handle assigning a team to a workspace
  const handleAssignWorkspace = (team) => {
    setSelectedTeam(team);
    setSelectedWorkspace(team.workspaceId);
    setOpenDialog('assignWorkspace');
  };

  // Handle saving workspace assignment
  const handleSaveWorkspaceAssignment = () => {
    if (!selectedWorkspace) {
      setError('Please select a workspace');
      return;
    }

    const updatedTeams = teams.map((team) =>
      team.id === selectedTeam.id
        ? {
            ...team,
            workspaceId: selectedWorkspace,
            workspaceName: workspaces.find((ws) => ws.id === selectedWorkspace)?.name || 'Unknown Workspace',
          }
        : team
    );
    setTeams(updatedTeams);
    setSuccessMessage(`Team "${selectedTeam.name}" assigned to workspace successfully`);
    setOpenDialog(null);
  };

  // Handle deleting a team
  const handleDeleteTeam = (teamId) => {
    const updatedTeams = teams.filter((team) => team.id !== teamId);
    setTeams(updatedTeams);
    setSuccessMessage('Team deleted successfully');
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', color: '#004aad', fontWeight: 'bold', mb: 3 }}>
        All Teams
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenDialog('createTeam')}
        sx={{ mb: 3 }}
      >
        Create New Team
      </Button>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <List>
            {teams.map((team) => (
              <ListItem key={team.id} sx={{ pl: 2 }}>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <ListItemText
                      primary={`👥 ${team.name} (${team.workspaceName})`}
                      sx={{ fontWeight: 'bold' }}
                    />
                    <Box>
                      <Tooltip title="Assign to Workspace">
                        <IconButton onClick={() => handleAssignWorkspace(team)}>
                          <AssignmentIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Manage Members">
                        <IconButton onClick={() => handleManageMembers(team)}>
                          <PeopleIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Team">
                        <IconButton onClick={() => handleDeleteTeam(team.id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  {/* Display team members */}
                  <List sx={{ pl: 4 }}>
                    {team.members.map((member, index) => (
                      <ListItem key={index} sx={{ pl: 2 }}>
                        <ListItemText primary={`👤 ${member}`} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* Create Team Dialog */}
      <Dialog open={openDialog === 'createTeam'} onClose={() => setOpenDialog(null)}>
        <DialogTitle>Create New Team</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Team Name"
            fullWidth
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Workspace</InputLabel>
            <Select
              value={selectedWorkspace}
              onChange={(e) => setSelectedWorkspace(e.target.value)}
              label="Workspace"
            >
              {workspaces.map((workspace) => (
                <MenuItem key={workspace.id} value={workspace.id}>
                  {workspace.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateTeam}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Assign Workspace Dialog */}
      <Dialog open={openDialog === 'assignWorkspace'} onClose={() => setOpenDialog(null)}>
        <DialogTitle>Assign Team to Workspace</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Workspace</InputLabel>
            <Select
              value={selectedWorkspace}
              onChange={(e) => setSelectedWorkspace(e.target.value)}
              label="Workspace"
            >
              {workspaces.map((workspace) => (
                <MenuItem key={workspace.id} value={workspace.id}>
                  {workspace.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveWorkspaceAssignment}>
            Assign
          </Button>
        </DialogActions>
      </Dialog>

      {/* Manage Members Dialog */}
      <Dialog open={openDialog === 'manageMembers'} onClose={() => setOpenDialog(null)}>
        <DialogTitle>Manage Members for {selectedTeam?.name}</DialogTitle>
        <DialogContent>
          <List>
            {availableMembers.map((member) => (
              <ListItem key={member}>
                <ListItemText primary={`👤 ${member}`} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    checked={selectedMembers.includes(member)}
                    onChange={() => handleMemberSelection(member)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveMembers}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Teams;