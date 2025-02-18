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

const CustomAIMLTab: React.FC = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    useCaseDescription: '',
    modelType: '',
    trainingDataVolume: '',
    featureComplexity: '',
    trainingTimeEstimate: '',
    computeResources: '',
    deploymentStrategy: '',
    integrationComplexity: '',
    performanceMetrics: '',
    monitoringMaintenance: '',
    securityCompliance: '',
    scalabilityRequirements: '',
    sampleModelFile: null as File | null,
    projectSize: '',
    businessImpact: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
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
    // Process the formData (e.g., API call)
    console.log('Submitted Custom AI/ML Data:', formData);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Custom AI/ML Assessment
      </Typography>
      <Typography variant="body1" gutterBottom>
        Provide the following details to evaluate your custom AI/ML initiative. This information will help transition the analysis from a business perspective to an architectural review.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Project Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Project Name"
              variant="outlined"
              fullWidth
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
            />
          </Grid>

          {/* Use Case Description */}
          <Grid item xs={12}>
            <TextField
              label="Use Case Description"
              variant="outlined"
              fullWidth
              name="useCaseDescription"
              value={formData.useCaseDescription}
              onChange={handleInputChange}
              multiline
              rows={3}
            />
          </Grid>

          {/* Model Type */}
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Model Type</InputLabel>
              <Select
                label="Model Type"
                name="modelType"
                value={formData.modelType}
                onChange={handleSelectChange}
              >
                <MenuItem value="Classification">Classification</MenuItem>
                <MenuItem value="Regression">Regression</MenuItem>
                <MenuItem value="Clustering">Clustering</MenuItem>
                <MenuItem value="Recommendation">Recommendation</MenuItem>
                <MenuItem value="NLP">NLP</MenuItem>
                <MenuItem value="Computer Vision">Computer Vision</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Training Data Volume */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Training Data Volume (GB)"
              variant="outlined"
              fullWidth
              name="trainingDataVolume"
              value={formData.trainingDataVolume}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>

          {/* Feature Complexity */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Feature Complexity (1-10)"
              variant="outlined"
              fullWidth
              name="featureComplexity"
              value={formData.featureComplexity}
              onChange={handleInputChange}
              type="number"
              inputProps={{ min: 1, max: 10 }}
            />
          </Grid>

          {/* Training Time Estimate */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Training Time Estimate (hrs)"
              variant="outlined"
              fullWidth
              name="trainingTimeEstimate"
              value={formData.trainingTimeEstimate}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>

          {/* Compute Resource Requirements */}
          <Grid item xs={12}>
            <TextField
              label="Compute Resource Requirements"
              variant="outlined"
              fullWidth
              name="computeResources"
              value={formData.computeResources}
              onChange={handleInputChange}
              placeholder="e.g., GPU, TPU, CPU clusters"
            />
          </Grid>

          {/* Deployment Strategy */}
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Deployment Strategy</InputLabel>
              <Select
                label="Deployment Strategy"
                name="deploymentStrategy"
                value={formData.deploymentStrategy}
                onChange={handleSelectChange}
              >
                <MenuItem value="Cloud">Cloud</MenuItem>
                <MenuItem value="On-Premise">On-Premise</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
                <MenuItem value="Edge">Edge</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Integration Complexity */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Integration Complexity (No. of Systems)"
              variant="outlined"
              fullWidth
              name="integrationComplexity"
              value={formData.integrationComplexity}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>

          {/* Expected Performance Metrics */}
          <Grid item xs={12}>
            <TextField
              label="Expected Performance Metrics"
              variant="outlined"
              fullWidth
              name="performanceMetrics"
              value={formData.performanceMetrics}
              onChange={handleInputChange}
              placeholder="e.g., accuracy, F1 score, latency"
            />
          </Grid>

          {/* Monitoring & Maintenance */}
          <Grid item xs={12}>
            <TextField
              label="Monitoring & Maintenance Strategy"
              variant="outlined"
              fullWidth
              name="monitoringMaintenance"
              value={formData.monitoringMaintenance}
              onChange={handleInputChange}
              multiline
              rows={3}
            />
          </Grid>

          {/* Security & Compliance */}
          <Grid item xs={12}>
            <TextField
              label="Security & Compliance Considerations"
              variant="outlined"
              fullWidth
              name="securityCompliance"
              value={formData.securityCompliance}
              onChange={handleInputChange}
              multiline
              rows={3}
            />
          </Grid>

          {/* Scalability Requirements */}
          <Grid item xs={12}>
            <TextField
              label="Scalability Requirements"
              variant="outlined"
              fullWidth
              name="scalabilityRequirements"
              value={formData.scalabilityRequirements}
              onChange={handleInputChange}
              multiline
              rows={3}
            />
          </Grid>

          {/* Upload Sample Model */}
          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Sample Model (Optional)
              <input
                type="file"
                hidden
                name="sampleModelFile"
                onChange={handleFileChange}
                accept=".zip,.tar,.model"
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

export default CustomAIMLTab;
