import React from 'react';
import CustomizedDataGrid from '../components/CustomizedDataGrid';
import { Box, Typography } from '@mui/material';

export default function Tasks() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>
      <CustomizedDataGrid />
    </Box>
  );
}
