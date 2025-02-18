# Define the tab names
$tabs = @(
    "ExecutiveSummary",
    "PipelineDashboard",
    "DeliveryDashboard",
    "SolutionHub",
    "EnterpriseProjects",
    "PerformanceAnalytics",
    "BusinessImpact",
    "MilestoneMonitor"
)

# Define the directory where the files will be created
$directory = "./src/components/DashboardTabs"

# Create the directory if it doesn't exist
if (-not (Test-Path -Path $directory)) {
    New-Item -ItemType Directory -Path $directory
}

# Loop through each tab and create a .tsx file
foreach ($tab in $tabs) {
    $filePath = "$directory/$tab.tsx"
    $content = @"
import React from 'react';
import { Typography, Box } from '@mui/material';

const $($tab): React.FC = () => {
  return (
    <Box>
      <Typography variant="h5">$($tab)</Typography>
      <Typography variant="body1">
        Content for the $($tab) tab.
      </Typography>
    </Box>
  );
};

export default $($tab);
"@

    # Write the content to the file
    Set-Content -Path $filePath -Value $content
    Write-Host "Created file: $filePath"
}

Write-Host "All files created successfully!"