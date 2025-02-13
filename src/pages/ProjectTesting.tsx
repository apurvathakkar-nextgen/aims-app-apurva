import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

const ProjectTesting = () => {
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        Project Testing
      </Typography>
      <Box>
        <Typography>
          This is the Project Testing phase. Here you can manage test cases, bugs, and quality assurance.
        </Typography>
        {/* Add testing-specific components here */}
      </Box>
    </Paper>
  );
};

export default ProjectTesting;