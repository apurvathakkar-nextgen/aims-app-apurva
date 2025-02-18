import React, { useState } from 'react';
import {
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Container,
  Paper,
  Grid,
  Checkbox,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Define all 8 questions and scoring logic
const questions = [
  {
    id: 'useCase',
    label: '1. Primary Use Case',
    type: 'radio',
    options: [
      { label: 'A) Repetitive tasks automation', value: 'A', scores: { RPA: 3, GenAI: 0, CustomAI: 0, DataEng: 0, LowCode: 1 } },
      { label: 'B) Quick business app or workflow', value: 'B', scores: { RPA: 1, GenAI: 0, CustomAI: 0, DataEng: 0, LowCode: 3 } },
      { label: 'C) Content/insight generation (text, images, etc.)', value: 'C', scores: { RPA: 0, GenAI: 3, CustomAI: 1, DataEng: 0, LowCode: 0 } },
      { label: 'D) Predictive or specialized analytics (custom modeling)', value: 'D', scores: { RPA: 0, GenAI: 1, CustomAI: 3, DataEng: 0, LowCode: 0 } },
      { label: 'E) Large-scale data transformation or pipeline', value: 'E', scores: { RPA: 0, GenAI: 0, CustomAI: 1, DataEng: 3, LowCode: 0 } },
    ],
  },
  {
    id: 'dataCharacteristics',
    label: '2. Data Characteristics',
    type: 'radio',
    options: [
      { label: 'A) Mostly structured, small/medium volume', value: 'A', scores: { RPA: 1, GenAI: 0, CustomAI: 0, DataEng: 0, LowCode: 1 } },
      { label: 'B) Large-scale structured or semi-structured', value: 'B', scores: { RPA: 0, GenAI: 0, CustomAI: 1, DataEng: 3, LowCode: 0 } },
      { label: 'C) Unstructured text/images or specialized domain data', value: 'C', scores: { RPA: 0, GenAI: 2, CustomAI: 2, DataEng: 1, LowCode: 0 } },
      { label: 'D) Real-time or streaming data', value: 'D', scores: { RPA: 0, GenAI: 1, CustomAI: 1, DataEng: 3, LowCode: 0 } },
    ],
  },
  {
    id: 'teamSkills',
    label: '3. Team Skill Set (Multi-Select)',
    type: 'checkbox',
    options: [
      { label: 'A) BA / Process Experts', value: 'A', scores: { RPA: 1, GenAI: 1, CustomAI: 0, DataEng: 0, LowCode: 1 } },
      { label: 'B) General Developers (DEV)', value: 'B', scores: { RPA: 1, GenAI: 0, CustomAI: 1, DataEng: 1, LowCode: 1 } },
      { label: 'C) Data Scientists / ML Engineers (DS)', value: 'C', scores: { RPA: 0, GenAI: 1, CustomAI: 2, DataEng: 1, LowCode: 0 } },
      { label: 'D) DevOps / Cloud Engineers (OPS)', value: 'D', scores: { RPA: 0, GenAI: 0, CustomAI: 1, DataEng: 1, LowCode: 0 } },
    ],
  },
  {
    id: 'riskTolerance',
    label: '4. Risk Tolerance & Maturity',
    type: 'radio',
    options: [
      { label: 'A) Low – prefer minimal complexity, proven solutions', value: 'A', scores: { RPA: 2, GenAI: -1, CustomAI: -2, DataEng: 0, LowCode: 2 } },
      { label: 'B) Medium – moderate complexity is acceptable', value: 'B', scores: { RPA: 1, GenAI: 0, CustomAI: 0, DataEng: 1, LowCode: 1 } },
      { label: 'C) High – open to cutting-edge, higher complexity', value: 'C', scores: { RPA: 0, GenAI: 2, CustomAI: 2, DataEng: 1, LowCode: 0 } },
    ],
  },
  {
    id: 'integration',
    label: '5. Integration Needs',
    type: 'radio',
    options: [
      { label: 'A) 1–2 simple systems', value: 'A', scores: { RPA: 1, GenAI: 0, CustomAI: 0, DataEng: 0, LowCode: 2 } },
      { label: 'B) Multiple on-prem/cloud systems', value: 'B', scores: { RPA: 0, GenAI: 1, CustomAI: 1, DataEng: 2, LowCode: 0 } },
      { label: 'C) Complex real-time or multi-source integration', value: 'C', scores: { RPA: 0, GenAI: 1, CustomAI: 2, DataEng: 2, LowCode: 0 } },
    ],
  },
  {
    id: 'security',
    label: '6. Security & Compliance Constraints',
    type: 'radio',
    options: [
      { label: 'A) Minimal constraints', value: 'A', scores: { RPA: 1, GenAI: 1, CustomAI: 1, DataEng: 1, LowCode: 1 } },
      { label: 'B) Moderate constraints', value: 'B', scores: { RPA: 0, GenAI: 0, CustomAI: 0, DataEng: 1, LowCode: 0 } },
      { label: 'C) Very high/regulatory compliance', value: 'C', scores: { RPA: 0, GenAI: -1, CustomAI: 1, DataEng: 2, LowCode: -1 } },
    ],
  },
  {
    id: 'maintenance',
    label: '7. Maintenance & Scalability',
    type: 'radio',
    options: [
      { label: 'A) Low – mostly static or small user base', value: 'A', scores: { RPA: 2, GenAI: 0, CustomAI: 0, DataEng: 0, LowCode: 2 } },
      { label: 'B) Moderate – some iteration, moderate scale', value: 'B', scores: { RPA: 0, GenAI: 0, CustomAI: 1, DataEng: 1, LowCode: 0 } },
      { label: 'C) High – frequent updates, large scale', value: 'C', scores: { RPA: 0, GenAI: 1, CustomAI: 2, DataEng: 2, LowCode: -1 } },
    ],
  },
  {
    id: 'budget',
    label: '8. Budget Constraints',
    type: 'radio',
    options: [
      { label: 'A) Highly constrained', value: 'A', scores: { RPA: 2, GenAI: -1, CustomAI: -2, DataEng: 0, LowCode: 2 } },
      { label: 'B) Moderate budget', value: 'B', scores: { RPA: 1, GenAI: 0, CustomAI: 0, DataEng: 1, LowCode: 1 } },
      { label: 'C) Flexible to invest', value: 'C', scores: { RPA: 0, GenAI: 2, CustomAI: 2, DataEng: 1, LowCode: 0 } },
    ],
  },
];

const initialScores = {
  RPA: 0,
  GenAI: 0,
  CustomAI: 0,
  DataEng: 0,
  LowCode: 0,
};

// Helper function to calculate percentages
const calculatePercentages = (scores: Record<string, number>) => {
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  if (totalScore <= 0) return { RPA: 0, GenAI: 0, CustomAI: 0, DataEng: 0, LowCode: 0 };

  const percentages = {
    RPA: (scores.RPA / totalScore) * 100,
    GenAI: (scores.GenAI / totalScore) * 100,
    CustomAI: (scores.CustomAI / totalScore) * 100,
    DataEng: (scores.DataEng / totalScore) * 100,
    LowCode: (scores.LowCode / totalScore) * 100,
  };

  return percentages;
};

const PlatformAssessmentTab: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [scores, setScores] = useState(initialScores);
  const [showResults, setShowResults] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTech, setSelectedTech] = useState('');
  const [reviewerComment, setReviewerComment] = useState('');

  // Handle answer selection
  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  // Validate if all questions are answered
  const validateForm = () => {
    return questions.every((question) => answers[question.id]);
  };

  // Calculate scores based on answers
  const calculateScores = () => {
    if (!validateForm()) {
      alert('Please answer all questions before calculating scores.');
      return;
    }

    const newScores = { ...initialScores };

    questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer) {
        if (question.type === 'checkbox') {
          (answer as string[]).forEach((value) => {
            const selectedOption = question.options.find((opt) => opt.value === value);
            if (selectedOption) {
              Object.keys(newScores).forEach((tech) => {
                newScores[tech] += selectedOption.scores[tech] || 0;
              });
            }
          });
        } else {
          const selectedOption = question.options.find((opt) => opt.value === answer);
          if (selectedOption) {
            Object.keys(newScores).forEach((tech) => {
              newScores[tech] += selectedOption.scores[tech] || 0;
            });
          }
        }
      }
    });

    setScores(newScores);
    setShowResults(true);
    setOpenDialog(true); // Open the recommendation popup
  };

  // Handle technology selection in the popup
  const handleTechSelection = (tech: string) => {
    setSelectedTech(tech);
  };

  // Handle reviewer comment change
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewerComment(event.target.value);
  };

  // Save reviewer's input and close the popup
  const saveReviewerInput = () => {
    // Save the selected technology and comment (you can store it in state or send it to an API)
    console.log('Selected Technology:', selectedTech);
    console.log('Reviewer Comment:', reviewerComment);
    setOpenDialog(false);
  };

  // Export entire UI as PDF
  const exportToPDF = () => {
    const input = document.getElementById('platform-assessment-ui');
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('platform_assessment_export.pdf');
      });
    }
  };

  const percentages = calculatePercentages(scores);

  // Data for pie chart
  const pieData = Object.entries(percentages).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2)),
  }));

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  return (
    <Container maxWidth={false} sx={{ height: '100vh', padding: '20px' }} id="platform-assessment-ui">
      <Typography variant="h4" align="center" gutterBottom>
        Platform Assessment
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Answer the following questions to determine the best technology mix for your project.
      </Typography>

      <Grid container spacing={3} sx={{ height: '80vh' }}>
        {/* Left Column: Questions */}
        <Grid item xs={8}>
          <Grid container spacing={3}>
            {/* Left Side Questions */}
            <Grid item xs={6}>
              {questions.slice(0, 4).map((question) => (
                <FormControl key={question.id} component="fieldset" style={{ marginTop: '20px', width: '100%' }}>
                  <FormLabel component="legend" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    {question.label}
                  </FormLabel>
                  {question.type === 'radio' ? (
                    <RadioGroup
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    >
                      {question.options.map((option) => (
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={<Radio />}
                          label={option.label}
                        />
                      ))}
                    </RadioGroup>
                  ) : (
                    question.options.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        control={
                          <Checkbox
                            checked={(answers[question.id] as string[] || []).includes(option.value)}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [...(answers[question.id] as string[] || []), option.value]
                                : (answers[question.id] as string[] || []).filter((v) => v !== option.value);
                              handleAnswerChange(question.id, newValue);
                            }}
                          />
                        }
                        label={option.label}
                      />
                    ))
                  )}
                </FormControl>
              ))}
            </Grid>

            {/* Right Side Questions */}
            <Grid item xs={6}>
              {questions.slice(4).map((question) => (
                <FormControl key={question.id} component="fieldset" style={{ marginTop: '20px', width: '100%' }}>
                  <FormLabel component="legend" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    {question.label}
                  </FormLabel>
                  {question.type === 'radio' ? (
                    <RadioGroup
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    >
                      {question.options.map((option) => (
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={<Radio />}
                          label={option.label}
                        />
                      ))}
                    </RadioGroup>
                  ) : (
                    question.options.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        control={
                          <Checkbox
                            checked={(answers[question.id] as string[] || []).includes(option.value)}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [...(answers[question.id] as string[] || []), option.value]
                                : (answers[question.id] as string[] || []).filter((v) => v !== option.value);
                              handleAnswerChange(question.id, newValue);
                            }}
                          />
                        }
                        label={option.label}
                      />
                    ))
                  )}
                </FormControl>
              ))}
            </Grid>
          </Grid>

          {/* Buttons at the bottom */}
          <Grid container justifyContent="center" spacing={2} style={{ marginTop: '20px' }}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={calculateScores}
              >
                Calculate Scores
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={exportToPDF}
                disabled={!showResults}
              >
                Export as PDF
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column: Results */}
        <Grid item xs={4}>
          {showResults && (
            <Paper elevation={3} sx={{ padding: '20px', height: '100%' }}>
              <Typography variant="h5" align="center" gutterBottom>
                Recommendation
              </Typography>
              <Typography variant="body1" align="center" style={{ marginBottom: '20px' }}>
                Based on your inputs, the recommended technology mix is:
              </Typography>
              <PieChart width={400} height={400}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
              <Box sx={{ marginTop: '20px' }}>
                {pieData.map((entry) => (
                  <Typography key={entry.name} variant="body1" align="center">
                    <strong>{entry.name}</strong>: {entry.value}%
                  </Typography>
                ))}
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Recommendation Popup */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Reviewer's Choice</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Based on the assessment, the recommended technologies are:
          </Typography>
          <Box sx={{ marginBottom: '20px' }}>
            {pieData.map((entry) => (
              <Typography key={entry.name} variant="body1">
                <strong>{entry.name}</strong>: {entry.value}%
              </Typography>
            ))}
          </Box>
          <Typography variant="body1" gutterBottom>
            Please select your preferred technology and provide comments:
          </Typography>
          <RadioGroup
            value={selectedTech}
            onChange={(e) => handleTechSelection(e.target.value)}
          >
            {pieData.map((entry) => (
              <FormControlLabel
                key={entry.name}
                value={entry.name}
                control={<Radio />}
                label={`${entry.name} (${entry.value}%)`}
              />
            ))}
          </RadioGroup>
          <TextField
            label="Decision Notes"
            multiline
            rows={4}
            fullWidth
            value={reviewerComment}
            onChange={handleCommentChange}
            sx={{ marginTop: '20px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={saveReviewerInput} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PlatformAssessmentTab;