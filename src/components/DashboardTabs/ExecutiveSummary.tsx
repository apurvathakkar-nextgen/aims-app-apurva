import React from 'react';
import { Typography, Box, Paper, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ScatterChart, Scatter, BarChart, Bar } from 'recharts';

const ExecutiveSummary = () => {
  // Sample data for deployed metrics
  const deployedData = {
    total: { count: 829, rwh: '2M' },
    current: { count: 24, rwh: '49K' }
  };

  // Sample data for the historical chart
  const historicalData = [
    { year: '2021', value: 186 },
    { year: '2022', value: 409 },
    { year: '2023', value: 440 },
    { year: '2024', value: 507 },
    { year: '2025', value: 49 }
  ];

  // Sample data for pipeline trend
  const pipelineData = [
    { month: 'Mar', value2024: 4, value2025: 0 },
    { month: 'Apr', value2024: 32, value2025: 0 },
    { month: 'May', value2024: 20, value2025: 0 },
    { month: 'Jun', value2024: 29, value2025: 0 },
    { month: 'Jul', value2024: 51, value2025: 0 },
    { month: 'Aug', value2024: 35, value2025: 0 },
    { month: 'Sep', value2024: 17, value2025: 0 },
    { month: 'Oct', value2024: 20, value2025: 0 },
    { month: 'Nov', value2024: 12, value2025: 0 },
    { month: 'Dec', value2024: 9, value2025: 0 },
    { month: 'Jan', value2024: 0, value2025: 30 },
    { month: 'Feb', value2024: 0, value2025: 20 }
  ];

  return (
    <Box sx={{ p: 2 }}>
      {/* Header Section */}
      <Paper sx={{ p: 2, mb: 2, bgcolor: 'grey.100' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4">Executive Summary</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              How are we performing?
            </Typography>
            <Typography variant="body2">YTD 2025</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            Last Refreshed (UTC) 2/17/2025 5:33:12 AM
          </Typography>
        </Box>
      </Paper>

      {/* Metrics Grid */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {/* Deployed */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Deployed</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h4" color="error">{deployedData.total.count}</Typography>
                <Typography variant="caption" color="text.secondary">Count</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h4" color="error">{deployedData.total.rwh}</Typography>
                <Typography variant="caption" color="text.secondary">RWH</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* In Progress */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">In Progress</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h4" color="error">33</Typography>
                <Typography variant="caption" color="text.secondary">Count</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h4" color="error">69K</Typography>
                <Typography variant="caption" color="text.secondary">RWH</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Pipeline */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Pipeline</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h4" color="error">157</Typography>
                <Typography variant="caption" color="text.secondary">Count</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h4" color="error">225K</Typography>
                <Typography variant="caption" color="text.secondary">RWH</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Target vs Actual */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Actual vs Target RWH 2025</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="h4">49K</Typography>
              <Typography variant="body1" color="text.secondary">500K</Typography>
            </Box>
            <Box sx={{ width: '100%', bgcolor: 'grey.200', height: 8, borderRadius: 4 }}>
              <Box sx={{ width: '10%', bgcolor: 'error.main', height: 8, borderRadius: 4 }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={2}>
        {/* Historical Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Actual Annualized RWH for Deployed Automations
            </Typography>
            <LineChart width={400} height={200} data={historicalData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </Paper>
        </Grid>

        {/* Pipeline Trend Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              How is our Pipeline trending?
            </Typography>
            <BarChart width={400} height={200} data={pipelineData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value2024" fill="#8884d8" />
              <Bar dataKey="value2025" fill="#82ca9d" />
            </BarChart>
          </Paper>
        </Grid>

        {/* Business Teams Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Total New Opportunities by Business Teams
            </Typography>
            <ScatterChart width={400} height={200}>
              <XAxis type="number" dataKey="x" name="Opportunities" />
              <YAxis type="number" dataKey="y" name="RWH" />
              <Tooltip />
              <Scatter
                name="Teams"
                data={[
                  { x: 60, y: 100000, z: 200, name: 'Team 1' },
                  { x: 20, y: 50000, z: 100, name: 'Team 2' },
                  { x: 10, y: 20000, z: 50, name: 'Team 3' }
                ]}
                fill="#8884d8"
              />
            </ScatterChart>
          </Paper>
        </Grid>
      </Grid>

      {/* Business Teams Progress */}
      <Paper sx={{ p: 2, mt: 2, bgcolor: 'black', color: 'white' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Number of In Progress Automations by Business Teams
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography>BU 1</Typography>
          <Typography>BU 6</Typography>
          <Typography>BU 4</Typography>
          <Typography>BU 3</Typography>
          <Typography>BU 2</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ExecutiveSummary;