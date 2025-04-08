import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack'; // Added import
import ColorModeIconDropdown from '../components/theme/ColorModeIconDropdown';
import PageLayout from '../components/layout/PageLayout';

export default function Settings() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1">
        Settings
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body1">Theme:</Typography>
        <ColorModeIconDropdown />
      </Stack>
    </PageLayout>
  );
}
