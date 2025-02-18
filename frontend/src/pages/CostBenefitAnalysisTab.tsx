import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

// ---------- Cost Breakdown Types & Helpers ----------
interface CostRow {
  id: number;
  projectComplexity: string;
  projectDuration: string; // e.g., "8-12 Weeks"
  resourcesCost: string;
  licenseCost: string;
  infraCost: string;
  additionalCost: string;
  consultingCost: string;
  trainingCost: string;
}

const createInitialCostRow = (): CostRow => ({
  id: Date.now(),
  projectComplexity: '',
  projectDuration: '8-12 Weeks',
  resourcesCost: '',
  licenseCost: '',
  infraCost: '',
  additionalCost: '',
  consultingCost: '',
  trainingCost: '',
});

// ---------- Benefit Analysis Types & Helpers ----------
interface BenefitRow {
  id: number;
  benefitQualifier: string;
  estimatedTimeSaved: string; // in hrs per year
  estimatedCostSaved: string; // in USD per year
  otherSavings: string;       // in USD per year
  revenueImpact: string;      // in USD per year
  hardSavings: string;        // in USD per full year
  softSavings: string;        // in USD per full year
  comment: string;
}

const createInitialBenefitRow = (): BenefitRow => ({
  id: Date.now(),
  benefitQualifier: '',
  estimatedTimeSaved: '',
  estimatedCostSaved: '',
  otherSavings: '',
  revenueImpact: '',
  hardSavings: '',
  softSavings: '',
  comment: '',
});

// ---------- Risk & Feasibility Section ----------
interface RiskData {
  riskLevel: string;
  technicalComplexity: string; // scale 1-10
  changeManagementEffort: string; // scale 1-10
  implementationComplexity: string; // scale 1-10
}

// ---------- Strategic Alignment Section ----------
interface StrategicAlignmentData {
  strategicImportance: string;
  marketOpportunity: string;
  competitiveAdvantage: string;
  alignmentComments: string;
}

// ---------- Main Component ----------
const BusinessCaseAnalysisTab: React.FC = () => {
  // Last Updated (for demo, we use current date)
  const [lastUpdated] = useState(new Date().toLocaleDateString());

  // Cost Breakdown dynamic rows
  const [costRows, setCostRows] = useState<CostRow[]>([createInitialCostRow()]);
  // Benefit Analysis dynamic rows
  const [benefitRows, setBenefitRows] = useState<BenefitRow[]>([createInitialBenefitRow()]);

  // Risk & Feasibility state (single section)
  const [riskData, setRiskData] = useState<RiskData>({
    riskLevel: '',
    technicalComplexity: '',
    changeManagementEffort: '',
    implementationComplexity: '',
  });

  // Strategic Alignment state (single section)
  const [strategicData, setStrategicData] = useState<StrategicAlignmentData>({
    strategicImportance: '',
    marketOpportunity: '',
    competitiveAdvantage: '',
    alignmentComments: '',
  });

  // ---------- Handlers for Cost Rows ----------
  const handleCostRowChange = (
    id: number,
    field: keyof CostRow,
    value: string
  ) => {
    setCostRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const addCostRow = () => {
    setCostRows((prev) => [...prev, createInitialCostRow()]);
  };

  const removeCostRow = (id: number) => {
    if (costRows.length > 1) {
      setCostRows((prev) => prev.filter((row) => row.id !== id));
    }
  };

  // ---------- Handlers for Benefit Rows ----------
  const handleBenefitRowChange = (
    id: number,
    field: keyof BenefitRow,
    value: string
  ) => {
    setBenefitRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const addBenefitRow = () => {
    setBenefitRows((prev) => [...prev, createInitialBenefitRow()]);
  };

  const removeBenefitRow = (id: number) => {
    if (benefitRows.length > 1) {
      setBenefitRows((prev) => prev.filter((row) => row.id !== id));
    }
  };

  // ---------- Handlers for Risk & Strategic Sections ----------
  const handleRiskChange = (field: keyof RiskData, value: string) => {
    setRiskData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStrategicChange = (field: keyof StrategicAlignmentData, value: string) => {
    setStrategicData((prev) => ({ ...prev, [field]: value }));
  };

  // ---------- Calculations ----------
  // Total cost across all cost rows
  const totalCost = costRows.reduce((acc, row) => {
    const resources = parseFloat(row.resourcesCost) || 0;
    const license = parseFloat(row.licenseCost) || 0;
    const infra = parseFloat(row.infraCost) || 0;
    const additional = parseFloat(row.additionalCost) || 0;
    const consulting = parseFloat(row.consultingCost) || 0;
    const training = parseFloat(row.trainingCost) || 0;
    return acc + resources + license + infra + additional + consulting + training;
  }, 0);

  // Benefit aggregates
  const totalEstimatedTimeSaved = benefitRows.reduce(
    (acc, row) => acc + (parseFloat(row.estimatedTimeSaved) || 0),
    0
  );
  const totalEstimatedCostSaved = benefitRows.reduce(
    (acc, row) => acc + (parseFloat(row.estimatedCostSaved) || 0),
    0
  );
  const totalOtherSavings = benefitRows.reduce(
    (acc, row) => acc + (parseFloat(row.otherSavings) || 0),
    0
  );
  const totalRevenueImpact = benefitRows.reduce(
    (acc, row) => acc + (parseFloat(row.revenueImpact) || 0),
    0
  );
  const totalHardSavings = benefitRows.reduce(
    (acc, row) => acc + (parseFloat(row.hardSavings) || 0),
    0
  );
  const totalSoftSavings = benefitRows.reduce(
    (acc, row) => acc + (parseFloat(row.softSavings) || 0),
    0
  );

  // For illustration, let’s assume that overall annual benefit is a combination of
  // cost saved plus revenue impact plus hard/soft savings.
  const totalAnnualBenefits =
    totalEstimatedCostSaved + totalOtherSavings + totalRevenueImpact + totalHardSavings + totalSoftSavings;
  // Net benefit and ROI
  const netBenefit = totalAnnualBenefits - totalCost;
  const roi = totalCost > 0 ? (netBenefit / totalCost) * 100 : 0;
  const benefitCostRatio = totalCost > 0 ? totalAnnualBenefits / totalCost : 0;

  // ---------- Report Generation ----------
  const handleGenerateReport = () => {
    const reportData = {
      lastUpdated,
      costBreakdown: costRows,
      totalCost,
      benefits: benefitRows,
      aggregatedBenefits: {
        totalEstimatedTimeSaved,
        totalEstimatedCostSaved,
        totalOtherSavings,
        totalRevenueImpact,
        totalHardSavings,
        totalSoftSavings,
        totalAnnualBenefits,
      },
      riskData,
      strategicData,
      netBenefit,
      roi,
      benefitCostRatio,
    };
    console.log('Generated Business Case Report:', reportData);
    alert('Business Case Report generated! Check the console for details.');
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {/* ---------- Cost Breakdown Section ---------- */}
      <Paper sx={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Project Cost Breakdown
        </Typography>
        <Grid container spacing={2}>
          {costRows.map((row) => (
            <React.Fragment key={row.id}>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Complexity</InputLabel>
                  <Select
                    label="Complexity"
                    value={row.projectComplexity}
                    onChange={(e) =>
                      handleCostRowChange(row.id, 'projectComplexity', e.target.value as string)
                    }
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Project Duration"
                  variant="outlined"
                  fullWidth
                  value={row.projectDuration}
                  onChange={(e) =>
                    handleCostRowChange(row.id, 'projectDuration', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <TextField
                  label="Resources Cost"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={row.resourcesCost}
                  onChange={(e) =>
                    handleCostRowChange(row.id, 'resourcesCost', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <TextField
                  label="License Cost"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={row.licenseCost}
                  onChange={(e) =>
                    handleCostRowChange(row.id, 'licenseCost', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <TextField
                  label="Infra Cost"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={row.infraCost}
                  onChange={(e) =>
                    handleCostRowChange(row.id, 'infraCost', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <TextField
                  label="Additional Cost"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={row.additionalCost}
                  onChange={(e) =>
                    handleCostRowChange(row.id, 'additionalCost', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <TextField
                  label="Consulting Cost"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={row.consultingCost}
                  onChange={(e) =>
                    handleCostRowChange(row.id, 'consultingCost', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <TextField
                  label="Training Cost"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={row.trainingCost}
                  onChange={(e) =>
                    handleCostRowChange(row.id, 'trainingCost', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <IconButton
                  color="error"
                  onClick={() => removeCostRow(row.id)}
                  disabled={costRows.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={addCostRow}>
              Add Cost Row
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Total Project Cost: ${totalCost.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* ---------- Benefit Analysis Section ---------- */}
      <Paper sx={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Benefit Analysis
        </Typography>
        <Grid container spacing={2}>
          {benefitRows.map((row) => (
            <React.Fragment key={row.id}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Benefit Qualifier"
                  variant="outlined"
                  fullWidth
                  value={row.benefitQualifier}
                  onChange={(e) =>
                    handleBenefitRowChange(row.id, 'benefitQualifier', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Time Saved (hrs/yr)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={row.estimatedTimeSaved}
                  onChange={(e) =>
                    handleBenefitRowChange(row.id, 'estimatedTimeSaved', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Cost Saved (USD/yr)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={row.estimatedCostSaved}
                  onChange={(e) =>
                    handleBenefitRowChange(row.id, 'estimatedCostSaved', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Other Savings"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={row.otherSavings}
                  onChange={(e) =>
                    handleBenefitRowChange(row.id, 'otherSavings', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Revenue Impact"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={row.revenueImpact}
                  onChange={(e) =>
                    handleBenefitRowChange(row.id, 'revenueImpact', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Hard Savings (Full yr)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={row.hardSavings}
                  onChange={(e) =>
                    handleBenefitRowChange(row.id, 'hardSavings', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Soft Savings (Full yr)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={row.softSavings}
                  onChange={(e) =>
                    handleBenefitRowChange(row.id, 'softSavings', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Comment (If any)"
                  variant="outlined"
                  fullWidth
                  value={row.comment}
                  onChange={(e) =>
                    handleBenefitRowChange(row.id, 'comment', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <IconButton
                  color="error"
                  onClick={() => removeBenefitRow(row.id)}
                  disabled={benefitRows.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={addBenefitRow}>
              Add Benefit Row
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Total Estimated Time Saved: {totalEstimatedTimeSaved} hrs/yr
            </Typography>
            <Typography variant="h6">
              Total Estimated Cost Saved: ${totalEstimatedCostSaved.toFixed(2)}/yr
            </Typography>
            <Typography variant="h6">
              Total Other Savings: ${totalOtherSavings.toFixed(2)}/yr
            </Typography>
            <Typography variant="h6">
              Total Revenue Impact: ${totalRevenueImpact.toFixed(2)}/yr
            </Typography>
            <Typography variant="h6">
              Total Hard Savings: ${totalHardSavings.toFixed(2)}/yr
            </Typography>
            <Typography variant="h6">
              Total Soft Savings: ${totalSoftSavings.toFixed(2)}/yr
            </Typography>
            <Typography variant="h6">
              Overall Annual Benefits: ${totalAnnualBenefits.toFixed(2)}/yr
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* ---------- Risk & Feasibility Section ---------- */}
      <Paper sx={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Risk & Feasibility
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Risk Level</InputLabel>
              <Select
                label="Risk Level"
                value={riskData.riskLevel}
                onChange={(e) => handleRiskChange('riskLevel', e.target.value as string)}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Technical Complexity (1-10)"
              variant="outlined"
              fullWidth
              type="number"
              value={riskData.technicalComplexity}
              onChange={(e) => handleRiskChange('technicalComplexity', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Change Management Effort (1-10)"
              variant="outlined"
              fullWidth
              type="number"
              value={riskData.changeManagementEffort}
              onChange={(e) => handleRiskChange('changeManagementEffort', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Implementation Complexity (1-10)"
              variant="outlined"
              fullWidth
              type="number"
              value={riskData.implementationComplexity}
              onChange={(e) => handleRiskChange('implementationComplexity', e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* ---------- Strategic Alignment Section ---------- */}
      <Paper sx={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Strategic Alignment
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Strategic Importance</InputLabel>
              <Select
                label="Strategic Importance"
                value={strategicData.strategicImportance}
                onChange={(e) =>
                  handleStrategicChange('strategicImportance', e.target.value as string)
                }
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Market Opportunity"
              variant="outlined"
              fullWidth
              value={strategicData.marketOpportunity}
              onChange={(e) => handleStrategicChange('marketOpportunity', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Competitive Advantage"
              variant="outlined"
              fullWidth
              value={strategicData.competitiveAdvantage}
              onChange={(e) => handleStrategicChange('competitiveAdvantage', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Additional Comments"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={strategicData.alignmentComments}
              onChange={(e) => handleStrategicChange('alignmentComments', e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* ---------- Summary & Report Generation ---------- */}
      <Paper sx={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Summary
        </Typography>
        <Typography variant="body1" gutterBottom>
          Total Project Cost: ${totalCost.toFixed(2)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Overall Annual Benefits: ${totalAnnualBenefits.toFixed(2)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Net Benefit: ${netBenefit.toFixed(2)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          ROI: {roi.toFixed(2)}%
        </Typography>
        <Typography variant="body1" gutterBottom>
          Benefit-Cost Ratio: {benefitCostRatio.toFixed(2)}
        </Typography>
      </Paper>

      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleGenerateReport}>
          Generate Business Case Report
        </Button>
      </Box>
    </Box>
  );
};

export default BusinessCaseAnalysisTab;
