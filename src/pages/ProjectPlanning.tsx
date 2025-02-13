import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
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
  LinearProgress,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Popover,
} from '@mui/material';
import { Add as AddIcon, CheckCircle, PlayCircle, Pending, FilterList } from '@mui/icons-material';
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProjectPlanning = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    deadline: '',
    assignedTo: '',
    status: 'Not Started',
    priority: 'Medium',
    sprint: 'Backlog',
    project: 'Project A', // Default project
  });
  const [sprints, setSprints] = useState([
    { id: 1, name: 'Sprint 1', goal: 'Complete initial features', startDate: '2023-10-01', endDate: '2023-10-14' },
    { id: 2, name: 'Sprint 2', goal: 'Refactor and test', startDate: '2023-10-15', endDate: '2023-10-28' },
  ]);
  const [projects, setProjects] = useState(['Project A', 'Project B', 'Project C']); // Sample projects
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSprint, setFilterSprint] = useState('All');
  const [filterProject, setFilterProject] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' }); // Sorting state
  const [visibleColumns, setVisibleColumns] = useState({
    project: true,
    name: true,
    description: true,
    deadline: true,
    assignedTo: true,
    priority: true,
    sprint: true,
    status: true,
    actions: true,
  });
  const [anchorEl, setAnchorEl] = useState(null); // For column visibility popover

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = () => {
    if (newTask.name && newTask.deadline) {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
      setNewTask({
        name: '',
        description: '',
        deadline: '',
        assignedTo: '',
        status: 'Not Started',
        priority: 'Medium',
        sprint: 'Backlog',
        project: 'Project A',
      });
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleSprintChange = (taskId, newSprint) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, sprint: newSprint } : task
    );
    setTasks(updatedTasks);
  };

  const handleProjectChange = (taskId, newProject) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, project: newProject } : task
    );
    setTasks(updatedTasks);
  };

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

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortConfig.key && sortConfig.direction !== 'none') {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredTasks = sortedTasks.filter((task) => {
    const statusMatch = filterStatus === 'All' || task.status === filterStatus;
    const sprintMatch = filterSprint === 'All' || task.sprint === filterSprint;
    const projectMatch = filterProject === 'All' || task.project === filterProject;
    return statusMatch && sprintMatch && projectMatch;
  });

  const progress = (tasks.filter((task) => task.status === 'Completed').length / tasks.length) * 100 || 0;

  // Burndown chart data
  const burndownData = {
    labels: sprints.map((sprint) => sprint.name),
    datasets: [
      {
        label: 'Tasks Remaining',
        data: sprints.map((sprint) =>
          tasks.filter((task) => task.sprint === sprint.name && task.status !== 'Completed').length
        ),
        backgroundColor: '#004aad',
      },
    ],
  };

  const burndownOptions = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to control size
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Burndown Chart',
      },
    },
  };

  const handleColumnVisibilityChange = (column) => {
    setVisibleColumns({ ...visibleColumns, [column]: !visibleColumns[column] });
  };

  const handleColumnVisibilityMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleColumnVisibilityMenuClose = () => {
    setAnchorEl(null);
  };

  const columns = [
    { key: 'project', label: 'Project' },
    { key: 'name', label: 'Task Name' },
    { key: 'description', label: 'Description' },
    { key: 'deadline', label: 'Deadline' },
    { key: 'assignedTo', label: 'Assigned To' },
    { key: 'priority', label: 'Priority' },
    { key: 'sprint', label: 'Sprint' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#004aad' }}>
        Project Planning
      </Typography>

      {/* Progress Bar */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Overall Progress: {progress.toFixed(2)}%
        </Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
      </Box>

      {/* Burndown Chart */}
      <Box sx={{ width: '300px', height: '200px', mb: 4 }}> {/* Reduced size */}
        <Bar data={burndownData} options={burndownOptions} />
      </Box>

      {/* Add New Task Form */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add New Task
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Task Name"
            name="name"
            value={newTask.name}
            onChange={handleInputChange}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Description"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Deadline"
            type="date"
            name="deadline"
            value={newTask.deadline}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Assigned To"
            name="assignedTo"
            value={newTask.assignedTo}
            onChange={handleInputChange}
            sx={{ flex: 1 }}
          />
          <FormControl sx={{ flex: 1 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
              label="Priority"
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel>Sprint</InputLabel>
            <Select
              name="sprint"
              value={newTask.sprint}
              onChange={handleInputChange}
              label="Sprint"
            >
              <MenuItem value="Backlog">Backlog</MenuItem>
              {sprints.map((sprint) => (
                <MenuItem key={sprint.id} value={sprint.name}>
                  {sprint.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel>Project</InputLabel>
            <Select
              name="project"
              value={newTask.project}
              onChange={handleInputChange}
              label="Project"
            >
              {projects.map((project) => (
                <MenuItem key={project} value={project}>
                  {project}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddTask}
            sx={{ flex: 1, backgroundColor: '#004aad', '&:hover': { backgroundColor: '#003882' } }}
          >
            Add Task
          </Button>
        </Box>
      </Box>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl sx={{ flex: 1 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label="Filter by Status"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ flex: 1 }}>
          <InputLabel>Filter by Sprint</InputLabel>
          <Select
            value={filterSprint}
            onChange={(e) => setFilterSprint(e.target.value)}
            label="Filter by Sprint"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Backlog">Backlog</MenuItem>
            {sprints.map((sprint) => (
              <MenuItem key={sprint.id} value={sprint.name}>
                {sprint.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ flex: 1 }}>
          <InputLabel>Filter by Project</InputLabel>
          <Select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            label="Filter by Project"
          >
            <MenuItem value="All">All</MenuItem>
            {projects.map((project) => (
              <MenuItem key={project} value={project}>
                {project}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          onClick={handleColumnVisibilityMenuOpen}
        >
          Columns
        </Button>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleColumnVisibilityMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Box sx={{ p: 2 }}>
            <FormGroup>
              {columns.map((column) => (
                <FormControlLabel
                  key={column.key}
                  control={
                    <Checkbox
                      checked={visibleColumns[column.key]}
                      onChange={() => handleColumnVisibilityChange(column.key)}
                    />
                  }
                  label={column.label}
                />
              ))}
            </FormGroup>
          </Box>
        </Popover>
      </Box>

      {/* Task List */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#004aad' }}>
              {columns.map((column) =>
                visibleColumns[column.key] ? (
                  <TableCell
                    key={column.key}
                    sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                    onClick={() => handleSort(column.key)}
                  >
                    {column.label}
                    {sortConfig.key === column.key && (
                      <span>
                        {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </TableCell>
                ) : null
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id} sx={{ backgroundColor: task.status === 'Completed' ? '#e8f5e9' : '#fff3e0' }}>
                {visibleColumns.project && <TableCell>{task.project}</TableCell>}
                {visibleColumns.name && <TableCell>{task.name}</TableCell>}
                {visibleColumns.description && <TableCell>{task.description}</TableCell>}
                {visibleColumns.deadline && <TableCell>{task.deadline}</TableCell>}
                {visibleColumns.assignedTo && <TableCell>{task.assignedTo}</TableCell>}
                {visibleColumns.priority && <TableCell>{task.priority}</TableCell>}
                {visibleColumns.sprint && (
                  <TableCell>
                    <Select
                      value={task.sprint}
                      onChange={(e) => handleSprintChange(task.id, e.target.value)}
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value="Backlog">Backlog</MenuItem>
                      {sprints.map((sprint) => (
                        <MenuItem key={sprint.id} value={sprint.name}>
                          {sprint.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                )}
                {visibleColumns.status && (
                  <TableCell>
                    <Select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value="Not Started">Not Started</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </TableCell>
                )}
                {visibleColumns.actions && (
                  <TableCell>
                    {task.status === 'Not Started' && <Pending sx={{ color: '#f44336' }} />}
                    {task.status === 'In Progress' && <PlayCircle sx={{ color: '#ffa726' }} />}
                    {task.status === 'Completed' && <CheckCircle sx={{ color: '#4caf50' }} />}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProjectPlanning;