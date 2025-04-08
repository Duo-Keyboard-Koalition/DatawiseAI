import * as React from 'react';
import Stack from '@mui/material/Stack';

interface PageLayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
}

export default function PageLayout({ children, maxWidth = '600px' }: PageLayoutProps) {
  return (
    <Stack
      spacing={2}
      sx={{
        maxWidth,
        margin: 'auto',
        mt: 4,
        px: 2,
        pt: '80px', // Consistent top padding for all pages
        alignItems: 'flex-start',
      }}
    >
      {children}
    </Stack>
  );
}
