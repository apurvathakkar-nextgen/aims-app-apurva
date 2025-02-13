import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import ProjectPlanning from './ProjectPlanning.tsx';
import ProjectDevelopment from './ProjectDevelopment.tsx';
import ProjectTesting from './ProjectTesting.tsx';
import ProjectDeployment from './ProjectDeployment.tsx';

const Project = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', color: '#004aad', fontWeight: 'bold', mb: 3 }}>
        Project Management
      </Typography>

      {/* Tabs */}
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Project Planning" />
        <Tab label="Project Development" />
        <Tab label="Project Testing" />
        <Tab label="Project Deployment" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        {selectedTab === 0 && <ProjectPlanning />}
        {selectedTab === 1 && <ProjectDevelopment />}
        {selectedTab === 2 && <ProjectTesting />}
        {selectedTab === 3 && <ProjectDeployment />}
      </Box>
    </Box>
  );
};

export default Project;