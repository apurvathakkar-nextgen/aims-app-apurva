// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.tsx";
import SignUp from "./SignUp.tsx";
import Dashboard from "./pages/Dashboard.tsx"; // Your Dashboard component
import Workspace from "./pages/Workspace.tsx";
import Teams from "./pages/Teams.tsx";
import ProjectSummary from "./pages/ProjectSummary.tsx";
import ProjectPlanning from "./pages/ProjectPlanning.tsx";
import ProjectDevelopment from "./pages/ProjectDevelopment.tsx";
import ProjectTesting from "./pages/ProjectTesting.tsx";
import ProjectDeployment from "./pages/ProjectDeployment.tsx";
import IdeaManagementPage from "./pages/IdeaManagementPage.tsx";
import Approval from "./pages/Approval.tsx"; 
import ControlRoom from "./pages/ControlRoom.tsx"; 
import PrivateRoute from "./components/PrivateRoute.tsx";
import Layout from "./components/Layout.tsx";

// Define public and protected routes
const publicRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
];

const protectedRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/workspace', element: <Workspace /> },
  { path: '/teams', element: <Teams /> },
  { path: '/project-summary', element: <ProjectSummary /> },
  { path: '/project-planning', element: <ProjectPlanning /> },
  { path: '/project-development', element: <ProjectDevelopment /> },
  { path: '/idea-management', element: <IdeaManagementPage /> },
  { path: '/project-testing', element: <ProjectTesting /> },
  { path: '/project-deployment', element: <ProjectDeployment /> },
  { path: '/approval', element: <Approval /> },         // Added route
  { path: '/settings', element: <ControlRoom /> },        // Added route
];

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {/* Protected Routes */}
          {protectedRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<PrivateRoute>{route.element}</PrivateRoute>}
            />
          ))}
          {/* Optionally, redirect unknown paths */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
