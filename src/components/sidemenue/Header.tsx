import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CustomDatePicker from '../CustomDatePicker';
import NavbarBreadcrumbs from '../NavbarBreadcrumbs';
import MenuButton from '../ui/MenuButton';
import ColorModeIconDropdown from '../theme/ColorModeIconDropdown';

export default function Header() {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const pageName = path === '/' ? 'Dashboard' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
    return [pageName, 'Home'];
  };

  return (
    <Stack
      direction="row"
      sx={{
        position: 'fixed',
        top: 0,
        zIndex: 1100,
        backgroundColor: 'background.paper',
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 2, // Consistent top padding for all pages
        px: 2,
        boxShadow: 1,
      }}
      spacing={2}
    >
      <Stack
        direction="row"
        sx={{
          flexGrow: 1, // Ensures the breadcrumbs and search align properly
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <NavbarBreadcrumbs breadcrumbs={getBreadcrumbs()} />
        <Stack direction="row" sx={{ gap: 1 }}>
          <CustomDatePicker />
          <MenuButton showBadge aria-label="Open notifications">
            <NotificationsRoundedIcon />
          </MenuButton>
          <ColorModeIconDropdown />
        </Stack>
      </Stack>
    </Stack>
  );
}
