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

const LowCodeTab: React.FC = () => {
  const [formData, setFormData] = useState({
    totalApplications: '',
    platformVendor: '',
    integrationComplexity: '',
    customizationLevel: '',
    userBase: '',
    developmentTimeReduction: '',
    scalability: '',
    securityCompliance: '',
    maintenanceEffort: '',
    trainingRequirement: '',
    sampleAppURL: '',
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Process the formData (e.g., API call)
    console.log('Submitted Low Code Data:', formData);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Low Code Platforms Assessment
      </Typography>
      <Typography variant="body1" gutterBottom>
        Provide the details below to evaluate your low code platform solution.
        This information will help transition the analysis from a business
        perspective to an architectural review.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Application Count & Platform Vendor */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Applications Developed"
              variant="outlined"
              fullWidth
              name="totalApplications"
              value={formData.totalApplications}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Platform Vendor"
              variant="outlined"
              fullWidth
              name="platformVendor"
              value={formData.platformVendor}
              onChange={handleInputChange}
              placeholder="e.g., OutSystems, Mendix, Appian"
            />
          </Grid>

          {/* Integration & Customization */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Integration Complexity (No. of Integrations)"
              variant="outlined"
              fullWidth
              name="integrationComplexity"
              value={formData.integrationComplexity}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Customization Level (1-10)"
              variant="outlined"
              fullWidth
              name="customizationLevel"
              value={formData.customizationLevel}
              onChange={handleInputChange}
              type="number"
              inputProps={{ min: 1, max: 10 }}
            />
          </Grid>

          {/* User Base & Development Time */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="User Base (Number of End Users)"
              variant="outlined"
              fullWidth
              name="userBase"
              value={formData.userBase}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Development Time Reduction (%)"
              variant="outlined"
              fullWidth
              name="developmentTimeReduction"
              value={formData.developmentTimeReduction}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>

          {/* Scalability & Security */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Scalability (High/Medium/Low)"
              variant="outlined"
              fullWidth
              name="scalability"
              value={formData.scalability}
              onChange={handleInputChange}
              placeholder="e.g., High, Medium, Low"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Security & Compliance"
              variant="outlined"
              fullWidth
              name="securityCompliance"
              value={formData.securityCompliance}
              onChange={handleInputChange}
              placeholder="e.g., GDPR, ISO standards"
            />
          </Grid>

          {/* Maintenance & Training */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Maintenance Effort (Hours/Month)"
              variant="outlined"
              fullWidth
              name="maintenanceEffort"
              value={formData.maintenanceEffort}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Training Requirement (Hours)"
              variant="outlined"
              fullWidth
              name="trainingRequirement"
              value={formData.trainingRequirement}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>

          {/* Sample Application URL */}
          <Grid item xs={12}>
            <TextField
              label="Sample Application URL"
              variant="outlined"
              fullWidth
              name="sampleAppURL"
              value={formData.sampleAppURL}
              onChange={handleInputChange}
              type="url"
            />
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

export default LowCodeTab;
