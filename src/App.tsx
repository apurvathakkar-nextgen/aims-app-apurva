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
import PrivateRoute from "./components/PrivateRoute.tsx";
import Layout from "./components/Layout.tsx";

function App() {
  return (
    <Router>
      <Layout> {/* Wrap Everything in Layout */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/workspace"
            element={
              <PrivateRoute>
                <Workspace />
              </PrivateRoute>
            }
          />
          <Route
            path="/teams"
            element={
              <PrivateRoute>
                <Teams />
              </PrivateRoute>
            }
          />
          <Route
            path="/project-summary"
            element={
              <PrivateRoute>
                <ProjectSummary />
              </PrivateRoute>
            }
          />
          <Route
            path="/project-planning"
            element={
              <PrivateRoute>
                <ProjectPlanning />
              </PrivateRoute>
            }
          />
          <Route
            path="/project-development"
            element={
              <PrivateRoute>
                <ProjectDevelopment />
              </PrivateRoute>
            }
          />
          <Route
            path="/project-testing"
            element={
              <PrivateRoute>
                <ProjectTesting />
              </PrivateRoute>
            }
          />
          <Route
            path="/project-deployment"
            element={
              <PrivateRoute>
                <ProjectDeployment />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;