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

const IDPTab: React.FC = () => {
  const [formData, setFormData] = useState({
    totalDocumentsProcessed: '',
    documentTypes: '',
    avgDocComplexity: '',
    formatDiversity: '',
    ocrAccuracy: '',
    extractionAccuracy: '',
    preprocessingRequired: '',
    sourceSystems: '',
    workflowComplexity: '',
    avgProcessingTime: '',
    documentVariations: '',
    sampleDocuments: null as File | null,
    integrationComplexity: '',
    automationPotential: '',
    securityCompliance: '',
    projectSize: '',
    businessImpact: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = e.target.name as string;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Process the formData as needed (e.g., API call)
    console.log('Submitted IDP Data:', formData);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Intelligent Document Processing (IDP) Assessment
      </Typography>
      <Typography variant="body1" gutterBottom>
        Provide the following details to evaluate the document processing
        workflow. This information will help transition the assessment from a
        business analysis to an architectural review.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Documents & Types */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Documents Processed"
              variant="outlined"
              fullWidth
              name="totalDocumentsProcessed"
              value={formData.totalDocumentsProcessed}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Document Types Involved"
              variant="outlined"
              fullWidth
              name="documentTypes"
              value={formData.documentTypes}
              onChange={handleInputChange}
              placeholder="e.g., Invoices, Contracts, Forms"
            />
          </Grid>

          {/* Complexity & Formats */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Average Document Complexity (1-10)"
              variant="outlined"
              fullWidth
              name="avgDocComplexity"
              value={formData.avgDocComplexity}
              onChange={handleInputChange}
              type="number"
              inputProps={{ min: 1, max: 10 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Format Diversity"
              variant="outlined"
              fullWidth
              name="formatDiversity"
              value={formData.formatDiversity}
              onChange={handleInputChange}
              placeholder="e.g., PDF, Word, Scanned Images"
            />
          </Grid>

          {/* Accuracy Metrics */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="OCR Accuracy (%)"
              variant="outlined"
              fullWidth
              name="ocrAccuracy"
              value={formData.ocrAccuracy}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Data Extraction Accuracy (%)"
              variant="outlined"
              fullWidth
              name="extractionAccuracy"
              value={formData.extractionAccuracy}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>

          {/* Pre-processing & Source Systems */}
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Pre-processing Required</InputLabel>
              <Select
                label="Pre-processing Required"
                name="preprocessingRequired"
                value={formData.preprocessingRequired}
                onChange={handleSelectChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Document Source Systems"
              variant="outlined"
              fullWidth
              name="sourceSystems"
              value={formData.sourceSystems}
              onChange={handleInputChange}
              placeholder="e.g., ERP, CRM, etc."
            />
          </Grid>

          {/* Workflow & Processing */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Workflow Complexity (Steps)"
              variant="outlined"
              fullWidth
              name="workflowComplexity"
              value={formData.workflowComplexity}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Avg Processing Time per Document (mins)"
              variant="outlined"
              fullWidth
              name="avgProcessingTime"
              value={formData.avgProcessingTime}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Number of Document Variations"
              variant="outlined"
              fullWidth
              name="documentVariations"
              value={formData.documentVariations}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>

          {/* Sample Documents */}
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Sample Documents
              <input
                type="file"
                hidden
                name="sampleDocuments"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
            </Button>
          </Grid>

          {/* Integration & Automation */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Integration Complexity (Description)"
              variant="outlined"
              fullWidth
              name="integrationComplexity"
              value={formData.integrationComplexity}
              onChange={handleInputChange}
              placeholder="e.g., APIs, middleware, etc."
            />
          </Grid>
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

          {/* Security & Project Details */}
          <Grid item xs={12}>
            <TextField
              label="Security & Compliance Requirements"
              variant="outlined"
              fullWidth
              name="securityCompliance"
              value={formData.securityCompliance}
              onChange={handleInputChange}
              multiline
              rows={3}
            />
          </Grid>
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
          <Grid item xs={12}>
            <TextField
              label="Comments"
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

export default IDPTab;
