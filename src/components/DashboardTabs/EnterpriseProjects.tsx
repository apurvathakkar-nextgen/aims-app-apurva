import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Select, MenuItem } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Treemap } from 'recharts';

const EnterpriseProjects: React.FC = () => {
  // Mocked Data for Automation Value by Function
  const functionData = [
    { function: 'Customer Support', value: 5.2 },
    { function: 'Finance', value: 4.8 },
    { function: 'IT Services', value: 3.1 },
    { function: 'Logistics', value: 2.6 },
    { function: 'Quality Control', value: 1.9 },
    { function: 'HR', value: 1.4 },
    { function: 'Marketing', value: 0.9 }
  ];

  // Mocked Data for Automation Value by Technology
  const technologyData = [
    { technology: 'AI/ML', value: 12.5 },
    { technology: 'Cloud Automation', value: 8.2 },
    { technology: 'Intelligent Document Processing', value: 6.1 },
    { technology: 'Low Code Solutions', value: 4.7 }
  ];

  // Mocked Data for Automation Tools
  const toolsData = [
    { tool: 'Automation Anywhere', value: 45 },
    { tool: 'UiPath', value: 35 },
    { tool: 'Power Automate', value: 15 },
    { tool: 'Custom Scripts', value: 5 }
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Mocked Treemap Data (Annualized RWH by Business Group)
  const businessGroupsData = [
    { name: 'North America', size: 150 },
    { name: 'Europe', size: 140 },
    { name: 'Asia Pacific', size: 130 },
    { name: 'Latin America', size: 110 },
    { name: 'Middle East', size: 90 }
  ];

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#F4F7FE', minHeight: '100vh' }}>
      {/* Page Header */}
      <Typography variant="h4" fontWeight="bold" sx={{ color: '#1E3A8A', marginBottom: '20px' }}>
        Enterprise Projects Dashboard 🚀
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item xs={4}>
          <Select fullWidth defaultValue="All">
            <MenuItem value="All">Region: All</MenuItem>
            <MenuItem value="North America">North America</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <Select fullWidth defaultValue="All">
            <MenuItem value="All">Department: All</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <Select fullWidth defaultValue="All">
            <MenuItem value="All">Function: All</MenuItem>
            <MenuItem value="Customer Support">Customer Support</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* Key Metrics */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ background: '#FFF', borderLeft: '6px solid #4CAF50' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Automation Value (Deployed)</Typography>
              <Typography variant="h4" fontWeight="bold" color="green">$40.2M</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ background: '#FFF', borderLeft: '6px solid #2196F3' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Free Cash Flow</Typography>
              <Typography variant="h4" fontWeight="bold" color="blue">$12.7M</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ background: '#FFF', borderLeft: '6px solid #FF9800' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Automation Value (In Progress)</Typography>
              <Typography variant="h4" fontWeight="bold" color="orange">$18.3M</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ background: '#FFF', borderLeft: '6px solid #9C27B0' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Projected Savings</Typography>
              <Typography variant="h4" fontWeight="bold" color="purple">$2.5M</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ marginTop: '20px' }}>
        {/* Treemap for Business Group RWH */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">📊 Annualized RWH for Automations by Region</Typography>
              <Treemap width={500} height={300} data={businessGroupsData} dataKey="size" stroke="#fff" />
            </CardContent>
          </Card>
        </Grid>

        {/* Automation Value by Function */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">🏆 Automation Value by Function</Typography>
              <BarChart width={500} height={300} data={functionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="function" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4CAF50" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Automation Tools Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">⚙ Automations by Tools</Typography>
              <PieChart width={500} height={300}>
                <Pie data={toolsData} dataKey="value" nameKey="tool" cx="50%" cy="50%" outerRadius={100}>
                  {toolsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EnterpriseProjects;
