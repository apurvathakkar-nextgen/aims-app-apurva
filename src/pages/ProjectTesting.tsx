import React, { useState } from 'react';
import './ProjectTesting.css';

interface TestCase {
  id: string;
  description: string;
  steps: string[];
  expectedResult: string;
  status: 'Pass' | 'Fail' | 'Not Run';
}

interface Bug {
  id: string;
  description: string;
  stepsToReproduce: string[];
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Closed';
}

const ProjectTesting: React.FC = () => {
  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: 'tc-1',
      description: 'Drag-and-Drop Within a Column',
      steps: [
        'Open the Kanban board.',
        'Drag a task from one position to another within the same column.',
      ],
      expectedResult: 'The task should move to the new position.',
      status: 'Not Run',
    },
    {
      id: 'tc-2',
      description: 'Cross-Column Drag-and-Drop',
      steps: [
        'Open the Kanban board.',
        'Drag a task from the "To Do" column and drop it into the "In Progress" column.',
      ],
      expectedResult: 'The task should move to the "In Progress" column.',
      status: 'Not Run',
    },
  ]);

  const [bugs, setBugs] = useState<Bug[]>([
    {
      id: 'bug-1',
      description: 'Task Disappears After Drag-and-Drop',
      stepsToReproduce: [
        'Drag a task from the "To Do" column to the "In Progress" column.',
        'Observe the task list in both columns.',
      ],
      priority: 'High',
      status: 'Open',
    },
    {
      id: 'bug-2',
      description: 'Incorrect Task Order After Drag-and-Drop',
      stepsToReproduce: [
        'Drag a task to a new position within the same column.',
        'Observe the order of tasks.',
      ],
      priority: 'Medium',
      status: 'Open',
    },
  ]);

  const [newTestCase, setNewTestCase] = useState({
    description: '',
    steps: [''],
    expectedResult: '',
  });

  const updateTestCaseStatus = (id: string, status: 'Pass' | 'Fail' | 'Not Run') => {
    setTestCases((prevTestCases) =>
      prevTestCases.map((testCase) =>
        testCase.id === id ? { ...testCase, status } : testCase
      )
    );
  };

  const updateBugStatus = (id: string, status: 'Open' | 'In Progress' | 'Closed') => {
    setBugs((prevBugs) =>
      prevBugs.map((bug) => (bug.id === id ? { ...bug, status } : bug))
    );
  };

  const handleAddStep = () => {
    setNewTestCase((prev) => ({
      ...prev,
      steps: [...prev.steps, ''],
    }));
  };

  const handleStepChange = (index: number, value: string) => {
    setNewTestCase((prev) => ({
      ...prev,
      steps: prev.steps.map((step, i) => (i === index ? value : step)),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTestCaseData = {
      id: `tc-${testCases.length + 1}`,
      description: newTestCase.description,
      steps: newTestCase.steps.filter((step) => step.trim() !== ''),
      expectedResult: newTestCase.expectedResult,
      status: 'Not Run',
    };

    setTestCases((prev) => [...prev, newTestCaseData]);

    // Reset the form
    setNewTestCase({
      description: '',
      steps: [''],
      expectedResult: '',
    });
  };

  return (
    <div className="project-testing-container">
      <h1>Project Testing</h1>

      {/* Form for Adding New Test Cases */}
      <section className="add-test-case-section">
        <h2>Add New Test Case</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={newTestCase.description}
              onChange={(e) =>
                setNewTestCase({ ...newTestCase, description: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Steps</label>
            {newTestCase.steps.map((step, index) => (
              <div key={index} className="step-input">
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  required={index === 0}
                />
                {index === newTestCase.steps.length - 1 && (
                  <button type="button" onClick={handleAddStep}>
                    Add Step
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="form-group">
            <label>Expected Result</label>
            <input
              type="text"
              value={newTestCase.expectedResult}
              onChange={(e) =>
                setNewTestCase({ ...newTestCase, expectedResult: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Add Test Case
          </button>
        </form>
      </section>

      {/* Test Cases Section */}
      <section className="test-cases-section">
        <h2>Test Cases</h2>
        <div className="test-cases-grid">
          {testCases.map((testCase) => (
            <div key={testCase.id} className="test-case-card">
              <h3>{testCase.description}</h3>
              <div className="steps">
                <strong>Steps:</strong>
                <ul>
                  {testCase.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
              <div className="expected-result">
                <strong>Expected Result:</strong> {testCase.expectedResult}
              </div>
              <div className={`status ${testCase.status.toLowerCase().replace(' ', '-')}`}>
                {testCase.status}
              </div>
              <div className="actions">
                <button
                  className="pass-button"
                  onClick={() => updateTestCaseStatus(testCase.id, 'Pass')}
                >
                  Pass
                </button>
                <button
                  className="fail-button"
                  onClick={() => updateTestCaseStatus(testCase.id, 'Fail')}
                >
                  Fail
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bugs Section */}
      <section className="bugs-section">
        <h2>Bugs</h2>
        <div className="bugs-grid">
          {bugs.map((bug) => (
            <div key={bug.id} className="bug-card">
              <h3>{bug.description}</h3>
              <div className="steps">
                <strong>Steps to Reproduce:</strong>
                <ul>
                  {bug.stepsToReproduce.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
              <div className={`priority ${bug.priority.toLowerCase()}`}>
                {bug.priority}
              </div>
              <div className={`status ${bug.status.toLowerCase().replace(' ', '-')}`}>
                {bug.status}
              </div>
              <div className="actions">
                <button
                  className="start-button"
                  onClick={() => updateBugStatus(bug.id, 'In Progress')}
                >
                  Start
                </button>
                <button
                  className="close-button"
                  onClick={() => updateBugStatus(bug.id, 'Closed')}
                >
                  Close
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectTesting;