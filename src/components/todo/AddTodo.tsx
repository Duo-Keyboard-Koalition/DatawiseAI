import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Todo, Status, Importance, Urgency } from '../../types/Todo';

interface AddTodoProps {
  onAddTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'completedAt'>) => void;
  existingTodos: Todo[];
}

const AddTodo: React.FC<AddTodoProps> = ({ onAddTodo, existingTodos }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState<Importance>(Importance.MEDIUM);
  const [urgency, setUrgency] = useState<Urgency>(Urgency.NORMAL);
  const [estimatedTime, setEstimatedTime] = useState(30); // Default 30 minutes
  const [blockedBy, setBlockedBy] = useState<string[]>([]);
  const [blocks, setBlocks] = useState<string[]>([]);

  // Form validation
  const [titleError, setTitleError] = useState('');
  const [estimatedTimeError, setEstimatedTimeError] = useState('');

  // Validate form fields
  useEffect(() => {
    if (title.trim().length > 0) {
      setTitleError('');
    }

    if (estimatedTime > 0) {
      setEstimatedTimeError('');
    }
  }, [title, estimatedTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate before submitting
    let isValid = true;

    if (title.trim().length === 0) {
      setTitleError('Title is required');
      isValid = false;
    }

    if (estimatedTime <= 0) {
      setEstimatedTimeError('Estimated time must be greater than 0');
      isValid = false;
    }

    if (!isValid) return;

    // Create new todo object
    const newTodo = {
      title: title.trim(),
      description,
      importance,
      urgency,
      status: Status.NOT_STARTED,
      estimatedTime,
      blockedBy,
      blocks,
    };

    onAddTodo(newTodo);

    // Reset form
    setTitle('');
    setDescription('');
    setImportance(Importance.MEDIUM);
    setUrgency(Urgency.NORMAL);
    setEstimatedTime(30);
    setBlockedBy([]);
    setBlocks([]);
  };

  // Function to prevent circular dependencies
  const getAvailableBlockers = () => {
    // Cannot be blocked by tasks that this task already blocks
    return existingTodos.filter((todo) => !blocks.includes(todo.id));
  };

  const getAvailableBlockees = () => {
    // Cannot block tasks that already block this task
    return existingTodos.filter((todo) => !blockedBy.includes(todo.id));
  };

  return (
    <Box p={3} boxShadow={1} borderRadius={2} bgcolor="background.paper">
      <Typography variant="h6" gutterBottom>
        Add New Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal" error={!!titleError}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            required
            helperText={titleError}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            multiline
            rows={3}
          />
        </FormControl>

        <Box display="flex" gap={2} marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel>Importance</InputLabel>
            <Select
              value={importance}
              onChange={(e) => setImportance(e.target.value as Importance)}
            >
              {Object.values(Importance).map((imp) => (
                <MenuItem key={imp} value={imp}>
                  {imp}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Urgency</InputLabel>
            <Select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as Urgency)}
            >
              {Object.values(Urgency).map((urg) => (
                <MenuItem key={urg} value={urg}>
                  {urg}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <FormControl fullWidth margin="normal" error={!!estimatedTimeError}>
          <TextField
            label="Estimated Time (minutes)"
            type="number"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(Number(e.target.value))}
            inputProps={{ min: 1, max: 10080 }}
            helperText={estimatedTimeError}
          />
        </FormControl>

        {existingTodos.length > 0 && (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel>Blocked By (Dependencies)</InputLabel>
              <Select
                multiple
                value={blockedBy}
                onChange={(e) => setBlockedBy(e.target.value as string[])}
                renderValue={(selected) =>
                  selected
                    .map((id) => existingTodos.find((todo) => todo.id === id)?.title)
                    .join(', ')
                }
              >
                {getAvailableBlockers().map((todo) => (
                  <MenuItem key={todo.id} value={todo.id}>
                    <Checkbox checked={blockedBy.includes(todo.id)} />
                    <ListItemText primary={todo.title} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Blocks (Tasks that depend on this)</InputLabel>
              <Select
                multiple
                value={blocks}
                onChange={(e) => setBlocks(e.target.value as string[])}
                renderValue={(selected) =>
                  selected
                    .map((id) => existingTodos.find((todo) => todo.id === id)?.title)
                    .join(', ')
                }
              >
                {getAvailableBlockees().map((todo) => (
                  <MenuItem key={todo.id} value={todo.id}>
                    <Checkbox checked={blocks.includes(todo.id)} />
                    <ListItemText primary={todo.title} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          fullWidth
        >
          Add Task
        </Button>
      </form>
    </Box>
  );
};

export default AddTodo;

