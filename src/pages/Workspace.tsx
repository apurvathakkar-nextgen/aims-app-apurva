import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
//import { Auth } from 'aws-amplify'; 
import {
  Typography,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  PeopleAlt as TeamIcon,
  Delete as DeleteIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';

// Available roles for invited members
const roles = ["Requestor", "Reviewer", "Approver", "Project Manager"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Workspace = () => {
  console.log('Rendering Workspace component');
  
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState([
    {
      id: 1,
      name: "Automation Team",
      teams: [
        { 
          id: 1, 
          name: "Development", 
          members: ["Jane Smith", "Alice Brown"] 
        },
        { 
          id: 2, 
          name: "QA", 
          members: ["John Doe", "Emily Davis"] 
        },
      ],
    },
  ]);

  // State management with logging
  const [openDialog, setOpenDialog] = useState(null);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [workspaceName, setWorkspaceName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [workspaceNameError, setWorkspaceNameError] = useState("");
  const [teamNameError, setTeamNameError] = useState("");

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

  // Reset form state when dialog opens/closes
  useEffect(() => {
    console.log('Dialog state changed:', openDialog);
    if (!openDialog) {
      console.log('Resetting form state');
      setWorkspaceName("");
      setTeamName("");
      setInviteEmail("");
      setInviteRole("");
      setError("");
      setSuccessMessage("");
      setEmailError("");
      setRoleError("");
      setWorkspaceNameError("");
      setTeamNameError("");
    }
  }, [openDialog]);

  // Email validation handler
  const handleEmailChange = (e) => {
    const email = e.target.value;
    console.log('Email input changed:', email);
    setInviteEmail(email);
    
    if (!email) {
      console.log('Email validation: Empty email');
      setEmailError("Email is required");
    } else if (!EMAIL_REGEX.test(email)) {
      console.log('Email validation: Invalid format');
      setEmailError("Please enter a valid email address");
    } else {
      console.log('Email validation: Valid');
      setEmailError("");
    }
  };

  // Role selection handler
  const handleRoleChange = (e) => {
    const role = e.target.value;
    console.log('Role selection changed:', role);
    setInviteRole(role);
    
    if (!role) {
      console.log('Role validation: No role selected');
      setRoleError("Role is required");
    } else {
      console.log('Role validation: Valid');
      setRoleError("");
    }
  };

  // Workspace name handler
  const handleWorkspaceNameChange = (e) => {
    const name = e.target.value;
    console.log('Workspace name input changed:', name);
    setWorkspaceName(name);
    
    if (!name) {
      console.log('Workspace name validation: Empty name');
      setWorkspaceNameError("Workspace name is required");
    } else {
      console.log('Workspace name validation: Valid');
      setWorkspaceNameError("");
    }
  };

  // Team name handler
  const handleTeamNameChange = (e) => {
    const name = e.target.value;
    console.log('Team name input changed:', name);
    setTeamName(name);
    
    if (!name) {
      console.log('Team name validation: Empty name');
      setTeamNameError("Team name is required");
    } else {
      console.log('Team name validation: Valid');
      setTeamNameError("");
    }
  };

  // Form validation
  const validateForm = () => {
    console.log('Validating form...');
    console.log('Current workspace name:', workspaceName);
    console.log('Current team name:', teamName);
    console.log('Current email:', inviteEmail);
    console.log('Current role:', inviteRole);
    
    let isValid = true;
    
    if (openDialog === "createWorkspace" || openDialog === "editWorkspace") {
      if (!workspaceName) {
        console.log('Form validation: Invalid workspace name');
        setWorkspaceNameError("Workspace name is required");
        isValid = false;
      }
    }
    
    if (openDialog === "createTeam") {
      if (!teamName) {
        console.log('Form validation: Invalid team name');
        setTeamNameError("Team name is required");
        isValid = false;
      }
    }
    
    if (openDialog === "inviteMembers") {
      if (!inviteEmail || !EMAIL_REGEX.test(inviteEmail)) {
        console.log('Form validation: Invalid email');
        setEmailError("Please enter a valid email address");
        isValid = false;
      }
      
      if (!inviteRole) {
        console.log('Form validation: Missing role');
        setRoleError("Please select a role");
        isValid = false;
      }
    }
    
    console.log('Form validation result:', isValid);
    return isValid;
  };

  // Create workspace handler
  const handleCreateWorkspace = async () => {
    console.log('Starting create workspace process');
    
    // Reset messages
    setError("");
    setSuccessMessage("");

    // Validate form
    if (!validateForm()) {
      console.log('Form validation failed, stopping create workspace process');
      return;
    }

    console.log('Form validation passed, proceeding with create workspace');
    setIsLoading(true);

    try {
      console.log('Creating workspace...');
      console.log('Request payload:', {
        name: workspaceName.trim(),
      });

      const newWorkspace = {
        id: workspaces.length + 1,
        name: workspaceName.trim(),
        teams: [],
      };

      setWorkspaces([...workspaces, newWorkspace]);
      console.log('Workspace created successfully');
      setSuccessMessage(`Workspace "${workspaceName.trim()}" created successfully`);
      
      console.log('Setting timeout to close dialog');
      setTimeout(() => {
        console.log('Closing create workspace dialog');
        setOpenDialog(null);
      }, 2000);
    } catch (error) {
      console.error('Exception during workspace creation:', error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      console.log('Create workspace process completed');
      setIsLoading(false);
    }
  };

  // Edit workspace handler
  const handleEditWorkspace = async () => {
    console.log('Starting edit workspace process');
    console.log('Selected workspace ID:', selectedWorkspaceId);
    
    // Reset messages
    setError("");
    setSuccessMessage("");

    // Validate form
    if (!validateForm()) {
      console.log('Form validation failed, stopping edit workspace process');
      return;
    }

    console.log('Form validation passed, proceeding with edit workspace');
    setIsLoading(true);

    try {
      console.log('Editing workspace...');
      console.log('Request payload:', {
        name: workspaceName.trim(),
      });

      const updatedWorkspaces = workspaces.map(workspace => 
        workspace.id === selectedWorkspaceId ? { ...workspace, name: workspaceName.trim() } : workspace
      );

      setWorkspaces(updatedWorkspaces);
      console.log('Workspace edited successfully');
      setSuccessMessage(`Workspace renamed to "${workspaceName.trim()}" successfully`);
      
      console.log('Setting timeout to close dialog');
      setTimeout(() => {
        console.log('Closing edit workspace dialog');
        setOpenDialog(null);
      }, 2000);
    } catch (error) {
      console.error('Exception during workspace edit:', error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      console.log('Edit workspace process completed');
      setIsLoading(false);
    }
  };

  // Create team handler
  const handleCreateTeam = async () => {
    console.log('Starting create team process');
    console.log('Selected workspace ID:', selectedWorkspaceId);
    
    // Reset messages
    setError("");
    setSuccessMessage("");

    // Validate form
    if (!validateForm()) {
      console.log('Form validation failed, stopping create team process');
      return;
    }

    console.log('Form validation passed, proceeding with create team');
    setIsLoading(true);

    try {
      console.log('Creating team...');
      console.log('Request payload:', {
        name: teamName.trim(),
      });

      const newTeam = {
        id: workspaces.find(workspace => workspace.id === selectedWorkspaceId).teams.length + 1,
        name: teamName.trim(),
        members: [],
      };

      const updatedWorkspaces = workspaces.map(workspace => 
        workspace.id === selectedWorkspaceId ? { ...workspace, teams: [...workspace.teams, newTeam] } : workspace
      );

      setWorkspaces(updatedWorkspaces);
      console.log('Team created successfully');
      setSuccessMessage(`Team "${teamName.trim()}" created successfully`);
      
      console.log('Setting timeout to close dialog');
      setTimeout(() => {
        console.log('Closing create team dialog');
        setOpenDialog(null);
      }, 2000);
    } catch (error) {
      console.error('Exception during team creation:', error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      console.log('Create team process completed');
      setIsLoading(false);
    }
  };

  // Delete workspace handler
  const handleDeleteWorkspace = async () => {
    console.log('Starting delete workspace process');
    console.log('Selected workspace ID:', selectedWorkspaceId);
    
    // Reset messages
    setError("");
    setSuccessMessage("");

    setIsLoading(true);

    try {
      console.log('Deleting workspace...');

      const updatedWorkspaces = workspaces.filter(workspace => workspace.id !== selectedWorkspaceId);

      setWorkspaces(updatedWorkspaces);
      console.log('Workspace deleted successfully');
      setSuccessMessage(`Workspace deleted successfully`);
      
      console.log('Setting timeout to close dialog');
      setTimeout(() => {
        console.log('Closing delete workspace dialog');
        setOpenDialog(null);
      }, 2000);
    } catch (error) {
      console.error('Exception during workspace deletion:', error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      console.log('Delete workspace process completed');
      setIsLoading(false);
    }
  };

  // Invite user handler
  const handleInviteUser = async () => {
    console.log('Starting invite user process');
    console.log('Selected workspace ID:', selectedWorkspaceId);
    
    // Reset messages
    setError("");
    setSuccessMessage("");

    // Validate form
    if (!validateForm()) {
      console.log('Form validation failed, stopping invite process');
      return;
    }

    console.log('Form validation passed, proceeding with invite');
    setIsLoading(true);

    try {
      console.log('Sending invite request...');
      console.log('Request payload:', {
        email: inviteEmail.trim(),
        role: inviteRole,
        workspaceId: selectedWorkspaceId
      });

      const response = await fetch(`/api/workspace/${selectedWorkspaceId}/invite`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: inviteEmail.trim(), 
          role: inviteRole,
          workspaceId: selectedWorkspaceId
        }),
      });

      const data = await response.json();
      console.log('API response:', data);

      if (response.ok) {
        console.log('Invite sent successfully');
        setSuccessMessage(`Invitation sent successfully to ${inviteEmail}`);
        
        console.log('Setting timeout to close dialog');
        setTimeout(() => {
          console.log('Closing invite dialog');
          setOpenDialog(null);
        }, 2000);
      } else {
        console.error('API error:', data);
        setError(data.message || "Failed to send invite. Please try again.");
      }
    } catch (error) {
      console.error('Exception during invite:', error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      console.log('Invite process completed');
      setIsLoading(false);
    }
  };

  // Dialog open handler
  const handleDialogOpen = (dialogType, workspaceId) => {
    console.log('Opening dialog:', dialogType);
    console.log('For workspace:', workspaceId);
    setSelectedWorkspaceId(workspaceId);
    setOpenDialog(dialogType);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', color: '#004aad', fontWeight: 'bold', mb: 3 }}>
        Your Workspaces
      </Typography>

      {workspaces.map((workspace) => (
        <Paper key={workspace.id} sx={{ mb: 3, p: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {workspace.name}
            </Typography>
            <Box>
              <Tooltip title="Edit Workspace">
                <IconButton onClick={() => handleDialogOpen("editWorkspace", workspace.id)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Team">
                <IconButton onClick={() => handleDialogOpen("createTeam", workspace.id)}>
                  <TeamIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Invite Members">
                <IconButton onClick={() => handleDialogOpen("inviteMembers", workspace.id)}>
                  <PersonAddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Workspace">
                <IconButton onClick={() => handleDialogOpen("deleteWorkspace", workspace.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <List>
            {workspace.teams.map((team) => (
              <ListItem key={team.id} sx={{ pl: 2 }}>
                <Box sx={{ width: '100%' }}>
                  <ListItemText 
                    primary={`👥 ${team.name}`} 
                    sx={{ fontWeight: 'bold' }} 
                  />
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
      ))}

      <Button 
        variant="contained" 
        startIcon={<AddIcon />} 
        onClick={() => handleDialogOpen("createWorkspace", null)} 
        sx={{ mt: 2 }}
      >
        Create New Workspace
      </Button>

      {/* Create Workspace Dialog */}
      <Dialog 
        open={openDialog === "createWorkspace"} 
        onClose={() => setOpenDialog(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Create New Workspace
        </DialogTitle>
        <DialogContent>
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
          <TextField
            autoFocus
            margin="dense"
            label="Workspace Name"
            fullWidth
            value={workspaceName}
            onChange={handleWorkspaceNameChange}
            error={!!workspaceNameError}
            helperText={workspaceNameError}
            disabled={isLoading}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDialog(null)} 
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleCreateWorkspace}
            disabled={isLoading || !!workspaceNameError}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? 'Creating...' : 'Create Workspace'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Workspace Dialog */}
      <Dialog 
        open={openDialog === "editWorkspace"} 
        onClose={() => setOpenDialog(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Edit Workspace
        </DialogTitle>
        <DialogContent>
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
          <TextField
            autoFocus
            margin="dense"
            label="Workspace Name"
            fullWidth
            value={workspaceName}
            onChange={handleWorkspaceNameChange}
            error={!!workspaceNameError}
            helperText={workspaceNameError}
            disabled={isLoading}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDialog(null)} 
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleEditWorkspace}
            disabled={isLoading || !!workspaceNameError}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Team Dialog */}
      <Dialog 
        open={openDialog === "createTeam"} 
        onClose={() => setOpenDialog(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Create New Team
        </DialogTitle>
        <DialogContent>
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
          <TextField
            autoFocus
            margin="dense"
            label="Team Name"
            fullWidth
            value={teamName}
            onChange={handleTeamNameChange}
            error={!!teamNameError}
            helperText={teamNameError}
            disabled={isLoading}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDialog(null)} 
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleCreateTeam}
            disabled={isLoading || !!teamNameError}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? 'Creating...' : 'Create Team'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Workspace Dialog */}
      <Dialog 
        open={openDialog === "deleteWorkspace"} 
        onClose={() => setOpenDialog(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Delete Workspace
        </DialogTitle>
        <DialogContent>
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
          <Typography>
            Are you sure you want to delete this workspace? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDialog(null)} 
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleDeleteWorkspace}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
            color="error"
          >
            {isLoading ? 'Deleting...' : 'Delete Workspace'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Invite Members Dialog */}
      <Dialog 
        open={openDialog === "inviteMembers"} 
        onClose={() => setOpenDialog(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Invite Member to Workspace
        </DialogTitle>
        <DialogContent>
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
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            fullWidth
            value={inviteEmail}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
            disabled={isLoading}
            sx={{ mb: 2 }}
          />
          <FormControl 
            fullWidth 
            error={!!roleError}
            disabled={isLoading}
          >
            <InputLabel>Select Role</InputLabel>
            <Select
              value={inviteRole}
              onChange={handleRoleChange}
              label="Select Role"
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
            {roleError && (
              <Typography color="error" variant="caption" sx={{ mt: 1, ml: 2 }}>
                {roleError}
              </Typography>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDialog(null)} 
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleInviteUser}
            disabled={isLoading || !!emailError || !!roleError}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? 'Sending...' : 'Send Invite'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Workspace;