import React, { useState } from 'react';
import {
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';

const RPATab: React.FC = () => {
  const [formData, setFormData] = useState({
    totalProcessSteps: '',
    totalRepeatedSteps: '',
    applicationsInvolved: '',
    numberOfVariations: '',
    cycleTime: '',
    totalTimeRepeatedSteps: '',
    avgTimeSpent: '',
    asIsProcessLink: '',
    projectSize: '',
    potentialTimeSave: '',
    numberOfTransactions: '',
    // Files
    sopDocuments: null as File | null,
    asIsProcessFile: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = e.target.name as string;
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Process the formData (e.g., API call)
    console.log('Submitted data:', formData);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        RPA Process Assessment
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please fill out the following details to qualify the process for RPA.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Process Steps */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Total No. of Process Steps"
              variant="outlined"
              fullWidth
              name="totalProcessSteps"
              value={formData.totalProcessSteps}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Total No. of Repeated Steps"
              variant="outlined"
              fullWidth
              name="totalRepeatedSteps"
              value={formData.totalRepeatedSteps}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>

          {/* Applications and Variations */}
          <Grid item xs={12}>
            <TextField
              label="Applications Involved"
              variant="outlined"
              fullWidth
              name="applicationsInvolved"
              value={formData.applicationsInvolved}
              onChange={handleInputChange}
              placeholder="e.g., CRM, ERP, etc."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="No. of Variations"
              variant="outlined"
              fullWidth
              name="numberOfVariations"
              value={formData.numberOfVariations}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>

          {/* Document Upload */}
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" component="label" fullWidth>
              Upload SOP Documents
              <input
                type="file"
                hidden
                name="sopDocuments"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
            </Button>
          </Grid>

          {/* Timing Metrics */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="End-to-End Cycle Time (mins)"
              variant="outlined"
              fullWidth
              name="cycleTime"
              value={formData.cycleTime}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Time of Repeated Steps (mins)"
              variant="outlined"
              fullWidth
              name="totalTimeRepeatedSteps"
              value={formData.totalTimeRepeatedSteps}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Avg Time Spent per Step (mins)"
              variant="outlined"
              fullWidth
              name="avgTimeSpent"
              value={formData.avgTimeSpent}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>

          {/* AS IS Process */}
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" component="label" fullWidth>
              Upload AS IS Process (PowerPoint/Visio)
              <input
                type="file"
                hidden
                name="asIsProcessFile"
                onChange={handleFileChange}
                accept=".ppt,.pptx,.vsdx"
              />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Capture AS IS Process Link"
              variant="outlined"
              fullWidth
              name="asIsProcessLink"
              value={formData.asIsProcessLink}
              onChange={handleInputChange}
              type="url"
            />
          </Grid>

          {/* Project Details */}
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Project Size</InputLabel>
              <Select
                label="Project Size"
                name="projectSize"
                value={formData.projectSize}
                onChange={handleSelectChange}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Potential to Save Time (%)"
              variant="outlined"
              fullWidth
              name="potentialTimeSave"
              value={formData.potentialTimeSave}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Number of Transactions"
              variant="outlined"
              fullWidth
              name="numberOfTransactions"
              value={formData.numberOfTransactions}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12} container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button variant="contained" color="primary" type="button">
                SAVE
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" type="submit">
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RPATab;