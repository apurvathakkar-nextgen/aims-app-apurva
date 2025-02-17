import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

// Frequency multipliers for calculation purposes
const frequencyMultipliers: { [key: string]: number } = {
  Daily: 260,    // Assuming 5 days per week x 52 weeks per year
  Weekly: 52,
  Monthly: 12,
  Yearly: 1,
};

interface BenefitRow {
  id: number;
  benefitQualifier: string;
  numberOfResources: string;
  country: string;
  contractorType: string;
  hourlyRate: string;
  numberOfTransactions: string;
  frequency: string;
  timePerTransaction: string;
}

const createInitialBenefitRow = (): BenefitRow => ({
  id: Date.now(),
  benefitQualifier: '',
  numberOfResources: '',
  country: '',
  contractorType: '',
  hourlyRate: '',
  numberOfTransactions: '',
  frequency: 'Weekly',
  timePerTransaction: '',
});

const ValueAssessmentTab: React.FC = () => {
  // Last Updated date (using current date here for demonstration)
  const [lastUpdated] = useState(new Date().toLocaleDateString());
  
  // Dynamic benefit qualifier rows
  const [benefitRows, setBenefitRows] = useState<BenefitRow[]>([
    createInitialBenefitRow(),
  ]);
  
  // Additional overall savings fields
  const [otherSavings, setOtherSavings] = useState('');
  const [revenueImpact, setRevenueImpact] = useState('');

  // USD Converter States
  const [converterAmount, setConverterAmount] = useState('');
  const [converterRate, setConverterRate] = useState('');

  // Update a specific field in a benefit row
  const handleRowChange = (
    id: number,
    field: keyof BenefitRow,
    value: string
  ) => {
    setBenefitRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  // Add a new benefit qualifier row
  const addRow = () => {
    setBenefitRows((prevRows) => [...prevRows, createInitialBenefitRow()]);
  };

  // Remove a benefit qualifier row (ensure at least one row remains)
  const removeRow = (id: number) => {
    if (benefitRows.length > 1) {
      setBenefitRows((prevRows) => prevRows.filter((row) => row.id !== id));
    }
  };

  // Calculate annual savings in hours for a row
  const computeAnnualSavingsHours = (row: BenefitRow): number => {
    const transactions = parseFloat(row.numberOfTransactions) || 0;
    const timePerTrans = parseFloat(row.timePerTransaction) || 0;
    const multiplier = frequencyMultipliers[row.frequency] || 0;
    return transactions * multiplier * timePerTrans;
  };

  // Calculate annual savings in USD for a row
  const computeAnnualSavingsUSD = (row: BenefitRow): number => {
    const annualHours = computeAnnualSavingsHours(row);
    const hourly = parseFloat(row.hourlyRate) || 0;
    const resources = parseFloat(row.numberOfResources) || 0;
    return annualHours * hourly * resources;
  };

  // Total annual savings (from all benefit rows)
  const totalAnnualSavingsUSD = benefitRows.reduce(
    (acc, row) => acc + computeAnnualSavingsUSD(row),
    0
  );

  const otherSavingsUSD = parseFloat(otherSavings) || 0;
  const revenueImpactUSD = parseFloat(revenueImpact) || 0;
  const totalSavingsUSD = totalAnnualSavingsUSD + otherSavingsUSD + revenueImpactUSD;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      lastUpdated,
      benefitRows,
      otherSavings: otherSavingsUSD,
      revenueImpact: revenueImpactUSD,
      totalSavingsUSD,
    };
    console.log('Submitted Value Assessment Data:', data);
    // Further processing (e.g., API call) goes here...
  };

  return (
    <Box p={3}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Header */}
        <Typography variant="h4" gutterBottom>
          Value Assessment
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Last Updated: {lastUpdated}
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Dynamic Benefit Qualifier Rows */}
          {benefitRows.map((row, index) => (
            <Box
              key={row.id}
              mb={2}
              p={2}
              border={1}
              borderColor="grey.300"
              borderRadius={2}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    Benefit Qualifier #{index + 1}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Benefit Qualifier"
                    variant="outlined"
                    fullWidth
                    value={row.benefitQualifier}
                    onChange={(e) =>
                      handleRowChange(row.id, 'benefitQualifier', e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="No. of Resources"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={row.numberOfResources}
                    onChange={(e) =>
                      handleRowChange(row.id, 'numberOfResources', e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Country"
                    variant="outlined"
                    fullWidth
                    value={row.country}
                    onChange={(e) =>
                      handleRowChange(row.id, 'country', e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Contractor / FTE</InputLabel>
                    <Select
                      label="Contractor / FTE"
                      value={row.contractorType}
                      onChange={(e) =>
                        handleRowChange(row.id, 'contractorType', e.target.value as string)
                      }
                    >
                      <MenuItem value="FTE">FTE</MenuItem>
                      <MenuItem value="Contractor">Contractor</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Avg. Hourly Rate (USD)"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={row.hourlyRate}
                    onChange={(e) =>
                      handleRowChange(row.id, 'hourlyRate', e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="No. of Transactions"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={row.numberOfTransactions}
                    onChange={(e) =>
                      handleRowChange(row.id, 'numberOfTransactions', e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Frequency</InputLabel>
                    <Select
                      label="Frequency"
                      value={row.frequency}
                      onChange={(e) =>
                        handleRowChange(row.id, 'frequency', e.target.value as string)
                      }
                    >
                      <MenuItem value="Daily">Daily</MenuItem>
                      <MenuItem value="Weekly">Weekly</MenuItem>
                      <MenuItem value="Monthly">Monthly</MenuItem>
                      <MenuItem value="Yearly">Yearly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Time per Transaction (Min)"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={row.timePerTransaction}
                    onChange={(e) =>
                      handleRowChange(row.id, 'timePerTransaction', e.target.value)
                    }
                  />
                </Grid>
                {/* Calculated Fields */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Annual Savings (Hours)"
                    variant="outlined"
                    fullWidth
                    value={computeAnnualSavingsHours(row).toFixed(2)}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Annual Savings (USD)"
                    variant="outlined"
                    fullWidth
                    value={computeAnnualSavingsUSD(row).toFixed(2)}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end">
                    <IconButton
                      onClick={() => removeRow(row.id)}
                      disabled={benefitRows.length === 1}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
          
          <Box mb={2}>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={addRow}>
              Add Benefit Qualifier
            </Button>
          </Box>
          
          {/* Overall Savings Section */}
          <Box mb={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Other Savings (USD)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={otherSavings}
                  onChange={(e) => setOtherSavings(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Revenue Impact (USD)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={revenueImpact}
                  onChange={(e) => setRevenueImpact(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Total Savings (USD)"
                  variant="outlined"
                  fullWidth
                  value={totalSavingsUSD.toFixed(2)}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* USD Converter Section */}
          <Box mb={2} mt={4} p={2} border={1} borderColor="grey.300" borderRadius={2}>
            <Typography variant="h6" gutterBottom>
              USD Converter
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Amount"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={converterAmount}
                  onChange={(e) => setConverterAmount(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Conversion Rate"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={converterRate}
                  onChange={(e) => setConverterRate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Converted USD"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={((parseFloat(converterAmount) || 0) * (parseFloat(converterRate) || 0)).toFixed(2)}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </Box>
          
          {/* Action Buttons */}
          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="contained" color="primary" type="submit">
              SAVE DRAFT
            </Button>
            <Button variant="contained" color="secondary" type="submit">
              SUBMIT
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ValueAssessmentTab;
