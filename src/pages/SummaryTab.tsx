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
  Switch,
  FormControlLabel,
  Card,
  CardContent,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

interface Idea {
  id: string;
  date: string;
  requestor: string;
  processName: string;
  selectedProcess: string;
  businessCriticality: string;
  platform: boolean;
  process: boolean;
  value: string;
  cost: string;
  status: string;
}

interface SummaryTabProps {
  ideas: Idea[];
  setIdeas: React.Dispatch<React.SetStateAction<Idea[]>>;
}

const CardView: React.FC<{ ideas: Idea[] }> = ({ ideas }) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {ideas.map((idea) => (
        <Card key={idea.id} style={{ width: '300px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {idea.id}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Date:</strong> {idea.date}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Requestor:</strong> {idea.requestor}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Process Name:</strong> {idea.processName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Status:</strong> {idea.status}
            </Typography>
            <Box display="flex" justifyContent="space-between" marginTop={2}>
              <Tooltip title="Edit">
                <IconButton size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

const SummaryTab: React.FC<SummaryTabProps> = ({ ideas, setIdeas }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ requestor: '', businessCriticality: '' });
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table'); // Default to table view

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
    status: 'Ideation',
  });

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
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
      status: 'Ideation',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewIdea({ ...newIdea, [name]: value });
  };

  const handleSaveDraft = () => {
    const updatedIdea = { ...newIdea, status: 'Ideation' };
    setIdeas([...ideas, updatedIdea]);
    handleClose();
  };

  const handleSubmit = () => {
    const updatedIdea = { ...newIdea, status: 'Under Review' };
    setIdeas([...ideas, updatedIdea]);
    handleClose();
  };

  const filteredIdeas = ideas
    .filter(
      (idea) =>
        idea.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.requestor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.processName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (idea) =>
        (filters.requestor ? idea.requestor === filters.requestor : true) &&
        (filters.businessCriticality ? idea.businessCriticality === filters.businessCriticality : true)
    );

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

  const paginatedIdeas = sortedIdeas.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>New Idea</h2>
      <h3>Page {page} of {Math.ceil(filteredIdeas.length / rowsPerPage)}</h3>

      <Box display="flex" alignItems="center" gap={2} marginBottom="20px">
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
          Add New Idea
        </Button>
        <FormControlLabel
          control={
            <Switch
              checked={viewMode === 'card'}
              onChange={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
            />
          }
          label={viewMode === 'table' ? 'Switch to Card View' : 'Switch to Table View'}
        />
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Idea</DialogTitle>
        <DialogContent>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
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

      {viewMode === 'table' ? (
        <>
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
          <Pagination
            count={Math.ceil(filteredIdeas.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
          />
        </>
      ) : (
        <CardView ideas={paginatedIdeas} />
      )}
    </div>
  );
};

export default SummaryTab;