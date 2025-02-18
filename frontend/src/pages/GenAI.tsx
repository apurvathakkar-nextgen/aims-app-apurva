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

const GenAITab: React.FC = () => {
  const [formData, setFormData] = useState({
    totalUseCases: '',
    trainingDataVolume: '',
    dataSources: '',
    modelComplexity: '',
    expectedPerformance: '',
    integrationPoints: '',
    complianceConsiderations: '',
    ethicalConsiderations: '',
    updateFrequency: '',
    scalabilityRequirements: '',
    deploymentEnvironment: '',
    automationPotential: '',
    sampleDataset: null as File | null,
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
    // Process the formData as needed (e.g., API call)
    console.log('Submitted Gen AI Data:', formData);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Generative AI Assessment
      </Typography>
      <Typography variant="body1" gutterBottom>
        Provide the details below to evaluate your Generative AI initiative. This
        information will help in transitioning the analysis from a business
        perspective to an architectural review.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Use Cases & Training Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Use Cases"
              variant="outlined"
              fullWidth
              name="totalUseCases"
              value={formData.totalUseCases}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
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
          <Grid item xs={12}>
            <TextField
              label="Data Sources"
              variant="outlined"
              fullWidth
              name="dataSources"
              value={formData.dataSources}
              onChange={handleInputChange}
              placeholder="e.g., internal databases, public datasets"
            />
          </Grid>

          {/* Model Complexity & Performance */}
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Model Complexity</InputLabel>
              <Select
                label="Model Complexity"
                name="modelComplexity"
                value={formData.modelComplexity}
                onChange={handleSelectChange}
              >
                <MenuItem value="Basic">Basic</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Expected Performance Metrics"
              variant="outlined"
              fullWidth
              name="expectedPerformance"
              value={formData.expectedPerformance}
              onChange={handleInputChange}
              placeholder="e.g., accuracy, latency, etc."
            />
          </Grid>

          {/* Integration, Compliance & Ethics */}
          <Grid item xs={12}>
            <TextField
              label="Integration Points with Existing Systems"
              variant="outlined"
              fullWidth
              name="integrationPoints"
              value={formData.integrationPoints}
              onChange={handleInputChange}
              placeholder="Describe APIs, connectors, etc."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Compliance Considerations"
              variant="outlined"
              fullWidth
              name="complianceConsiderations"
              value={formData.complianceConsiderations}
              onChange={handleInputChange}
              placeholder="e.g., GDPR, CCPA, etc."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ethical Considerations"
              variant="outlined"
              fullWidth
              name="ethicalConsiderations"
              value={formData.ethicalConsiderations}
              onChange={handleInputChange}
              placeholder="e.g., bias mitigation, fairness"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Update Frequency"
              variant="outlined"
              fullWidth
              name="updateFrequency"
              value={formData.updateFrequency}
              onChange={handleInputChange}
              placeholder="e.g., daily, weekly"
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
              placeholder="e.g., horizontal scaling, load balancing"
            />
          </Grid>

          {/* Deployment & Automation */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Deployment Environment"
              variant="outlined"
              fullWidth
              name="deploymentEnvironment"
              value={formData.deploymentEnvironment}
              onChange={handleInputChange}
              placeholder="e.g., cloud, on-premise"
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

          {/* Additional Documentation */}
          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Sample Dataset (if available)
              <input
                type="file"
                hidden
                name="sampleDataset"
                onChange={handleFileChange}
                accept=".csv,.json,.xlsx"
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

export default GenAITab;
