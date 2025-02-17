import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import SummaryTab from './SummaryTab.tsx';
import PlatformAssessmentTab from './PlatformAssessmentTab.tsx';
import ProcessAssessmentTab from './ProcessAssessmentTab.tsx';
import ValueAssessmentTab from './ValueAssessmentTab.tsx';
import CostBenefitAnalysisTab from './CostBenefitAnalysisTab.tsx'; // New component

const IdeaManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [ideas, setIdeas] = useState([
    {
      id: 'AIM/635981',
      date: '10-02-2025',
      requestor: 'Jones Davis',
      processName: 'dvcV',
      selectedProcess: 'Process Assessment IDP',
      businessCriticality: 'Medium',
      platform: false,
      process: false,
      value: '',
      cost: '',
      status: 'Under Review',
    },
    {
      id: 'AIM/182089',
      date: '10-02-2025',
      requestor: 'Michael Brown',
      processName: 'fwfqfqfweqfqff',
      selectedProcess: 'Process Assessment IDP',
      businessCriticality: 'High',
      platform: true,
      process: false,
      value: '',
      cost: '',
      status: 'Ideation',
    },
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Innovation Summary</h1>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Summary" />
          <Tab label="Platform Assessment" />
          <Tab label="Process Assessment" />
          <Tab label="Value Assessment" />
          <Tab label="Cost Benefit Analysis" /> {/* New Tab */}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ marginTop: '20px' }}>
        {activeTab === 0 && <SummaryTab ideas={ideas} setIdeas={setIdeas} />}
        {activeTab === 1 && <PlatformAssessmentTab />}
        {activeTab === 2 && <ProcessAssessmentTab />}
        {activeTab === 3 && <ValueAssessmentTab />}
        {activeTab === 4 && <CostBenefitAnalysisTab />} {/* New Tab Content */}
      </Box>
    </div>
  );
};

export default IdeaManagementPage;