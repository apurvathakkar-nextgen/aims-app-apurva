import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Paper, Typography } from '@mui/material';

export const SortableItem = ({ id, task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{ mb: 2, padding: 1.5, backgroundColor: '#f5f5f5', cursor: 'grab' }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
        {task.name}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
        Status: {task.status}
      </Typography>
    </Paper>
  );
};
