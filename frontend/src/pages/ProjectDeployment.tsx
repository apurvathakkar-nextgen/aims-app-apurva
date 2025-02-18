import React, { useState } from 'react';
import './ProjectDeployment.css'; // Create this file for custom styles

interface Release {
  id: string;
  version: string;
  releaseDate: string;
  status: 'Planned' | 'In Progress' | 'Completed';
}

interface Deployment {
  id: string;
  environment: string;
  deploymentDate: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Failed';
}

interface PostLaunchActivity {
  id: string;
  description: string;
  assignedTo: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

const ProjectDeployment: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>([
    {
      id: 'release-1',
      version: '1.0.0',
      releaseDate: '2023-10-01',
      status: 'Planned',
    },
    {
      id: 'release-2',
      version: '1.1.0',
      releaseDate: '2023-11-15',
      status: 'In Progress',
    },
  ]);

  const [deployments, setDeployments] = useState<Deployment[]>([
    {
      id: 'deployment-1',
      environment: 'Production',
      deploymentDate: '2023-10-05',
      status: 'Completed',
    },
    {
      id: 'deployment-2',
      environment: 'Staging',
      deploymentDate: '2023-11-20',
      status: 'Pending',
    },
  ]);

  const [postLaunchActivities, setPostLaunchActivities] = useState<PostLaunchActivity[]>([
    {
      id: 'activity-1',
      description: 'Monitor application performance',
      assignedTo: 'John Doe',
      status: 'Not Started',
    },
    {
      id: 'activity-2',
      description: 'Gather user feedback',
      assignedTo: 'Jane Smith',
      status: 'In Progress',
    },
  ]);

  const [newRelease, setNewRelease] = useState({
    version: '',
    releaseDate: '',
    status: 'Planned',
  });

  const [newDeployment, setNewDeployment] = useState({
    environment: '',
    deploymentDate: '',
    status: 'Pending',
  });

  const [newPostLaunchActivity, setNewPostLaunchActivity] = useState({
    description: '',
    assignedTo: '',
    status: 'Not Started',
  });

  const handleAddRelease = (e: React.FormEvent) => {
    e.preventDefault();

    const newReleaseData = {
      id: `release-${releases.length + 1}`,
      version: newRelease.version,
      releaseDate: newRelease.releaseDate,
      status: newRelease.status,
    };

    setReleases((prev) => [...prev, newReleaseData]);

    // Reset the form
    setNewRelease({
      version: '',
      releaseDate: '',
      status: 'Planned',
    });
  };

  const handleAddDeployment = (e: React.FormEvent) => {
    e.preventDefault();

    const newDeploymentData = {
      id: `deployment-${deployments.length + 1}`,
      environment: newDeployment.environment,
      deploymentDate: newDeployment.deploymentDate,
      status: newDeployment.status,
    };

    setDeployments((prev) => [...prev, newDeploymentData]);

    // Reset the form
    setNewDeployment({
      environment: '',
      deploymentDate: '',
      status: 'Pending',
    });
  };

  const handleAddPostLaunchActivity = (e: React.FormEvent) => {
    e.preventDefault();

    const newPostLaunchActivityData = {
      id: `activity-${postLaunchActivities.length + 1}`,
      description: newPostLaunchActivity.description,
      assignedTo: newPostLaunchActivity.assignedTo,
      status: newPostLaunchActivity.status,
    };

    setPostLaunchActivities((prev) => [...prev, newPostLaunchActivityData]);

    // Reset the form
    setNewPostLaunchActivity({
      description: '',
      assignedTo: '',
      status: 'Not Started',
    });
  };

  return (
    <div className="project-deployment-container">
      <h1>Project Deployment</h1>

      {/* Release Management Section */}
      <section className="release-management-section">
        <h2>Release Management</h2>
        <form onSubmit={handleAddRelease} className="compact-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Version"
              value={newRelease.version}
              onChange={(e) =>
                setNewRelease({ ...newRelease, version: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              value={newRelease.releaseDate}
              onChange={(e) =>
                setNewRelease({ ...newRelease, releaseDate: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <select
              value={newRelease.status}
              onChange={(e) =>
                setNewRelease({ ...newRelease, status: e.target.value as 'Planned' | 'In Progress' | 'Completed' })
              }
              required
            >
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Add Release
          </button>
        </form>
        <div className="releases-grid">
          {releases.map((release) => (
            <div key={release.id} className="release-card">
              <h3>Version: {release.version}</h3>
              <p>Release Date: {release.releaseDate}</p>
              <p>Status: {release.status}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deployment Tracking Section */}
      <section className="deployment-tracking-section">
        <h2>Deployment Tracking</h2>
        <form onSubmit={handleAddDeployment} className="compact-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Environment"
              value={newDeployment.environment}
              onChange={(e) =>
                setNewDeployment({ ...newDeployment, environment: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              value={newDeployment.deploymentDate}
              onChange={(e) =>
                setNewDeployment({ ...newDeployment, deploymentDate: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <select
              value={newDeployment.status}
              onChange={(e) =>
                setNewDeployment({ ...newDeployment, status: e.target.value as 'Pending' | 'In Progress' | 'Completed' | 'Failed' })
              }
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Add Deployment
          </button>
        </form>
        <div className="deployments-grid">
          {deployments.map((deployment) => (
            <div key={deployment.id} className="deployment-card">
              <h3>Environment: {deployment.environment}</h3>
              <p>Deployment Date: {deployment.deploymentDate}</p>
              <p>Status: {deployment.status}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Post-Launch Activities Section */}
      <section className="post-launch-activities-section">
        <h2>Post-Launch Activities</h2>
        <form onSubmit={handleAddPostLaunchActivity} className="compact-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Description"
              value={newPostLaunchActivity.description}
              onChange={(e) =>
                setNewPostLaunchActivity({ ...newPostLaunchActivity, description: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Assigned To"
              value={newPostLaunchActivity.assignedTo}
              onChange={(e) =>
                setNewPostLaunchActivity({ ...newPostLaunchActivity, assignedTo: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <select
              value={newPostLaunchActivity.status}
              onChange={(e) =>
                setNewPostLaunchActivity({ ...newPostLaunchActivity, status: e.target.value as 'Not Started' | 'In Progress' | 'Completed' })
              }
              required
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Add Activity
          </button>
        </form>
        <div className="activities-grid">
          {postLaunchActivities.map((activity) => (
            <div key={activity.id} className="activity-card">
              <h3>Description: {activity.description}</h3>
              <p>Assigned To: {activity.assignedTo}</p>
              <p>Status: {activity.status}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectDeployment;