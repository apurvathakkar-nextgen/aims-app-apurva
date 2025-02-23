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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Collapse,
  Typography,
  Box,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Search as SearchIcon, Add as AddIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';

// Initial data for
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
    status: 'Under Review', // Updated status
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
    status: 'Ideation', // Updated status
  },
];
//new update
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
    id: `AIM/${Math.floor(Math.random() * 1000000)}`,
    date: '',
    requestor: '',
    businessDivision: '',
    businessUnit: '',
    businessSubDivision: '',
    requestedOnBehalfOfManager: '',
    processName: '',
    problemStatement: '',
    impactedUsers: '',
    expectedOutcome: '',
    importedFunction: '',
    businessCriticality: 'Medium',
    impactToCustomerOrEmployee: 'Medium',
    numberOfTransactions: '',
    frequency: '',
    avgTimePerTransaction: '',
    otherRevenueImpact: '',
    totalRWH: '0.00',
    comments: '',
    status: 'Ideation', // Default status for new ideas
  });

  // State for modal open/close
  const [open, setOpen] = useState(false);

  // State for collapsible section in the form
  const [expanded, setExpanded] = useState(false);

  // Function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to handle modal close
  const handleClose = () => {
    setOpen(false);
    // Reset form fields when modal is closed
    setNewIdea({
      id: `AIM/${Math.floor(Math.random() * 1000000)}`,
      date: '',
      requestor: '',
      businessDivision: '',
      businessUnit: '',
      businessSubDivision: '',
      requestedOnBehalfOfManager: '',
      processName: '',
      problemStatement: '',
      impactedUsers: '',
      expectedOutcome: '',
      importedFunction: '',
      businessCriticality: 'Medium',
      impactToCustomerOrEmployee: 'Medium',
      numberOfTransactions: '',
      frequency: '',
      avgTimePerTransaction: '',
      otherRevenueImpact: '',
      totalRWH: '0.00',
      comments: '',
      status: 'Ideation', // Reset status to default
    });
  };

  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewIdea({ ...newIdea, [name]: value });
  };

  // Function to save idea as draft
  const handleSaveDraft = () => {
    const updatedIdea = { ...newIdea, status: 'Ideation' }; // Set status to "Ideation"
    setIdeas([...ideas, updatedIdea]); // Update the table in real-time
    handleClose(); // Close the modal
  };

  // Function to submit idea
  const handleSubmit = () => {
    const updatedIdea = { ...newIdea, status: 'Under Review' }; // Set status to "Under Review"
    setIdeas([...ideas, updatedIdea]); // Update the table in real-time
    handleClose(); // Close the modal
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

      {/* Button to Open Modal */}
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpen} style={{ marginBottom: '20px' }}>
        Add New Idea
      </Button>

      {/* Modal for Adding New Idea */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Idea</DialogTitle>
        <DialogContent>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {/* Idea Details Section (Collapsible) */}
            <Box>
              <Box
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setExpanded(!expanded)}
              >
                <Typography variant="h6">Idea Details</Typography>
                <IconButton>
                  {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              <Collapse in={expanded}>
                <Box style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '10px' }}>
                  <TextField
                    label="Idea #"
                    value={newIdea.id}
                    disabled
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Date"
                    type="date"
                    name="date"
                    value={newIdea.date}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Requestor"
                    name="requestor"
                    value={newIdea.requestor}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Business Division"
                    name="businessDivision"
                    value={newIdea.businessDivision}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Business Unit"
                    name="businessUnit"
                    value={newIdea.businessUnit}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Business Sub Division"
                    name="businessSubDivision"
                    value={newIdea.businessSubDivision}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Requested on behalf of Manager"
                    name="requestedOnBehalfOfManager"
                    value={newIdea.requestedOnBehalfOfManager}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Box>
              </Collapse>
            </Box>

            {/* Rest of the Form Fields */}
            <TextField
              label="Process Name"
              name="processName"
              value={newIdea.processName}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Problem Statement"
              name="problemStatement"
              value={newIdea.problemStatement}
              onChange={handleInputChange}
              required
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
            <TextField
              label="No. of impacted users"
              name="impactedUsers"
              value={newIdea.impactedUsers}
              onChange={handleInputChange}
              type="number"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Expected Outcome"
              name="expectedOutcome"
              value={newIdea.expectedOutcome}
              onChange={handleInputChange}
              required
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Imported Function"
              name="importedFunction"
              value={newIdea.importedFunction}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Business Criticality</InputLabel>
              <Select
                name="businessCriticality"
                value={newIdea.businessCriticality}
                onChange={(e) => setNewIdea({ ...newIdea, businessCriticality: e.target.value as string })}
                required
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Impact to Customer or Employee</InputLabel>
              <Select
                name="impactToCustomerOrEmployee"
                value={newIdea.impactToCustomerOrEmployee}
                onChange={(e) => setNewIdea({ ...newIdea, impactToCustomerOrEmployee: e.target.value as string })}
                required
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Number of Transactions"
              name="numberOfTransactions"
              value={newIdea.numberOfTransactions}
              onChange={handleInputChange}
              type="number"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Frequency"
              name="frequency"
              value={newIdea.frequency}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Avg Time Per Transaction (in mins)"
              name="avgTimePerTransaction"
              value={newIdea.avgTimePerTransaction}
              onChange={handleInputChange}
              type="number"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Other Revenue Impact"
              name="otherRevenueImpact"
              value={newIdea.otherRevenueImpact}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Total RWH"
              name="totalRWH"
              value={newIdea.totalRWH}
              onChange={handleInputChange}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              label="Comments"
              name="comments"
              value={newIdea.comments}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveDraft} color="primary">
            Save as Draft
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

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