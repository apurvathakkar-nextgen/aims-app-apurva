import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody, TextField, Select, MenuItem, Link } from '@mui/material';

const SolutionHub: React.FC = () => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Mocked Project Data
  const projects = [
    {
      link: 'https://example.com/ai_automation',
      function: 'Technology',
      process: 'AI Development',
      businessGroup: 'TechOps',
      projectName: 'AI-Powered Document Processing',
      projectDescription: 'Automates document processing using machine learning and OCR technology.',
      projectSME: 'John Doe, Jane Smith',
      applications: 'Python, TensorFlow',
      annualizedRWH: 12000,
      demandID: 1001
    },
    {
      link: 'https://example.com/finance_automation',
      function: 'Finance',
      process: 'Accounts Payable',
      businessGroup: 'FinanceOps',
      projectName: 'Automated Invoice Matching',
      projectDescription: 'Uses RPA to match invoices with purchase orders, reducing manual workload.',
      projectSME: 'Alice Johnson, Bob Williams',
      applications: 'UiPath, Excel',
      annualizedRWH: 8500,
      demandID: 1002
    },
    {
      link: 'https://example.com/hr_analytics',
      function: 'Human Resources',
      process: 'Talent Acquisition',
      businessGroup: 'HR Solutions',
      projectName: 'HR Analytics Dashboard',
      projectDescription: 'Aggregates employee data to provide insights into hiring trends and attrition rates.',
      projectSME: 'Chris Green, Sarah Lee',
      applications: 'Power BI, SQL',
      annualizedRWH: 6200,
      demandID: 1003
    },
    {
      link: 'https://example.com/customer_support_ai',
      function: 'Customer Support',
      process: 'Chatbot Implementation',
      businessGroup: 'SupportTech',
      projectName: 'AI Chatbot for Customer Support',
      projectDescription: 'Implements a chatbot to automate common customer queries and support tickets.',
      projectSME: 'David Brown, Emily White',
      applications: 'Dialogflow, Node.js',
      annualizedRWH: 9700,
      demandID: 1004
    },
    {
      link: 'https://example.com/marketing_automation',
      function: 'Marketing',
      process: 'Campaign Management',
      businessGroup: 'MarketingOps',
      projectName: 'Automated Email Campaigns',
      projectDescription: 'Uses AI to personalize and schedule marketing emails based on customer behavior.',
      projectSME: 'Lisa Black, Mark Grey',
      applications: 'HubSpot, Salesforce',
      annualizedRWH: 7800,
      demandID: 1005
    }
  ];

  // Filter projects based on search input
  const filteredProjects = projects.filter(
    (project) =>
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.process.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.businessGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#F4F7FE', minHeight: '100vh' }}>
      {/* Page Header */}
      <Typography variant="h4" fontWeight="bold" sx={{ color: '#1E3A8A', marginBottom: '20px' }}>
        Solution Hub 📂
      </Typography>

      {/* Search & Filter Section */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search for a Project"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <Select fullWidth defaultValue="All">
            <MenuItem value="All">Function: All</MenuItem>
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Human Resources">Human Resources</MenuItem>
            <MenuItem value="Customer Support">Customer Support</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6} md={3}>
          <Select fullWidth defaultValue="All">
            <MenuItem value="All">Business Group: All</MenuItem>
            <MenuItem value="TechOps">TechOps</MenuItem>
            <MenuItem value="FinanceOps">FinanceOps</MenuItem>
            <MenuItem value="HR Solutions">HR Solutions</MenuItem>
            <MenuItem value="SupportTech">SupportTech</MenuItem>
            <MenuItem value="MarketingOps">MarketingOps</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* Projects Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">📊 Available Automation Solutions</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Function</TableCell>
                <TableCell>Process</TableCell>
                <TableCell>Business Group</TableCell>
                <TableCell>Project Description</TableCell>
                <TableCell>Project SME</TableCell>
                <TableCell>Applications</TableCell>
                <TableCell>Annualized RWH</TableCell>
                <TableCell>Demand ID</TableCell>
                <TableCell>Documentation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects.map((project, index) => (
                <TableRow key={index}>
                  <TableCell>{project.projectName}</TableCell>
                  <TableCell>{project.function}</TableCell>
                  <TableCell>{project.process}</TableCell>
                  <TableCell>{project.businessGroup}</TableCell>
                  <TableCell sx={{ maxWidth: 250, whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {project.projectDescription}
                  </TableCell>
                  <TableCell>{project.projectSME}</TableCell>
                  <TableCell>{project.applications}</TableCell>
                  <TableCell>{project.annualizedRWH.toLocaleString()}</TableCell>
                  <TableCell>{project.demandID}</TableCell>
                  <TableCell>
                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                      🔗 Open
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SolutionHub;
