import React from 'react';
import PageViewsBarChart from '../components/PageViewsBarChart';
import ComplianceChecksChart from '../components/ComplianceChecksChart';
import StatCard from '../components/StatCard';
import { Grid, Box, Typography } from '@mui/material';

export default function Analytics() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <PageViewsBarChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <ComplianceChecksChart />
        </Grid>
        <Grid item xs={12}>
          <StatCard
            title="Data Consistency"
            value="95%"
            interval="Last 30 days"
            trend="up"
            data={[80, 85, 90, 92, 95]}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
