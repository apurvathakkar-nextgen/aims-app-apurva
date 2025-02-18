// ControlRoom.tsx
import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Button,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`controlroom-tabpanel-${index}`}
      aria-labelledby={`controlroom-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `controlroom-tab-${index}`,
    'aria-controls': `controlroom-tabpanel-${index}`,
  };
}

const ControlRoom: React.FC = () => {
  // State for active tab (0: General, 1: Theme, 2: Notifications, 3: Integrations, 4: User Management)
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // State for settings data
  const [settings, setSettings] = useState({
    // General Settings
    appName: '',
    companyName: '',
    defaultLanguage: 'en',
    // Theme Settings
    darkMode: false,
    primaryColor: '',
    secondaryColor: '',
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    // Integration Settings
    integrationApiEndpoint: '',
    integrationApiKey: '',
    // User Management Settings
    defaultUserRole: 'User',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name as string]: value }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = () => {
    // Replace with your API call or logic to persist settings
    console.log('Settings saved:', settings);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Control Room
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Configure your application settings.
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="Control Room Tabs"
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        <Tab label="General" {...a11yProps(0)} />
        <Tab label="Theme" {...a11yProps(1)} />
        <Tab label="Notifications" {...a11yProps(2)} />
        <Tab label="Integrations" {...a11yProps(3)} />
        <Tab label="User Management" {...a11yProps(4)} />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <Typography variant="h6" gutterBottom>
          General Settings
        </Typography>
        <TextField
          fullWidth
          label="App Name"
          name="appName"
          value={settings.appName}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Company Name"
          name="companyName"
          value={settings.companyName}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="default-language-label">Default Language</InputLabel>
          <Select
            labelId="default-language-label"
            label="Default Language"
            name="defaultLanguage"
            value={settings.defaultLanguage}
            onChange={handleInputChange as any}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="fr">French</MenuItem>
            {/* Add additional languages as needed */}
          </Select>
        </FormControl>
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <Typography variant="h6" gutterBottom>
          Theme Settings
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={settings.darkMode}
              onChange={handleSwitchChange}
              name="darkMode"
            />
          }
          label="Enable Dark Mode"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Primary Color"
          name="primaryColor"
          value={settings.primaryColor}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
          placeholder="#1976d2"
        />
        <TextField
          fullWidth
          label="Secondary Color"
          name="secondaryColor"
          value={settings.secondaryColor}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
          placeholder="#dc004e"
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <Typography variant="h6" gutterBottom>
          Notification Settings
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={settings.emailNotifications}
              onChange={handleSwitchChange}
              name="emailNotifications"
            />
          }
          label="Enable Email Notifications"
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={settings.smsNotifications}
              onChange={handleSwitchChange}
              name="smsNotifications"
            />
          }
          label="Enable SMS Notifications"
          sx={{ mb: 2 }}
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={3}>
        <Typography variant="h6" gutterBottom>
          Integration Settings
        </Typography>
        <TextField
          fullWidth
          label="API Endpoint"
          name="integrationApiEndpoint"
          value={settings.integrationApiEndpoint}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="API Key"
          name="integrationApiKey"
          value={settings.integrationApiKey}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={4}>
        <Typography variant="h6" gutterBottom>
          User Management Settings
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="default-user-role-label">Default User Role</InputLabel>
          <Select
            labelId="default-user-role-label"
            label="Default User Role"
            name="defaultUserRole"
            value={settings.defaultUserRole}
            onChange={handleInputChange as any}
          >
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </TabPanel>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ textAlign: 'right' }}>
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Settings
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ControlRoom;
