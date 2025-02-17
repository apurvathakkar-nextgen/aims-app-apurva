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

const DataProcessingTab: React.FC = () => {
  const [formData, setFormData] = useState({
    totalDataVolume: '',
    dataSources: '',
    dataFormats: '',
    transformationComplexity: '',
    etlTool: '',
    processingFrequency: '',
    dataQuality: '',
    processingLatency: '',
    integrationComplexity: '',
    scalabilityRequirements: '',
    automationPotential: '',
    sampleDataFile: null as File | null,
    projectSize: '',
    businessImpact: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = e.target.name as string;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Process the formData as needed (e.g., API call)
    console.log('Submitted Data Processing Data:', formData);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Data Processing Assessment
      </Typography>
      <Typography variant="body1" gutterBottom>
        Provide the details below to evaluate your data processing workflows. This
        information will help transition the business analysis into an architectural review.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Data Volume & Sources */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Data Volume (GB/TB)"
              variant="outlined"
              fullWidth
              name="totalDataVolume"
              value={formData.totalDataVolume}
              onChange={handleInputChange}
              placeholder="Enter data volume"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Data Sources"
              variant="outlined"
              fullWidth
              name="dataSources"
              value={formData.dataSources}
              onChange={handleInputChange}
              placeholder="e.g., CRM, ERP, IoT sensors"
            />
          </Grid>

          {/* Data Formats & Transformation Complexity */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Data Formats"
              variant="outlined"
              fullWidth
              name="dataFormats"
              value={formData.dataFormats}
              onChange={handleInputChange}
              placeholder="e.g., CSV, JSON, XML"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Transformation Complexity (1-10)"
              variant="outlined"
              fullWidth
              name="transformationComplexity"
              value={formData.transformationComplexity}
              onChange={handleInputChange}
              type="number"
              inputProps={{ min: 1, max: 10 }}
            />
          </Grid>

          {/* ETL/ELT Tool & Processing Frequency */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="ETL/ELT Tool"
              variant="outlined"
              fullWidth
              name="etlTool"
              value={formData.etlTool}
              onChange={handleInputChange}
              placeholder="e.g., Talend, Informatica, custom solution"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Processing Frequency</InputLabel>
              <Select
                label="Processing Frequency"
                name="processingFrequency"
                value={formData.processingFrequency}
                onChange={handleSelectChange}
              >
                <MenuItem value="Real-time">Real-time</MenuItem>
                <MenuItem value="Hourly">Hourly</MenuItem>
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Batch">Batch</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Data Quality & Processing Latency */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Data Quality Metrics"
              variant="outlined"
              fullWidth
              name="dataQuality"
              value={formData.dataQuality}
              onChange={handleInputChange}
              placeholder="e.g., error rate, missing values"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Average Processing Latency (mins)"
              variant="outlined"
              fullWidth
              name="processingLatency"
              value={formData.processingLatency}
              onChange={handleInputChange}
              type="number"
              placeholder="Enter processing time"
            />
          </Grid>

          {/* Integration & Scalability */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Integration Complexity"
              variant="outlined"
              fullWidth
              name="integrationComplexity"
              value={formData.integrationComplexity}
              onChange={handleInputChange}
              placeholder="Describe integration challenges"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Scalability Requirements"
              variant="outlined"
              fullWidth
              name="scalabilityRequirements"
              value={formData.scalabilityRequirements}
              onChange={handleInputChange}
              placeholder="e.g., horizontal scaling, cloud solutions"
            />
          </Grid>

          {/* Automation Potential */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Potential for Automation Improvement (%)"
              variant="outlined"
              fullWidth
              name="automationPotential"
              value={formData.automationPotential}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>

          {/* Sample Data File */}
          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Sample Data File
              <input
                type="file"
                hidden
                name="sampleDataFile"
                onChange={handleFileChange}
                accept=".csv,.json,.xlsx,.xml"
              />
            </Button>
          </Grid>

          {/* Project Size & Business Impact */}
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
              label="Business Impact / ROI Estimation"
              variant="outlined"
              fullWidth
              name="businessImpact"
              value={formData.businessImpact}
              onChange={handleInputChange}
              multiline
              rows={3}
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

export default DataProcessingTab;
