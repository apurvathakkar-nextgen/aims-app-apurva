import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Select, MenuItem } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Treemap } from 'recharts';

const BusinessImpact: React.FC = () => {
  // Mocked Key Metrics Data
  const keyMetrics = [
    { title: 'Total Benefits', value: '$28.5M', color: '#007BFF' },
    { title: 'Redeployment', value: '$25.1M', color: '#28A745' },
    { title: 'Cost Avoidance', value: '$480.3K', color: '#FFC107' },
    { title: 'Cost Out', value: '$18.2K', color: '#DC3545' },
    { title: 'Other Benefits', value: '$1.9M', color: '#17A2B8' },
    { title: 'Free Cash Flow', value: '$6.4M', color: '#6F42C1' }
  ];

  // Mocked Treemap Data (Annualized Benefit by Business Group)
  const businessGroupsData = [
    { name: 'North America', size: 7.2 },
    { name: 'Europe', size: 6.5 },
    { name: 'Asia Pacific', size: 5.8 },
    { name: 'Latin America', size: 4.1 },
    { name: 'Middle East', size: 3.3 }
  ];

  // Mocked Cost Out Benefits Data
  const costOutData = [
    { category: 'Reduced Operational Costs', amount: 7.1 },
    { category: 'Elimination of Manual Processing', amount: 5.4 }
  ];

  // Mocked Cost Avoidance Benefits Data
  const costAvoidanceData = [
    { category: 'Elimination of Additional Hires', amount: 310.2 },
    { category: 'Optimized IT Infrastructure', amount: 140.5 }
  ];

  // Mocked Other Benefits Data
  const otherBenefitsData = [
    { category: 'New Revenue Streams', amount: 1.6 },
    { category: 'System Maintenance Savings', amount: 0.7 }
  ];

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#F4F7FE', minHeight: '100vh' }}>
      {/* Page Header */}
      <Typography variant="h4" fontWeight="bold" sx={{ color: '#1E3A8A', marginBottom: '20px' }}>
        Business Impact Dashboard 💰
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
            <MenuItem value="All">Automation Type: All</MenuItem>
            <MenuItem value="AI/ML">AI/ML</MenuItem>
            <MenuItem value="Cloud Solutions">Cloud Solutions</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <Select fullWidth defaultValue="All">
            <MenuItem value="All">Benefit Type: All</MenuItem>
            <MenuItem value="Cost Reduction">Cost Reduction</MenuItem>
            <MenuItem value="Revenue Increase">Revenue Increase</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* Key Metrics */}
      <Grid container spacing={3}>
        {keyMetrics.map((metric, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ background: '#FFF', borderLeft: `6px solid ${metric.color}` }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{metric.title}</Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ color: metric.color }}>
                  {metric.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ marginTop: '20px' }}>
        {/* Treemap for Business Group Benefits */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">📊 Total Annualized Benefit by Region</Typography>
              <Treemap width={500} height={300} data={businessGroupsData} dataKey="size" stroke="#fff" />
            </CardContent>
          </Card>
        </Grid>

        {/* Cost Out Benefits */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">📉 Cost Out Benefits</Typography>
              <BarChart width={500} height={300} data={costOutData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#DC3545" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Cost Avoidance Benefits */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">💰 Cost Avoidance Benefits</Typography>
              <BarChart width={500} height={300} data={costAvoidanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#28A745" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Other Benefits */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">🔹 Other Benefits</Typography>
              <BarChart width={500} height={300} data={otherBenefitsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#17A2B8" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessImpact;
