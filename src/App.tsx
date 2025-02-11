import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login.tsx';
import SignUp from './SignUp.tsx';
import Workspace from './pages/Workspace.tsx';
import Teams from "./pages/Teams.tsx";
import Project from "./pages/Project.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/workspace" element={<PrivateRoute><Workspace /></PrivateRoute>} />
        <Route path="/teams" element={<PrivateRoute><Teams /></PrivateRoute>} />
        <Route path="/project/:id" element={<PrivateRoute><Project /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
