import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ArrowUpward, ArrowDownward, UnfoldMore } from '@mui/icons-material'; // Icons for sorting

// Import your components
import ProjectPlanning from './ProjectPlanning.tsx'; // Adjust the path if necessary
import ProjectDevelopment from './ProjectDevelopment.tsx'; // Adjust the path if necessary
import ProjectTesting from './ProjectTesting.tsx'; // Adjust the path if necessary
import ProjectDeployment from './ProjectDeployment.tsx'; // Adjust the path if necessary

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProjectSummary = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' }); // 'none', 'asc', 'desc'

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  // Sample project data
  const projects = [
    { id: 1, name: 'Project Alpha', status: 'In Progress', deadline: '2023-12-31' },
    { id: 2, name: 'Project Beta', status: 'Completed', deadline: '2023-11-15' },
    { id: 3, name: 'Project Gamma', status: 'Not Started', deadline: '2024-01-20' },
  ];

  // Filter projects by status
  const filteredProjects = filterStatus === 'All'
    ? projects
    : projects.filter((project) => project.status === filterStatus);

  // Sorting logic
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = 'none';
      }
    }
    setSortConfig({ key, direction });
  };

  // Summary data for the chart
  const summaryData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        label: 'Projects',
        data: [
          projects.filter((project) => project.status === 'Completed').length,
          projects.filter((project) => project.status === 'In Progress').length,
          projects.filter((project) => project.status === 'Not Started').length,
        ],
        backgroundColor: ['#4caf50', '#ffa726', '#f44336'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to control size
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Project Status Distribution',
      },
    },
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', color: '#004aad', fontWeight: 'bold', mb: 3 }}>
        Project Summary
      </Typography>

      {/* Tabs */}
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Summary" />
        <Tab label="Project Planning" />
        <Tab label="Project Development" />
        <Tab label="Project Testing" />
        <Tab label="Project Deployment" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        {/* Summary Tab */}
        {selectedTab === 0 && (
          <Box>
            {/* Graph Visualization */}
            <Box sx={{ width: '300px', height: '200px', mb: 4 }}>
              <Bar data={summaryData} options={chartOptions} />
            </Box>

            {/* Filter by Status */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Filter by Status</InputLabel>
              <Select value={filterStatus} onChange={handleFilterChange} label="Filter by Status">
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Not Started">Not Started</MenuItem>
              </Select>
            </FormControl>

            {/* Project List Table */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#004aad' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Project ID
                        <IconButton size="small" onClick={() => handleSort('id')}>
                          {sortConfig.key === 'id' && sortConfig.direction === 'asc' && <ArrowUpward sx={{ color: 'white' }} />}
                          {sortConfig.key === 'id' && sortConfig.direction === 'desc' && <ArrowDownward sx={{ color: 'white' }} />}
                          {sortConfig.key !== 'id' && <UnfoldMore sx={{ color: 'white' }} />}
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Project Name
                        <IconButton size="small" onClick={() => handleSort('name')}>
                          {sortConfig.key === 'name' && sortConfig.direction === 'asc' && <ArrowUpward sx={{ color: 'white' }} />}
                          {sortConfig.key === 'name' && sortConfig.direction === 'desc' && <ArrowDownward sx={{ color: 'white' }} />}
                          {sortConfig.key !== 'name' && <UnfoldMore sx={{ color: 'white' }} />}
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Status
                        <IconButton size="small" onClick={() => handleSort('status')}>
                          {sortConfig.key === 'status' && sortConfig.direction === 'asc' && <ArrowUpward sx={{ color: 'white' }} />}
                          {sortConfig.key === 'status' && sortConfig.direction === 'desc' && <ArrowDownward sx={{ color: 'white' }} />}
                          {sortConfig.key !== 'status' && <UnfoldMore sx={{ color: 'white' }} />}
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Deadline
                        <IconButton size="small" onClick={() => handleSort('deadline')}>
                          {sortConfig.key === 'deadline' && sortConfig.direction === 'asc' && <ArrowUpward sx={{ color: 'white' }} />}
                          {sortConfig.key === 'deadline' && sortConfig.direction === 'desc' && <ArrowDownward sx={{ color: 'white' }} />}
                          {sortConfig.key !== 'deadline' && <UnfoldMore sx={{ color: 'white' }} />}
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedProjects.map((project, index) => (
                    <TableRow key={project.id} sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#e0e0e0' }}>
                      <TableCell>{project.id}</TableCell>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{project.status}</TableCell>
                      <TableCell>{project.deadline}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Other Tabs */}
        {selectedTab === 1 && <ProjectPlanning />}
        {selectedTab === 2 && <ProjectDevelopment />}
        {selectedTab === 3 && <ProjectTesting />}
        {selectedTab === 4 && <ProjectDeployment />}
      </Box>
    </Box>
  );
};

export default ProjectSummary;