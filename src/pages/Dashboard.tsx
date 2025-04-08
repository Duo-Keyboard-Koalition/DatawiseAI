import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppNavbar from '../components/sidemenue/AppNavbar';
import MainGrid from '../components/MainGrid';
import PageLayout from '../components/layout/PageLayout';

export default function Dashboard() {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <AppNavbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <PageLayout maxWidth="100%">
            <MainGrid />
          </PageLayout>
        </Box>
      </Box>
    </>
  );
}
