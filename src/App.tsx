import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.tsx";
import SignUp from "./SignUp.tsx";
import Workspace from "./pages/Workspace.tsx";
import Teams from "./pages/Teams.tsx";
import ProjectSummary from "./pages/ProjectSummary.tsx";
import ProjectPlanning from "./pages/ProjectPlanning.tsx";
import ProjectDevelopment from "./pages/ProjectDevelopment.tsx";
import ProjectTesting from "./pages/ProjectTesting.tsx";
import ProjectDeployment from "./pages/ProjectDeployment.tsx";
import IdeaManagementPage from "./pages/IdeaManagementPage.tsx"; // Import the new component
import PrivateRoute from "./components/PrivateRoute.tsx";
import Layout from "./components/Layout.tsx";

// Define public and protected routes
const publicRoutes = [
  { path: '/', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
];

const protectedRoutes = [
  { path: '/workspace', element: <Workspace /> },
  { path: '/teams', element: <Teams /> },
  { path: '/project-summary', element: <ProjectSummary /> },
  { path: '/project-planning', element: <ProjectPlanning /> },
  { path: '/project-development', element: <ProjectDevelopment /> },
  { path: '/idea-management', element: <IdeaManagementPage /> },
  { path: '/project-testing', element: <ProjectTesting /> },
  { path: '/project-deployment', element: <ProjectDeployment /> },
];

function App() {
  console.log("App Component Rendered");

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map((route, index) => {
            console.log(`Rendering public route: ${route.path}`);
            return (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            );
          })}

          {/* Protected Routes */}
          {protectedRoutes.map((route, index) => {
            console.log(`Rendering protected route: ${route.path}`);
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute>
                    {route.element}
                  </PrivateRoute>
                }
              />
            );
          })}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
