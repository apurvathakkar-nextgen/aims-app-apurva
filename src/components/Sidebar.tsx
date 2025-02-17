import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  IconButton,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon,
  PeopleAlt as TeamsIcon,
  Assignment as ProjectIcon,
  Workspaces as WorkspaceIcon,
  ExitToApp as LogoutIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Lightbulb as IdeaIcon,
  ThumbUp as ApprovalIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

// IMPORTANT: Use named imports from @aws-amplify/auth
import { signOut } from '@aws-amplify/auth';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      console.log('User signed out successfully.');
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box
      sx={{
        width: isCollapsed ? 70 : 250,
        height: '100vh',
        backgroundColor: '#ffffff',
        color: '#000000',
        padding: 2,
        transition: 'width 0.3s',
      }}
    >
      {/* Sidebar Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        {!isCollapsed && (
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              alt="User Avatar"
              src="/path/to/avatar.png" // Replace with your avatar image path
              sx={{ width: 80, height: 80, margin: 'auto' }}
            />
            <Typography
              variant="h6"
              sx={{ mt: 2, fontWeight: 'bold', color: '#000000' }}
            >
              John Doe
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.7)' }}>
              Admin
            </Typography>
          </Box>
        )}
        <IconButton onClick={toggleSidebar} sx={{ color: '#000000' }}>
          {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', mb: 2 }} />

      {/* Navigation Links */}
      <List>
        {/* Dashboard Link */}
        <ListItem
          button
          component={Link}
          to="/dashboard"  // Updated route
          sx={{
            borderRadius: 1,
            mb: 1,
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <ListItemIcon sx={{ color: '#000000' }}>
            <HomeIcon />
          </ListItemIcon>
          {!isCollapsed && (
            <ListItemText primary="Home" sx={{ color: '#000000' }} /> // Updated text
          )}
        </ListItem>

        {/* Idea Management Link */}
        <ListItem
          button
          component={Link}
          to="/idea-management"
          sx={{
            borderRadius: 1,
            mb: 1,
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <ListItemIcon sx={{ color: '#000000' }}>
            <IdeaIcon />
          </ListItemIcon>
          {!isCollapsed && (
            <ListItemText primary="Idea Management" sx={{ color: '#000000' }} />
          )}
        </ListItem>

        {/* Workspace Link */}
        <ListItem
          button
          component={Link}
          to="/workspace"
          sx={{
            borderRadius: 1,
            mb: 1,
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <ListItemIcon sx={{ color: '#000000' }}>
            <WorkspaceIcon />
          </ListItemIcon>
          {!isCollapsed && (
            <ListItemText primary="Workspace" sx={{ color: '#000000' }} />
          )}
        </ListItem>

        {/* Teams Link */}
        <ListItem
          button
          component={Link}
          to="/teams"
          sx={{
            borderRadius: 1,
            mb: 1,
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <ListItemIcon sx={{ color: '#000000' }}>
            <TeamsIcon />
          </ListItemIcon>
          {!isCollapsed && (
            <ListItemText primary="Teams" sx={{ color: '#000000' }} />
          )}
        </ListItem>

        {/* Projects Link */}
        <ListItem
          button
          component={Link}
          to="/project-summary"
          sx={{
            borderRadius: 1,
            mb: 1,
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <ListItemIcon sx={{ color: '#000000' }}>
            <ProjectIcon />
          </ListItemIcon>
          {!isCollapsed && (
            <ListItemText primary="Projects" sx={{ color: '#000000' }} />
          )}
        </ListItem>

        {/* Approval Link */}
        <ListItem
          button
          component={Link}
          to="/approval"
          sx={{
            borderRadius: 1,
            mb: 1,
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <ListItemIcon sx={{ color: '#000000' }}>
            <ApprovalIcon />
          </ListItemIcon>
          {!isCollapsed && (
            <ListItemText primary="Approval" sx={{ color: '#000000' }} />
          )}
        </ListItem>

        {/* Control Room (Settings) Link */}
        <ListItem
          button
          component={Link}
          to="/settings"
          sx={{
            borderRadius: 1,
            mb: 1,
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <ListItemIcon sx={{ color: '#000000' }}>
            <SettingsIcon />
          </ListItemIcon>
          {!isCollapsed && (
            <ListItemText primary="Control Room" sx={{ color: '#000000' }} />
          )}
        </ListItem>
      </List>

      <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', mt: 2, mb: 2 }} />

      {/* Logout Button */}
      <List>
        <ListItem
          button
          onClick={handleLogout}
          sx={{ borderRadius: 1, '&:hover': { backgroundColor: '#f0f0f0' } }}
        >
          <ListItemIcon sx={{ color: '#000000' }}>
            <LogoutIcon />
          </ListItemIcon>
          {!isCollapsed && (
            <ListItemText primary="Logout" sx={{ color: '#000000' }} />
          )}
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
