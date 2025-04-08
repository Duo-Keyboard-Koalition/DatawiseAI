import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CustomDatePicker from '../CustomDatePicker';
import NavbarBreadcrumbs from '../NavbarBreadcrumbs';
import MenuButton from '../ui/MenuButton';
import ColorModeIconDropdown from '../theme/ColorModeIconDropdown';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddTodo from '../todo/AddTodo';
import { Todo } from '../../types/Todo';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export default function Header({ children }: { children?: React.ReactNode }) {
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const pageName = path === '/' ? 'Dashboard' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
    return [pageName, 'Home'];
  };

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        top: 0,
        left: '240px',
        zIndex: 1100,
        width: 'calc(100% - 240px)',
        boxShadow: 1,
        backgroundColor: 'background.paper',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
        }}
      >
        <NavbarBreadcrumbs breadcrumbs={getBreadcrumbs()} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          {location.pathname === '/tasks' && (
            <>
              <Button variant="contained" color="primary" onClick={handleDialogOpen}>
                Add New Task
              </Button>
              <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
                <DialogTitle>Add New Task</DialogTitle>
                <DialogContent>
                  <AddTodo
                    onAddTodo={(newTodo: Omit<Todo, 'id' | 'createdAt' | 'completedAt'>) => {
                      handleDialogClose();
                    }}
                    existingTodos={[]}
                  />
                </DialogContent>
              </Dialog>
            </>
          )}
          <CustomDatePicker />
          <MenuButton showBadge aria-label="Open notifications">
            <NotificationsRoundedIcon />
          </MenuButton>
          <ColorModeIconDropdown />
        </Box>
      </Toolbar>
      {children && <Box sx={{ mt: 2 }}>{children}</Box>}
    </AppBar>
  );
}
