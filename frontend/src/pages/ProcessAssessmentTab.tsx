import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';

// Import the tab components
import RPATab from './RPA.tsx';
import IDPTab from './IDP.tsx';
import GenAITab from './GenAI.tsx';
import DataProcessingTab from './DataProcessing.tsx';
import LowCodeTab from './LowCode.tsx';
import AIMLTab from './AIML.tsx';

// Define a generic component for each tab content
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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Main component with tabs
const ProcessAssessmentTab: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Process Assessment
      </Typography>
      <Tabs value={value} onChange={handleChange} aria-label="process assessment tabs">
        <Tab label="RPA" />
        <Tab label="IDP" />
        <Tab label="Gen AI" />
        <Tab label="Data Processing" />
        <Tab label="Low Code" />
        <Tab label="AI/ML" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <RPATab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <IDPTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GenAITab />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DataProcessingTab />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <LowCodeTab />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <AIMLTab />
      </TabPanel>
    </div>
  );
};

export default ProcessAssessmentTab;