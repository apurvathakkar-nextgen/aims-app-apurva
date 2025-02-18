import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, Legend } from 'recharts';

const DeliveryDashboard: React.FC = () => {
  // Sample Data
  const automationProgress = [
    { month: 'March', completed: 2, rwh: 20000 },
    { month: 'April', completed: 18, rwh: 80000 },
    { month: 'May', completed: 21, rwh: 100000 },
    { month: 'June', completed: 20, rwh: 95000 },
    { month: 'July', completed: 8, rwh: 50000 },
    { month: 'August', completed: 11, rwh: 55000 },
    { month: 'September', completed: 12, rwh: 60000 },
    { month: 'October', completed: 10, rwh: 45000 },
    { month: 'November', completed: 12, rwh: 50000 },
    { month: 'December', completed: 18, rwh: 75000 },
  ];

  const upcomingProjects = [
    { month: 'February', projects: 7 },
    { month: 'March', projects: 11 },
    { month: 'April', projects: 7 },
  ];

  const deployedByFunction = [
    { function: 'Customer Care', rwh: 23000 },
    { function: 'Finance', rwh: 11000 },
    { function: 'Marketing', rwh: 5000 },
    { function: 'Quality', rwh: 5000 },
    { function: 'Operations', rwh: 5000 },
    { function: 'Supply Chain', rwh: 0 },
    { function: 'HR', rwh: 0 },
    { function: 'Other', rwh: 0 },
  ];

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#F4F7FE', minHeight: '100vh' }}>
      {/* Page Header */}
      <Typography variant="h4" fontWeight="bold" sx={{ color: '#1E3A8A', marginBottom: '20px' }}>
        Delivery Dashboard 🚀
      </Typography>

      {/* Key Metrics Grid */}
      <Grid container spacing={3}>
        {/* Live Automations */}
        <Grid item xs={12} md={3}>
          <Card sx={{ background: '#FFF', borderLeft: '6px solid #4CAF50' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold"># of Automations Live</Typography>
              <Typography variant="h4" fontWeight="bold" color="green">24</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total RWH for Live Automations */}
        <Grid item xs={12} md={3}>
          <Card sx={{ background: '#FFF', borderLeft: '6px solid #2196F3' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Total RWH (Live Automations)</Typography>
              <Typography variant="h4" fontWeight="bold" color="blue">49K</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Automations in Progress */}
        <Grid item xs={12} md={3}>
          <Card sx={{ background: '#FFF', borderLeft: '6px solid #FF9800' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold"># of Automations In Progress</Typography>
              <Typography variant="h4" fontWeight="bold" color="orange">33</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total RWH for In-Progress Automations */}
        <Grid item xs={12} md={3}>
          <Card sx={{ background: '#FFF', borderLeft: '6px solid #9C27B0' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Total RWH (In Progress)</Typography>
              <Typography variant="h4" fontWeight="bold" color="purple">69K</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ marginTop: '20px' }}>
        {/* Monthly Trend Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">📈 Monthly Trend on Completed Automations</Typography>
              <LineChart width={500} height={300} data={automationProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="completed" stroke="#FF5733" />
                <Line type="monotone" dataKey="rwh" stroke="#3498db" />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Projected Go Live */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">📊 Projected Go Live Next 3 Months</Typography>
              <BarChart width={350} height={300} data={upcomingProjects}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="projects" fill="#FF9800" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Deployed Automations by Function */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">🏆 Deployed Automations by Function</Typography>
              <BarChart width={350} height={300} data={deployedByFunction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="function" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="rwh" fill="#4CAF50" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeliveryDashboard;
