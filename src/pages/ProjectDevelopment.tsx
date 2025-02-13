import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Add as AddIcon, Send, Code } from '@mui/icons-material';

const ProjectDevelopment = () => {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      projectId: '101',
      name: 'Implement Login Feature',
      status: 'To Do',
      description: 'Implement user authentication and login functionality.',
      deadline: '2023-11-15',
      assignedTo: 'John Doe',
      priority: 'High',
      repository: 'https://github.com/project/login',
      comments: [],
    },
    {
      id: '2',
      projectId: '101',
      name: 'Refactor API Endpoints',
      status: 'In Progress',
      description: 'Refactor existing API endpoints for better performance.',
      deadline: '2023-11-20',
      assignedTo: 'Jane Smith',
      priority: 'Medium',
      repository: 'https://github.com/project/api',
      comments: [],
    },
    {
      id: '3',
      projectId: '101',
      name: 'Fix UI Bugs',
      status: 'Code Review',
      description: 'Fix UI bugs reported in the latest sprint.',
      deadline: '2023-11-10',
      assignedTo: 'Alice Johnson',
      priority: 'Low',
      repository: 'https://github.com/project/ui',
      comments: [],
    },
  ]);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    deadline: '',
    assignedTo: '',
    priority: 'Medium',
    repository: '',
  });
  const [newComment, setNewComment] = useState('');
  const teamMembers = ['John Doe', 'Jane Smith', 'Alice Johnson']; // Sample team members

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If the task is dropped outside a droppable area, do nothing
    if (!destination) return;

    // If the task is dropped in the same place, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the task being dragged
    const task = tasks.find((task) => task.id === draggableId);

    // Update the task's status based on the destination column
    const updatedTask = { ...task, status: destination.droppableId };

    // Remove the task from its original position
    const updatedTasks = tasks.filter((task) => task.id !== draggableId);

    // Insert the task into its new position
    updatedTasks.splice(destination.index, 0, updatedTask);

    // Update the state with the new task order
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    if (newTask.name && newTask.deadline) {
      const task = {
        id: `task-${tasks.length + 1}`,
        projectId: '101', // Default project ID
        ...newTask,
        status: 'To Do',
        comments: [],
      };
      setTasks([...tasks, task]);
      setNewTask({
        name: '',
        description: '',
        deadline: '',
        assignedTo: '',
        priority: 'Medium',
        repository: '',
      });
    }
  };

  const handleAddComment = (taskId, comment) => {
    if (comment.trim()) {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              comments: [
                ...task.comments,
                { id: task.comments.length + 1, text: comment, user: 'You', timestamp: new Date().toLocaleString() },
              ],
            }
          : task
      );
      setTasks(updatedTasks);
      setNewComment('');
    }
  };

  const handleAssignmentChange = (taskId, newAssignee) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, assignedTo: newAssignee } : task
    );
    setTasks(updatedTasks);
  };

  const columns = [
    { id: 'To Do', title: 'To Do' },
    { id: 'In Progress', title: 'In Progress' },
    { id: 'Code Review', title: 'Code Review' },
    { id: 'Completed', title: 'Completed' },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#004aad' }}>
        Project Development
      </Typography>

      {/* Add New Task Form */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add New Task
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Task Name"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Deadline"
            type="date"
            value={newTask.deadline}
            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Repository"
            value={newTask.repository}
            onChange={(e) => setNewTask({ ...newTask, repository: e.target.value })}
            sx={{ flex: 1 }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddTask}
            sx={{ flex: 1, backgroundColor: '#004aad', '&:hover': { backgroundColor: '#003882' } }}
          >
            Add Task
          </Button>
        </Box>
      </Box>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <Paper
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{ flex: 1, padding: 2, minWidth: 250 }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {column.title}
                  </Typography>
                  {tasks
                    .filter((task) => task.status === column.id)
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <Paper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{ mb: 2, padding: 1.5, backgroundColor: '#f5f5f5' }}
                          >
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                              {task.name}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1, fontSize: '0.8rem' }}>
                              {task.description}
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', mb: 1, fontSize: '0.75rem' }}>
                              Deadline: {task.deadline}
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', mb: 1, fontSize: '0.75rem' }}>
                              Assigned To:
                              <Select
                                value={task.assignedTo}
                                onChange={(e) => handleAssignmentChange(task.id, e.target.value)}
                                sx={{ ml: 1, fontSize: '0.75rem' }}
                              >
                                {teamMembers.map((member) => (
                                  <MenuItem key={member} value={member} sx={{ fontSize: '0.75rem' }}>
                                    {member}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', mb: 1, fontSize: '0.75rem' }}>
                              Priority: {task.priority}
                            </Typography>
                            <Button
                              variant="outlined"
                              startIcon={<Code />}
                              href={task.repository}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{ mt: 1, fontSize: '0.75rem' }}
                            >
                              View Repository
                            </Button>

                            {/* Task Comments */}
                            <List sx={{ mt: 2 }}>
                              {task.comments.map((comment) => (
                                <ListItem key={comment.id} sx={{ py: 0.5 }}>
                                  <ListItemAvatar>
                                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                                      {comment.user[0]}
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={comment.user}
                                    secondary={
                                      <>
                                        <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.75rem' }}>
                                          {comment.text}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
                                          {comment.timestamp}
                                        </Typography>
                                      </>
                                    }
                                  />
                                </ListItem>
                              ))}
                            </List>
                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                sx={{ fontSize: '0.75rem' }}
                              />
                              <Button
                                variant="contained"
                                startIcon={<Send />}
                                onClick={() => handleAddComment(task.id, newComment)}
                                sx={{ backgroundColor: '#004aad', '&:hover': { backgroundColor: '#003882' }, fontSize: '0.75rem' }}
                              >
                                Send
                              </Button>
                            </Box>
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </Paper>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default ProjectDevelopment;