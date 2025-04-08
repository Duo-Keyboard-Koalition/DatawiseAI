import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

interface CustomGridProps {
  container?: boolean;
  item?: boolean;
  spacing?: number;
  xs?: number;
  md?: number;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const CustomGrid: React.FC<CustomGridProps> = ({
  container = false,
  item = false,
  spacing = 0,
  xs,
  md,
  children,
  sx,
}) => {
  const containerStyles: SxProps<Theme> = container
    ? {
        display: 'flex',
        flexWrap: 'wrap',
        gap: `${spacing * 8}px`,
      }
    : {};

  const itemStyles: SxProps<Theme> = item
    ? {
        flexBasis: xs ? `${(xs / 12) * 100}%` : '100%',
        maxWidth: xs ? `${(xs / 12) * 100}%` : '100%',
        '@media (min-width: 960px)': {
          flexBasis: md ? `${(md / 12) * 100}%` : undefined,
          maxWidth: md ? `${(md / 12) * 100}%` : undefined,
        },
      }
    : {};

  return (
    <Box sx={{ ...containerStyles, ...itemStyles, ...sx }}>
      {children}
    </Box>
  );
};

export default CustomGrid;
