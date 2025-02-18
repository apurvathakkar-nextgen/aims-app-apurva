import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Info, TrendingUp, Assessment } from '@mui/icons-material';

const PipelineDashboard: React.FC = () => {
  const [engagementModel, setEngagementModel] = useState('All');
  const [function_, setFunction] = useState('All');
  const [businessTeam, setBusinessTeam] = useState('All');

  // Mocked data for the stacked bar chart
  const opportunityData = [
    { team: 'North America', new: 18, onhold: 12, poc: 5, qualified: 7, validated: 10 },
    { team: 'Europe', new: 12, onhold: 8, poc: 3, qualified: 5, validated: 7 },
    { team: 'Asia Pacific', new: 15, onhold: 9, poc: 6, qualified: 8, validated: 12 },
    { team: 'Latin America', new: 10, onhold: 7, poc: 4, qualified: 6, validated: 8 },
    { team: 'Middle East', new: 9, onhold: 6, poc: 2, qualified: 4, validated: 5 }
  ];

  // Mocked status summary data
  const statusSummary = [
    { status: 'New', count: 150, rwh: 102000 },
    { status: 'Qualified', count: 75, rwh: 89000 },
    { status: 'On hold', count: 60, rwh: 74000 },
    { status: 'Validated', count: 20, rwh: 38000 },
    { status: 'POC', count: 10, rwh: 12000 }
  ];

  // Mocked top opportunities data
  const topOpportunities = [
    { name: 'AI-Based Fraud Detection', team: 'North America', status: 'Qualified', rwh: 30000 },
    { name: 'Automated Payroll Processing', team: 'Europe', status: 'Validated', rwh: 25000 },
    { name: 'Customer Chatbot Integration', team: 'Asia Pacific', status: 'New', rwh: 18000 },
    { name: 'Smart Inventory Tracking', team: 'Latin America', status: 'New', rwh: 14000 },
    { name: 'Predictive Maintenance System', team: 'Middle East', status: 'Qualified', rwh: 12500 }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'New': '#ffa726',
      'Qualified': '#29b6f6',
      'On hold': '#bdbdbd',
      'Validated': '#fdd835',
      'POC': '#66bb6a'
    };
    return colors[status] || '#000';
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Header with Filters */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: '#f5f5f5' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={9}>
            <Typography variant="h5" sx={{ mb: 2 }}>Pipeline Development Dashboard</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Engagement Model</InputLabel>
                  <Select value={engagementModel} onChange={(e) => setEngagementModel(e.target.value)}>
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Consulting">Consulting</MenuItem>
                    <MenuItem value="Outsourcing">Outsourcing</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Function</InputLabel>
                  <Select value={function_} onChange={(e) => setFunction(e.target.value)}>
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="Operations">Operations</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Business Team</InputLabel>
                  <Select value={businessTeam} onChange={(e) => setBusinessTeam(e.target.value)}>
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="North America">North America</MenuItem>
                    <MenuItem value="Europe">Europe</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, bgcolor: 'primary.dark', color: 'white' }}>
              <Typography variant="h6">Total Pipeline Value</Typography>
              <Typography variant="h4">420,500 RWH</Typography>
              <Typography variant="subtitle2">315 Opportunities</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Status Summary Cards */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6">Status Summary</Typography>
            {statusSummary.map((item) => (
              <Box key={item.status} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Chip 
                    label={item.status}
                    sx={{ 
                      bgcolor: getStatusColor(item.status),
                      color: item.status === 'On hold' ? 'black' : 'white'
                    }}
                  />
                  <Typography variant="body2">{item.count} opportunities</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(item.rwh / 420500) * 100}
                  sx={{ height: 8, borderRadius: 5, bgcolor: 'grey.200' }}
                />
                <Typography variant="caption" color="text.secondary">
                  {item.rwh.toLocaleString()} RWH
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Opportunities by Status Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6"># Opportunities By Status For Business Teams</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={opportunityData}>
                <XAxis dataKey="team" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="new" stackId="a" fill="#ffa726" />
                <Bar dataKey="qualified" stackId="a" fill="#29b6f6" />
                <Bar dataKey="onhold" stackId="a" fill="#bdbdbd" />
                <Bar dataKey="validated" stackId="a" fill="#fdd835" />
                <Bar dataKey="poc" stackId="a" fill="#66bb6a" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Top 5 Opportunities Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Top 5 Opportunities By RWH</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Opportunity Name</TableCell>
                    <TableCell>Business Team</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">RWH</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topOpportunities.map((opp) => (
                    <TableRow key={opp.name}>
                      <TableCell>{opp.name}</TableCell>
                      <TableCell>{opp.team}</TableCell>
                      <TableCell><Chip label={opp.status} sx={{ bgcolor: getStatusColor(opp.status), color: 'white' }} /></TableCell>
                      <TableCell align="right">{opp.rwh.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PipelineDashboard;
