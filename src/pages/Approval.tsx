// ApprovalScreen.tsx
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
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
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
      id={`approval-tabpanel-${index}`}
      aria-labelledby={`approval-tab-${index}`}
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
    id: `approval-tab-${index}`,
    'aria-controls': `approval-tabpanel-${index}`,
  };
}

interface ApprovalData {
  // Finance
  financeStatus: string;
  financeApprover: string;
  financeDate: string;
  financeComments: string;
  // Security
  securityStatus: string;
  securityApprover: string;
  securityDate: string;
  securityComments: string;
  // Compliance
  complianceStatus: string;
  complianceApprover: string;
  complianceDate: string;
  complianceComments: string;
  // Data Privacy
  dataPrivacyStatus: string;
  dataPrivacyApprover: string;
  dataPrivacyDate: string;
  dataPrivacyComments: string;
  // Idea Approval
  ideaApprovalStatus: string;
  ideaApprovalApprover: string;
  ideaApprovalDate: string;
  ideaApprovalComments: string;
  // Business Case Approval
  businessCaseStatus: string;
  businessCaseApprover: string;
  businessCaseDate: string;
  businessCaseComments: string;
}

const ApprovalScreen: React.FC = () => {
  // Central state for all approval data.
  const [approvalData, setApprovalData] = useState<ApprovalData>({
    financeStatus: '',
    financeApprover: '',
    financeDate: '',
    financeComments: '',
    securityStatus: '',
    securityApprover: '',
    securityDate: '',
    securityComments: '',
    complianceStatus: '',
    complianceApprover: '',
    complianceDate: '',
    complianceComments: '',
    dataPrivacyStatus: '',
    dataPrivacyApprover: '',
    dataPrivacyDate: '',
    dataPrivacyComments: '',
    ideaApprovalStatus: '',
    ideaApprovalApprover: '',
    ideaApprovalDate: '',
    ideaApprovalComments: '',
    businessCaseStatus: '',
    businessCaseApprover: '',
    businessCaseDate: '',
    businessCaseComments: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target;
    setApprovalData((prev) => ({
      ...prev,
      [name as string]: value as string,
    }));
  };

  // State for active tab (0: Summary, 1: Idea, 2: Business Case, 3: Finance, 4: Data Privacy, 5: Compliance, 6: Security)
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // Sample list of projects (this can be loaded from an API)
  const projects = [
    { id: 'proj1', name: 'Project A' },
    { id: 'proj2', name: 'Project B' },
    { id: 'proj3', name: 'Project C' },
  ];
  const [selectedProject, setSelectedProject] = useState(projects[0].id);

  const handleProjectChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setSelectedProject(event.target.value as string);
  };

  // Define sections in the desired order:
  // Order: Idea, Business Case, Finance, Data Privacy, Compliance, Security
  const sections = [
    {
      title: 'Idea Approval',
      prefix: 'ideaApproval',
      fields: [
        { name: 'Status', key: 'Status', type: 'select', options: ['Pending', 'Approved', 'Rejected'] },
        { name: 'Approver Name', key: 'Approver', type: 'text' },
        { name: 'Approval Date', key: 'Date', type: 'date' },
        { name: 'Comments', key: 'Comments', type: 'text' },
      ],
    },
    {
      title: 'Business Case Approval',
      prefix: 'businessCase',
      fields: [
        { name: 'Status', key: 'Status', type: 'select', options: ['Pending', 'Approved', 'Rejected'] },
        { name: 'Approver Name', key: 'Approver', type: 'text' },
        { name: 'Approval Date', key: 'Date', type: 'date' },
        { name: 'Comments', key: 'Comments', type: 'text' },
      ],
    },
    {
      title: 'Finance Approval',
      prefix: 'finance',
      fields: [
        { name: 'Status', key: 'Status', type: 'select', options: ['Pending', 'Approved', 'Rejected'] },
        { name: 'Approver Name', key: 'Approver', type: 'text' },
        { name: 'Approval Date', key: 'Date', type: 'date' },
        { name: 'Comments', key: 'Comments', type: 'text' },
      ],
    },
    {
      title: 'Data Privacy Approval',
      prefix: 'dataPrivacy',
      fields: [
        { name: 'Status', key: 'Status', type: 'select', options: ['Pending', 'Approved', 'Rejected'] },
        { name: 'Approver Name', key: 'Approver', type: 'text' },
        { name: 'Approval Date', key: 'Date', type: 'date' },
        { name: 'Comments', key: 'Comments', type: 'text' },
      ],
    },
    {
      title: 'Compliance Approval',
      prefix: 'compliance',
      fields: [
        { name: 'Status', key: 'Status', type: 'select', options: ['Pending', 'Approved', 'Rejected'] },
        { name: 'Approver Name', key: 'Approver', type: 'text' },
        { name: 'Approval Date', key: 'Date', type: 'date' },
        { name: 'Comments', key: 'Comments', type: 'text' },
      ],
    },
    {
      title: 'Security Approval',
      prefix: 'security',
      fields: [
        { name: 'Status', key: 'Status', type: 'select', options: ['Pending', 'Approved', 'Rejected'] },
        { name: 'Approver Name', key: 'Approver', type: 'text' },
        { name: 'Approval Date', key: 'Date', type: 'date' },
        { name: 'Comments', key: 'Comments', type: 'text' },
      ],
    },
  ];

  // Handle final approval submission for each individual section
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Process or persist approvalData here.
    console.log('Approval Data Submitted:', approvalData);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Project Approval
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Use the tabs to navigate between approval categories as required by your business.
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="Approval Tabs"
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        <Tab label="Summary" {...a11yProps(0)} />
        <Tab label="Idea" {...a11yProps(1)} />
        <Tab label="Business Case" {...a11yProps(2)} />
        <Tab label="Finance" {...a11yProps(3)} />
        <Tab label="Data Privacy" {...a11yProps(4)} />
        <Tab label="Compliance" {...a11yProps(5)} />
        <Tab label="Security" {...a11yProps(6)} />
      </Tabs>

      <form onSubmit={handleSubmit}>
        {/* Summary Tab (Index 0): No submit button here */}
        <TabPanel value={tabIndex} index={0}>
          <Typography variant="h6" gutterBottom>
            Approval Summary
          </Typography>
          {/* Project Filtering */}
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="select-project-label">Select Project</InputLabel>
              <Select
                labelId="select-project-label"
                label="Select Project"
                value={selectedProject}
                onChange={handleProjectChange}
              >
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2">
                <a href={`/project-details/${selectedProject}`} style={{ textDecoration: 'none' }}>
                  View Project Details
                </a>
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Approver</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sections.map((section) => {
                const prefix = section.prefix;
                return (
                  <TableRow key={prefix}>
                    <TableCell>{section.title}</TableCell>
                    <TableCell>{(approvalData as any)[prefix + 'Status'] || '-'}</TableCell>
                    <TableCell>{(approvalData as any)[prefix + 'Approver'] || '-'}</TableCell>
                    <TableCell>{(approvalData as any)[prefix + 'Date'] || '-'}</TableCell>
                    <TableCell>{(approvalData as any)[prefix + 'Comments'] || '-'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TabPanel>

        {/* Render each approval section (Tabs 1–6) with a submit button */}
        {sections.map((section, idx) => (
          <TabPanel value={tabIndex} index={idx + 1} key={section.title}>
            <Typography variant="h6">{section.title}</Typography>
            {section.fields.map((field) => {
              const fieldKey = section.prefix + field.key;
              if (field.type === 'select' && field.options) {
                return (
                  <FormControl fullWidth sx={{ mb: 2 }} key={fieldKey}>
                    <InputLabel>{field.name}</InputLabel>
                    <Select
                      label={field.name}
                      name={fieldKey}
                      value={(approvalData as any)[fieldKey] || ''}
                      onChange={handleChange as any}
                    >
                      {field.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              } else {
                return (
                  <TextField
                    key={fieldKey}
                    label={field.name}
                    name={fieldKey}
                    type={field.type}
                    fullWidth
                    InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
                    value={(approvalData as any)[fieldKey] || ''}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                );
              }
            })}
            <Box sx={{ textAlign: 'right', mt: 2 }}>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button variant="contained" color="primary" type="submit">
                  Submit Approval
                </Button>
              </motion.div>
            </Box>
          </TabPanel>
        ))}
      </form>
    </Box>
  );
};

export default ApprovalScreen;
