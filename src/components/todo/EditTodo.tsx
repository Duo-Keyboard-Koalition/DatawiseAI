import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Todo, Status, Importance, Urgency } from '../../types/Todo';

// Sample initial todos for demonstration
const getSampleTodos = (): Todo[] => [
  {
    id: uuidv4(),
    title: 'Create Notion-like Todo App',
    description:
      'Build a todo app with React, TypeScript, and Material UI that includes task dependencies and priority management.',
    importance: Importance.HIGH,
    urgency: Urgency.URGENT,
    status: Status.COMPLETED,
    estimatedTime: 180,
    blockedBy: [],
    blocks: [uuidv4()], // Example: this will be replaced with actual IDs once more todos are created
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    completedAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Add Filtering & Sorting',
    description:
      'Implement filtering by status and sorting by importance, urgency, and time.',
    importance: Importance.MEDIUM,
    urgency: Urgency.NORMAL,
    status: Status.IN_PROGRESS,
    estimatedTime: 90,
    blockedBy: [],
    blocks: [],
    createdAt: new Date(Date.now() - 43200000), // 12 hours ago
  },
  {
    id: uuidv4(),
    title: 'Deploy to Production',
    description: 'Deploy the finished app to a hosting provider.',
    importance: Importance.HIGH,
    urgency: Urgency.LOW,
    status: Status.NOT_STARTED,
    estimatedTime: 60,
    blockedBy: [],
    blocks: [],
    createdAt: new Date(),
  },
];

// Function to fix circular references between todos
const fixSampleTodoReferences = (todos: Todo[]): Todo[] => {
  const deployTodo = todos[2];
  deployTodo.blockedBy = [todos[0].id, todos[1].id];

  const createAppTodo = todos[0];
  createAppTodo.blocks = [deployTodo.id];

  const filterSortTodo = todos[1];
  filterSortTodo.blocks = [deployTodo.id];

  return todos;
};

export default function App() {
  // Set up dark/light mode
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('notion-todos');
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos, (key, value) =>
          ['createdAt', 'completedAt'].includes(key)
            ? value
              ? new Date(value)
              : value
            : value
        );
      } catch (error) {
        console.error('Error parsing saved todos:', error);
        return fixSampleTodoReferences(getSampleTodos());
      }
    }
    return fixSampleTodoReferences(getSampleTodos());
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notion-todos', JSON.stringify(todos));
  }, [todos]);

  // Toggle dark/light mode
  const toggleColorMode = () => {
    setColorMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Handle adding a new todo
  const handleAddTodo = (newTodoData: Omit<Todo, 'id' | 'createdAt' | 'completedAt'>) => {
    const newTodo: Todo = {
      ...newTodoData,
      id: uuidv4(),
      createdAt: new Date(),
    };

    const updatedTodos = todos.map((todo) => ({
      ...todo,
      blockedBy: newTodoData.blocks.includes(todo.id)
        ? [...todo.blockedBy, newTodo.id]
        : todo.blockedBy,
      blocks: newTodoData.blockedBy.includes(todo.id)
        ? [...todo.blocks, newTodo.id]
        : todo.blocks,
    }));

    setTodos([...updatedTodos, newTodo]);
  };

  const updateTodos = (updatedTodos: Todo[]) => {
    setTodos(updatedTodos);
  };

  // Material UI Theme Configuration
  const theme = createTheme({
    palette: {
      mode: colorMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Notion Todo
          </Typography>
          <IconButton onClick={toggleColorMode}>
            {colorMode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" style={{ marginTop: '80px', marginBottom: '20px' }}>
        <Grid container spacing={3}>
          {/* Sidebar for Add Todo Form */}
          <Grid item xs={12} lg={4}>
            <Paper style={{ padding: '16px' }}>
              <AddTodo onAddTodo={handleAddTodo} existingTodos={todos} />
            </Paper>
          </Grid>

          {/* Main Todo List */}
          <Grid item xs={12} lg={8}>
            <Paper style={{ padding: '16px' }}>
              <TodoList todos={todos} onUpdateTodos={updateTodos} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
