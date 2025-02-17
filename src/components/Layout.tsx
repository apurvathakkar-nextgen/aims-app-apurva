import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.tsx';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideSidebarPaths = ['/', '/signup']; // no longer "/"

  const shouldShowSidebar = !hideSidebarPaths.includes(location.pathname);

  return (
    <Box sx={{ display: 'flex' }}>
      {shouldShowSidebar && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
