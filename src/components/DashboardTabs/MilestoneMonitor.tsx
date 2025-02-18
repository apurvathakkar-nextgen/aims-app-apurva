import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody, LinearProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const MilestoneMonitor: React.FC = () => {
  // Mocked Sample Data
  const milestoneData = [
    {
      businessGroup: 'North America',
      annualTarget: 50000,
      deployed: 12000,
      plannedGoLive: 8000,
      inProgress: 10000,
      newOpportunities: 15000,
      overallStatus: 'green'
    },
    {
      businessGroup: 'Europe',
      annualTarget: 45000,
      deployed: 15000,
      plannedGoLive: 6000,
      inProgress: 7000,
      newOpportunities: 12000,
      overallStatus: 'green'
    },
    {
      businessGroup: 'Asia Pacific',
      annualTarget: 60000,
      deployed: 18000,
      plannedGoLive: 9000,
      inProgress: 12000,
      newOpportunities: 17000,
      overallStatus: 'red'
    },
    {
      businessGroup: 'Latin America',
      annualTarget: 30000,
      deployed: 9000,
      plannedGoLive: 5000,
      inProgress: 6000,
      newOpportunities: 11000,
      overallStatus: 'red'
    }
  ];

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#F4F7FE', minHeight: '100vh' }}>
      {/* Page Header */}
      <Typography variant="h4" fontWeight="bold" sx={{ color: '#1E3A8A', marginBottom: '20px' }}>
        Milestone Monitor 📊
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={3}>
        {milestoneData.slice(0, 3).map((group, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ background: '#FFF', borderLeft: `6px solid ${group.overallStatus === 'green' ? '#28A745' : '#DC3545'}` }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{group.businessGroup} - Annual Target</Typography>
                <Typography variant="h4" fontWeight="bold">{group.annualTarget.toLocaleString()} RWH</Typography>
                <Typography variant="body2" color="textSecondary">
                  Deployed: {group.deployed.toLocaleString()} RWH
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(group.deployed / group.annualTarget) * 100}
                  sx={{ height: 8, marginTop: '10px', borderRadius: 5, backgroundColor: '#E0E0E0' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Table View */}
      <Card sx={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">📊 Milestone Progress</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Business Group</TableCell>
                <TableCell>Annual Target (RWH)</TableCell>
                <TableCell>Deployed (RWH)</TableCell>
                <TableCell>Planned Go-Live (RWH)</TableCell>
                <TableCell>In Progress (RWH)</TableCell>
                <TableCell>New Opportunities (RWH)</TableCell>
                <TableCell>Overall Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {milestoneData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.businessGroup}</TableCell>
                  <TableCell>{row.annualTarget.toLocaleString()}</TableCell>
                  <TableCell>{row.deployed.toLocaleString()}</TableCell>
                  <TableCell>{row.plannedGoLive.toLocaleString()}</TableCell>
                  <TableCell>{row.inProgress.toLocaleString()}</TableCell>
                  <TableCell>{row.newOpportunities.toLocaleString()}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 15,
                        height: 15,
                        borderRadius: '50%',
                        backgroundColor: row.overallStatus === 'green' ? '#28A745' : '#DC3545'
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bar Chart Visualization */}
      <Grid container spacing={3} sx={{ marginTop: '20px' }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">📈 RWH Target vs Deployed</Typography>
              <BarChart width={500} height={300} data={milestoneData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="businessGroup" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="annualTarget" fill="#4CAF50" name="Annual Target" />
                <Bar dataKey="deployed" fill="#2196F3" name="Deployed" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">📊 In Progress vs New Opportunities</Typography>
              <BarChart width={500} height={300} data={milestoneData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="businessGroup" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="inProgress" fill="#FF9800" name="In Progress" />
                <Bar dataKey="newOpportunities" fill="#9C27B0" name="New Opportunities" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MilestoneMonitor;
