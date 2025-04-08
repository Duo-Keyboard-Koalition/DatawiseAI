import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Container,
  Typography,
} from '@mui/material';
import CustomGrid from '../components/todo/CustomGrid';
import TodoList from '../components/todo/TodoList';
import { Todo, Status, Importance, Urgency } from '../types/Todo';

const getSampleTodos = (): Todo[] => [
  {
    id: uuidv4(),
    title: 'Create Notion-like Todo App',
    description: 'Build a todo app with React, TypeScript, and Material-UI that includes task dependencies and priority management.',
    importance: Importance.HIGH,
    urgency: Urgency.URGENT,
    status: Status.COMPLETED,
    estimatedTime: 180,
    blockedBy: [],
    blocks: [uuidv4()],
    createdAt: new Date(Date.now() - 86400000),
    completedAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Add Filtering & Sorting',
    description: 'Implement filtering by status and sorting by importance, urgency, and time.',
    importance: Importance.MEDIUM,
    urgency: Urgency.NORMAL,
    status: Status.IN_PROGRESS,
    estimatedTime: 90,
    blockedBy: [],
    blocks: [],
    createdAt: new Date(Date.now() - 43200000),
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

const fixSampleTodoReferences = (todos: Todo[]): Todo[] => {
  const deployTodo = todos[2];
  deployTodo.blockedBy = [todos[0].id, todos[1].id];

  const createAppTodo = todos[0];
  createAppTodo.blocks = [deployTodo.id];

  const filterSortTodo = todos[1];
  filterSortTodo.blocks = [deployTodo.id];

  return todos;
};

export default function Tasks() {
  const [todos, setTodos] = useState<Todo[]>(() => fixSampleTodoReferences(getSampleTodos()));

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (newTodoData: Omit<Todo, 'id' | 'createdAt' | 'completedAt'>) => {
    const newTodo: Todo = {
      ...newTodoData,
      id: uuidv4(),
      createdAt: new Date(),
    };

    const updatedTodos = todos.map((todo) => {
      if (newTodoData.blocks.includes(todo.id)) {
        return { ...todo, blockedBy: [...todo.blockedBy, newTodo.id] };
      }
      if (newTodoData.blockedBy.includes(todo.id)) {
        return { ...todo, blocks: [...todo.blocks, newTodo.id] };
      }
      return todo;
    });

    setTodos([...updatedTodos, newTodo]);
  };

  const updateTodos = (updatedTodos: Todo[]) => {
    setTodos(updatedTodos);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>
      <CustomGrid container spacing={4}>
        <CustomGrid item xs={12}>
          <TodoList todos={todos} onUpdateTodos={updateTodos} />
        </CustomGrid>
      </CustomGrid>
    </Container>
  );
}