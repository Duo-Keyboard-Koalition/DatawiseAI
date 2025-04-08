import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ExpandMore as ChevronDownIcon,
  AccessTime as TimeIcon,
  Warning as WarningIcon,
  Star as StarIcon,
  Check as CheckIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { Todo, Status, Importance, Urgency } from '../../types/Todo';
import TodoItem from './TodoItem';
import EditTodo from './EditTodo';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodos: (todos: Todo[]) => void;
}

type SortOption = 'importance' | 'urgency' | 'estimatedTime' | 'createdAt' | 'status';

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdateTodos }) => {
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  
  const [isOpen, setIsOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Apply filters and sorting to todos
  useEffect(() => {
    let result = [...todos];
    
    // Apply text filter
    if (filter) {
      const lowerFilter = filter.toLowerCase();
      result = result.filter(todo => 
        todo.title.toLowerCase().includes(lowerFilter) || 
        todo.description.toLowerCase().includes(lowerFilter)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(todo => todo.status === statusFilter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'importance':
          // Convert enum to numeric value for comparison
          {
            const importanceMap = { 
              [Importance.HIGH]: 3, 
              [Importance.MEDIUM]: 2, 
              [Importance.LOW]: 1 
            };
            comparison = importanceMap[a.importance] - importanceMap[b.importance];
          }
          break;
          
        case 'urgency': {
          const urgencyMap = { 
            [Urgency.URGENT]: 3, 
            [Urgency.NORMAL]: 2, 
            [Urgency.LOW]: 1 
          };
          comparison = urgencyMap[a.urgency] - urgencyMap[b.urgency];
          break;
        }
          
        case 'estimatedTime':
          comparison = a.estimatedTime - b.estimatedTime;
          break;
          
        case 'status':
          {
            const statusMap = { 
              [Status.NOT_STARTED]: 1, 
              [Status.IN_PROGRESS]: 2, 
              [Status.COMPLETED]: 3 
            };
            comparison = statusMap[a.status] - statusMap[b.status];
          }
          break;
          
        case 'createdAt':
        default:
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredTodos(result);
  }, [todos, sortBy, sortOrder, filter, statusFilter]);

  const handleStatusChange = (id: string, status: Status) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        const updatedTodo = { 
          ...todo, 
          status,
          // If status is completed and wasn't before, set completedAt
          completedAt: status === Status.COMPLETED && todo.status !== Status.COMPLETED 
            ? new Date() 
            : todo.completedAt
        };
        return updatedTodo;
      }
      return todo;
    });
    
    onUpdateTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: string) => {
    setTodoToDelete(id);
    setIsOpen(true);
  };

  const confirmDelete = () => {
    if (!todoToDelete) return;
    
    // Remove the to-do
    const updatedTodos = todos.map(todo => {
      // Remove the deleted todo from blockedBy and blocks arrays
      if (todo.blockedBy.includes(todoToDelete)) {
        return {
          ...todo,
          blockedBy: todo.blockedBy.filter(id => id !== todoToDelete)
        };
      }
      if (todo.blocks.includes(todoToDelete)) {
        return {
          ...todo,
          blocks: todo.blocks.filter(id => id !== todoToDelete)
        };
      }
      return todo;
    }).filter(todo => todo.id !== todoToDelete);
    
    onUpdateTodos(updatedTodos);
    
    setIsOpen(false);
    setTodoToDelete(null);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleEditTodo = (updatedTodo: Todo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    onUpdateTodos(updatedTodos);
  };

  // Count todos by status
  const getStatusCounts = () => {
    const counts = {
      all: todos.length,
      [Status.NOT_STARTED]: 0,
      [Status.IN_PROGRESS]: 0,
      [Status.COMPLETED]: 0,
    };
    
    todos.forEach(todo => {
      counts[todo.status] += 1;
    });
    
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Tasks</Typography>
        <Box display="flex" gap={1}>
          <FormControl size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              label="Sort By"
            >
              <MenuItem value="importance">
                <StarIcon fontSize="small" /> Importance
              </MenuItem>
              <MenuItem value="urgency">
                <WarningIcon fontSize="small" /> Urgency
              </MenuItem>
              <MenuItem value="estimatedTime">
                <TimeIcon fontSize="small" /> Time Estimate
              </MenuItem>
              <MenuItem value="status">
                <CheckIcon fontSize="small" /> Status
              </MenuItem>
              <MenuItem value="createdAt">Date Created</MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={toggleSortOrder}>
            <ChevronDownIcon
              style={{
                transform: sortOrder === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)',
              }}
            />
          </IconButton>
        </Box>
      </Box>

      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        <TextField
          label="Search tasks..."
          variant="outlined"
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          fullWidth
        />
        <FormControl size="small" fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Status | 'all')}
            label="Status"
          >
            <MenuItem value="all">All Tasks ({statusCounts.all})</MenuItem>
            <MenuItem value={Status.NOT_STARTED}>
              Not Started ({statusCounts[Status.NOT_STARTED]})
            </MenuItem>
            <MenuItem value={Status.IN_PROGRESS}>
              In Progress ({statusCounts[Status.IN_PROGRESS]})
            </MenuItem>
            <MenuItem value={Status.COMPLETED}>
              Completed ({statusCounts[Status.COMPLETED]})
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredTodos.length === 0 ? (
        <Box p={2} textAlign="center">
          <Typography color="textSecondary">No tasks found.</Typography>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {filteredTodos.map((todo) => (
            <Box key={todo.id} display="flex" alignItems="center">
              <TodoItem
                todo={todo}
                allTodos={todos}
                onStatusChange={handleStatusChange}
              />
            </Box>
          ))}
        </Box>
      )}

      <Box mt={4} p={2} border={1} borderRadius={2} borderColor="divider" display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontWeight="bold">Total Tasks: {filteredTodos.length}</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <TimeIcon color="primary" />
          <Typography variant="body2" color="text.secondary">
            Total Time: {filteredTodos.reduce((acc, todo) => acc + todo.estimatedTime, 0)} minutes
          </Typography>
        </Box>
      </Box>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} ref={cancelRef}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TodoList;

