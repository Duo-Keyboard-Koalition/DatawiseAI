import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Lock as LockIcon, LockOpen as UnlockIcon, AccessTime as TimeIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Todo, Status, Importance, Urgency } from '../../types/Todo';
import { formatDistanceToNow } from 'date-fns';
import CustomGrid from './CustomGrid';
import EditTodo from './EditTodo';

interface TodoItemProps {
  todo: Todo;
  allTodos: Todo[];
  onStatusChange: (id: string, status: Status) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, allTodos, onStatusChange }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditDialogOpen = () => setIsEditDialogOpen(true);
  const handleEditDialogClose = () => setIsEditDialogOpen(false);

  const handleDeleteTodo = (id: string) => {
    console.log(`Delete todo with id: ${id}`);
    // Add delete logic here
  };

  const handleSaveEdit = (updatedTodo: Todo) => {
    console.log('Updated task:', updatedTodo);
    handleEditDialogClose();
    // Add logic to update the todo in the parent component
  };

  const getChipColor = (importance: Importance | Urgency) => {
    switch (importance) {
      case Importance.HIGH:
      case Urgency.URGENT:
        return 'error';
      case Importance.MEDIUM:
        return 'warning';
      case Urgency.NORMAL:
        return 'primary';
      case Importance.LOW:
      case Urgency.LOW:
        return 'success';
      default:
        return 'default';
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  };

  const isBlocked = todo.blockedBy.some((id) => {
    const blockingTodo = allTodos.find((t) => t.id === id);
    return blockingTodo && blockingTodo.status !== Status.COMPLETED;
  });

  return (
    <Box
      p={2}
      border={1}
      borderRadius={2}
      borderColor="divider"
      bgcolor="background.paper"
      boxShadow={1}
      mb={2}
      sx={{ 
        opacity: todo.status === Status.COMPLETED ? 0.7 : 1,
        width: '100%' // Ensure the box spans the full width of the container
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            textDecoration: todo.status === Status.COMPLETED ? 'line-through' : 'none',
          }}
        >
          {todo.title}
        </Typography>
        <Box display="flex" gap={1}>
          <Tooltip title="Edit Task">
            <IconButton onClick={handleEditDialogOpen} color="primary">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Task">
            <IconButton onClick={() => handleDeleteTodo(todo.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default TodoItem;

