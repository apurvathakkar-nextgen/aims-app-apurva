import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Select, MenuItem, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const PerformanceAnalytics: React.FC = () => {
  // Mocked Data for Actual RWH Savings by Month
  const rwhSavingsData = [
    { month: 'January', savings: 0.2 },
    { month: 'February', savings: 0.4 },
    { month: 'March', savings: 1.2 },
    { month: 'April', savings: 1.5 }
  ];

  // Mocked Data for Transaction Success Rate by Business Group
  const successRateData = [
    { group: 'FinanceOps', rate: 98 },
    { group: 'Tech Solutions', rate: 95 },
    { group: 'HR Services', rate: 93 },
    { group: 'Logistics Team', rate: 90 },
    { group: 'Retail Support', rate: 88 }
  ];

  // Mocked Data for Exception Breakdown
  const exceptionData = [
    { name: 'Business Rule Exceptions', value: 42 },
    { name: 'Technical Exceptions', value: 58 }
  ];
  const COLORS = ['#4CAF50', '#E53935'];

  // Mocked Data for Actual vs Estimated Transactions
  const transactionData = [
    {
      businessGroup: 'Payroll Processing',
      estimatedAnnualRWH: 420,
      actualTransactionsYTD: 385,
      successRate: 92
    },
    {
      businessGroup: 'Inventory Audits',
      estimatedAnnualRWH: 980,
      actualTransactionsYTD: 970,
      successRate: 99
    },
    {
      businessGroup: 'Order Management',
      estimatedAnnualRWH: 600,
      actualTransactionsYTD: 590,
      successRate: 98
    }
  ];

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#F4F7FE', minHeight: '100vh' }}>
      {/* Page Header */}
      <Typography variant="h4" fontWeight="bold" sx={{ color: '#1E3A8A', marginBottom: '20px' }}>
        Performance Analytics Dashboard 📊
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item xs={3}>
          <Select fullWidth defaultValue="All">
            <MenuItem value="All">Region: All</MenuItem>
            <MenuItem value="North America">North America</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={3}>
          <Select fullWidth defaultValue="All">
            <MenuItem value="All">Department: All</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={3}>
          <Select fullWidth defaultValue="All">
            <MenuItem value="All">Business Team: All</MenuItem>
            <MenuItem value="Operations">Operations</MenuItem>
            <MenuItem value="Customer Support">Customer Support</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={3}>
          <Select fullWidth defaultValue="All">
            <MenuItem value="All">Exception Type: All</MenuItem>
            <MenuItem value="Business Rule">Business Rule</MenuItem>
            <MenuItem value="Technical">Technical</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* Key Metrics */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: '#FFF', borderLeft: '6px solid #4CAF50' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Actual Hours Saved YTD</Typography>
              <Typography variant="h4" fontWeight="bold" color="green">5M</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: '#FFF', borderLeft: '6px solid #2196F3' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Transaction Success Rate</Typography>
              <Typography variant="h4" fontWeight="bold" color="blue">96%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: '#FFF', borderLeft: '6px solid #FF9800' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Total Projects</Typography>
              <Typography variant="h4" fontWeight="bold" color="orange">278</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ marginTop: '20px' }}>
        {/* Actual RWH Savings by Month */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">📈 Actual RWH Savings by Month</Typography>
              <BarChart width={500} height={300} data={rwhSavingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="savings" fill="#4CAF50" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Exceptions Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">⚠ Exception Breakdown</Typography>
              <PieChart width={400} height={300}>
                <Pie data={exceptionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                  {exceptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Transaction Table */}
      <Card sx={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">📊 Detailed Overview for Actual vs. Estimated Transactional Data</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Business Group</TableCell>
                <TableCell>Estimated Annual RWH</TableCell>
                <TableCell>Actual Transactions YTD</TableCell>
                <TableCell>Success Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.businessGroup}</TableCell>
                  <TableCell>{row.estimatedAnnualRWH}</TableCell>
                  <TableCell>{row.actualTransactionsYTD}</TableCell>
                  <TableCell>{row.successRate}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PerformanceAnalytics;
