import React, { useState } from 'react';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import ExecutiveSummary from '../components/DashboardTabs/ExecutiveSummary.tsx';
import PipelineDashboard from '../components/DashboardTabs/PipelineDashboard.tsx';
import DeliveryDashboard from '../components/DashboardTabs/DeliveryDashboard.tsx';
import SolutionHub from '../components/DashboardTabs/SolutionHub.tsx';
import EnterpriseProjects from '../components/DashboardTabs/EnterpriseProjects.tsx';
import PerformanceAnalytics from '../components/DashboardTabs/PerformanceAnalytics.tsx';
import BusinessImpact from '../components/DashboardTabs/BusinessImpact.tsx';
import MilestoneMonitor from '../components/DashboardTabs/MilestoneMonitor.tsx';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard
      </Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab label="Executive Summary" />
          <Tab label="Pipeline Dashboard" />
          <Tab label="Delivery Dashboard" />
          <Tab label="Solution Hub" />
          <Tab label="Enterprise Projects" />
          <Tab label="Performance Analytics" />
          <Tab label="Business Impact" />
          <Tab label="Milestone Monitor" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ marginTop: '20px' }}>
        {activeTab === 0 && <ExecutiveSummary />}
        {activeTab === 1 && <PipelineDashboard />}
        {activeTab === 2 && <DeliveryDashboard />}
        {activeTab === 3 && <SolutionHub />}
        {activeTab === 4 && <EnterpriseProjects />}
        {activeTab === 5 && <PerformanceAnalytics />}
        {activeTab === 6 && <BusinessImpact />}
        {activeTab === 7 && <MilestoneMonitor />}
      </Box>
    </Box>
  );
};

export default Dashboard;
