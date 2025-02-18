import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem.tsx';

// Define Kanban Board Columns
const columns = [
  { id: 'Draft', title: 'Draft' },
  { id: 'Review', title: 'Review' },
  { id: 'Approved', title: 'Approved' },
  { id: 'Development', title: 'Development' },
  { id: 'Testing', title: 'Testing & Deployment' }
];

// Sample initial tasks
const initialTasks = [
  { id: '1', name: 'New Automation Idea', status: 'Draft' },
  { id: '2', name: 'Process Review', status: 'Review' },
  { id: '3', name: 'Approval Meeting', status: 'Approved' }
];

const ProjectDevelopment = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [selectedColumn, setSelectedColumn] = useState(columns[0].id);

  // Sensors for Drag & Drop
  const sensors = useSensors(useSensor(PointerSensor));

  // Handle drag start
  const handleDragStart = (event) => {
    const { active } = event;
    setActiveTask(tasks.find((task) => task.id === active.id));
  };

  // Handle drag end (Fixed disappearing tasks)
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const draggedTask = tasks.find((task) => task.id === active.id);
    const newColumnId = over.id;

    if (!draggedTask) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === active.id ? { ...task, status: newColumnId } : task
      )
    );

    setActiveTask(null);
  };

  // Handle adding a new task
  const handleAddTask = () => {
    if (!newTaskName.trim()) return;
    const newTask = { id: Date.now().toString(), name: newTaskName, status: selectedColumn };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setOpenDialog(false);
    setNewTaskName('');
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#004aad' }}>
        Project Development Kanban Board
      </Typography>

      <Button variant="contained" onClick={() => setOpenDialog(true)} sx={{ mb: 2 }}>
        + Add Task
      </Button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
          {columns.map((column) => (
            <KanbanColumn key={column.id} column={column} tasks={tasks} />
          ))}
        </Box>

        <DragOverlay>
          {activeTask ? (
            <Paper sx={{ mb: 2, padding: 1.5, backgroundColor: '#f5f5f5' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                {activeTask.name}
              </Typography>
            </Paper>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Add Task Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Name"
            fullWidth
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Column</InputLabel>
            <Select
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
            >
              {columns.map((column) => (
                <MenuItem key={column.id} value={column.id}>
                  {column.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddTask}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Kanban Column Component (Fixed Droppable Area)
const KanbanColumn = ({ column, tasks }) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <Box ref={setNodeRef} sx={{ flex: 1, padding: 2, minWidth: 250 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {column.title}
      </Typography>
      <Paper sx={{ padding: 2, minHeight: 200, backgroundColor: '#f9f9f9' }}>
        <SortableContext
          id={column.id}
          items={tasks.filter((task) => task.status === column.id).map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks
            .filter((task) => task.status === column.id)
            .map((task) => (
              <SortableItem key={task.id} id={task.id} task={task} />
            ))}
        </SortableContext>
      </Paper>
    </Box>
  );
};

export default ProjectDevelopment;
