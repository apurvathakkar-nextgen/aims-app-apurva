import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  TextField,
  Pagination,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';

// Initial data for the table
const initialIdeas = [
  {
    id: 'AIM/635981',
    date: '10-02-2025',
    requestor: 'Jones Davis',
    processName: 'dvcV',
    selectedProcess: 'Process Assessment IDP',
    businessCriticality: 'Medium',
    platform: false,
    process: false,
    value: '',
    cost: '',
    status: 'Pending',
  },
  {
    id: 'AIM/182089',
    date: '10-02-2025',
    requestor: 'Michael Brown',
    processName: 'fwfqfqfweqfqff',
    selectedProcess: 'Process Assessment IDP',
    businessCriticality: 'High',
    platform: true,
    process: false,
    value: '',
    cost: '',
    status: 'In Progress',
  },
  {
    id: 'AIM/322090',
    date: '11-02-2025',
    requestor: 'Robert Miller',
    processName: 'test',
    selectedProcess: 'Process Assessment RPA',
    businessCriticality: 'High',
    platform: true,
    process: false,
    value: '',
    cost: '',
    status: 'Completed',
  },
  {
    id: 'AIM/299008',
    date: '09-02-2025',
    requestor: 'Jennifer Smith',
    processName: 'Testing RPA',
    selectedProcess: 'Process Assessment IDP',
    businessCriticality: 'Medium',
    platform: true,
    process: false,
    value: '',
    cost: '',
    status: 'Pending',
  },
];

const IdeaManagementPage: React.FC = () => {
  // State for managing ideas
  const [ideas, setIdeas] = useState(initialIdeas);

  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // State for filters
  const [filters, setFilters] = useState({
    requestor: '',
    businessCriticality: '',
  });

  // State for sorting
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // State for pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // State for new idea form
  const [newIdea, setNewIdea] = useState({
    id: '',
    date: '',
    requestor: '',
    processName: '',
    selectedProcess: '',
    businessCriticality: 'Medium',
    platform: false,
    process: false,
    value: '',
    cost: '',
    status: 'Pending',
  });

  // Function to add a new idea
  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    setIdeas([...ideas, { ...newIdea, id: `AIM/${Math.floor(Math.random() * 1000000)}` }]);
    setNewIdea({
      id: '',
      date: '',
      requestor: '',
      processName: '',
      selectedProcess: '',
      businessCriticality: 'Medium',
      platform: false,
      process: false,
      value: '',
      cost: '',
      status: 'Pending',
    });
  };

  // Filter ideas based on search term and filters
  const filteredIdeas = ideas.filter((idea) =>
    idea.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.requestor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.processName.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((idea) =>
    (filters.requestor ? idea.requestor === filters.requestor : true) &&
    (filters.businessCriticality ? idea.businessCriticality === filters.businessCriticality : true)
  );

  // Sort ideas based on sortConfig
  const sortedIdeas = [...filteredIdeas].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  // Paginate ideas
  const paginatedIdeas = sortedIdeas.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Handle page change for pagination
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Handle sorting when a column header is clicked
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Innovation Summary</h1>
      <h2>New Idea</h2>
      <h3>Page {page} of {Math.ceil(filteredIdeas.length / rowsPerPage)}</h3>

      {/* Add New Idea Form */}
      <form onSubmit={handleAddIdea} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <TextField
          label="Idea ID"
          value={newIdea.id}
          onChange={(e) => setNewIdea({ ...newIdea, id: e.target.value })}
          required
        />
        <TextField
          label="Date"
          type="date"
          value={newIdea.date}
          onChange={(e) => setNewIdea({ ...newIdea, date: e.target.value })}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Requestor"
          value={newIdea.requestor}
          onChange={(e) => setNewIdea({ ...newIdea, requestor: e.target.value })}
          required
        />
        <TextField
          label="Process Name"
          value={newIdea.processName}
          onChange={(e) => setNewIdea({ ...newIdea, processName: e.target.value })}
          required
        />
        <FormControl>
          <InputLabel>Business Criticality</InputLabel>
          <Select
            value={newIdea.businessCriticality}
            onChange={(e) => setNewIdea({ ...newIdea, businessCriticality: e.target.value as string })}
            required
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Idea
        </Button>
      </form>

      {/* Search Bar and Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <TextField
          fullWidth
          placeholder="Search by Idea ID, Requestor, or Process Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon style={{ marginRight: '10px', color: '#666' }} />,
          }}
        />
        <FormControl>
          <InputLabel>Requestor</InputLabel>
          <Select
            value={filters.requestor}
            onChange={(e) => setFilters({ ...filters, requestor: e.target.value as string })}
          >
            <MenuItem value="">All</MenuItem>
            {Array.from(new Set(ideas.map((idea) => idea.requestor))).map((requestor) => (
              <MenuItem key={requestor} value={requestor}>{requestor}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Business Criticality</InputLabel>
          <Select
            value={filters.businessCriticality}
            onChange={(e) => setFilters({ ...filters, businessCriticality: e.target.value as string })}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Table */}
      <TableContainer component={Paper} style={{ borderRadius: '8px', overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#f5f5f5' }}>
              <TableCell style={{ fontWeight: 'bold' }} onClick={() => requestSort('id')}>
                Idea {sortConfig?.key === 'id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }} onClick={() => requestSort('date')}>
                Date {sortConfig?.key === 'date' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }} onClick={() => requestSort('requestor')}>
                Requestor {sortConfig?.key === 'requestor' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }} onClick={() => requestSort('processName')}>
                Process Name {sortConfig?.key === 'processName' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Selected Process</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Business Criticality</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Idea</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Platform</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Process</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Value</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Cost</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedIdeas.map((idea) => (
              <TableRow key={idea.id} hover style={{ cursor: 'pointer' }}>
                <TableCell>{idea.id}</TableCell>
                <TableCell>{idea.date}</TableCell>
                <TableCell>{idea.requestor}</TableCell>
                <TableCell>{idea.processName}</TableCell>
                <TableCell>{idea.selectedProcess}</TableCell>
                <TableCell>{idea.businessCriticality}</TableCell>
                <TableCell>
                  <Checkbox checked={true} disabled />
                </TableCell>
                <TableCell>
                  <Checkbox checked={idea.platform} disabled />
                </TableCell>
                <TableCell>
                  <Checkbox checked={idea.process} disabled />
                </TableCell>
                <TableCell>{idea.value}</TableCell>
                <TableCell>{idea.cost}</TableCell>
                <TableCell>{idea.status}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(filteredIdeas.length / rowsPerPage)}
        page={page}
        onChange={handlePageChange}
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default IdeaManagementPage;