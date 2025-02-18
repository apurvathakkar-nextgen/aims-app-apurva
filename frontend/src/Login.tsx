import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { Amplify } from 'aws-amplify';
import awsExports from './amplify_outputs.json';
import { signIn, getCurrentUser } from 'aws-amplify/auth';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff, DarkMode, LightMode } from '@mui/icons-material';
import { motion } from 'framer-motion';

// Configure Amplify
Amplify.configure(awsExports);

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Check if user is already signed in and navigate to /workspace if so.
  useEffect(() => {
    (async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          console.log("User already signed in. Navigating to /workspace.");
          navigate('/workspace');
        }
      } catch (err) {
        // If no current user, do nothing.
        console.log("No current user found.");
      }
    })();
  }, [navigate]);

  // Handle Login
  const handleLogin = async () => {
    setError(null);
    console.log("Starting login process...");

    try {
      console.log("Attempting to sign in with email:", email);

      // Attempt to sign in
      const signInResponse = await signIn({ username: email, password });
      console.log("SignIn Response:", signInResponse);

      // Check if the user is authenticated
      console.log("Checking if user is authenticated...");
      const currentUser = await getCurrentUser();
      console.log("Current User:", currentUser);

      if (currentUser) {
        console.log("User is authenticated. Redirecting to /workspace...");
        navigate('/workspace'); // Redirect after successful login
      } else {
        console.error("User is not authenticated after sign-in.");
        setError("User authentication failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Login Error Details:", err);

      // Handle specific Cognito errors
      if (err.name === "UserNotConfirmedException") {
        setError("Your account is not confirmed. Please check your email for verification instructions.");
      } else if (err.name === "NotAuthorizedException") {
        setError("Incorrect email or password. Please try again.");
      } else if (err.name === "UserNotFoundException") {
        setError("No user found with this email address. Please sign up.");
      } else {
        setError(err.message || "An unexpected error occurred during login.");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: darkMode ? '#121212' : 'linear-gradient(to right, #e0eafc, #cfdef3)',
        padding: 3,
        transition: 'background 0.3s ease-in-out',
      }}
    >
      {/* Glassmorphic Login Box */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Paper
          elevation={12}
          sx={{
            padding: 5,
            borderRadius: 4,
            textAlign: 'center',
            maxWidth: 400,
            width: '100%',
            background: darkMode ? 'rgba(20, 20, 20, 0.9)' : 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.15)',
            color: darkMode ? '#ffffff' : '#000000',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          {/* Dark Mode Toggle */}
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <LightMode sx={{ color: 'yellow' }} /> : <DarkMode />}
            </IconButton>
          </Box>

          {/* Title */}
          <Typography
            variant="h4"
            fontWeight="bold"
            color={darkMode ? '#ffffff' : '#004aad'}
            mb={2}
          >
            Automation Life Cycle Management
          </Typography>
          <Typography variant="subtitle1" color={darkMode ? 'lightgray' : 'gray'} mb={3}>
            Sign in to continue
          </Typography>

          {/* Email Input */}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              background: darkMode ? '#222' : '#fff',
              borderRadius: '5px',
              input: { color: darkMode ? '#fff' : '#000' },
              '& label': { color: darkMode ? 'lightgray' : 'black' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: darkMode ? 'gray' : 'black' },
                '&:hover fieldset': { borderColor: darkMode ? 'white' : '#004aad' },
              },
            }}
          />

          {/* Password Input with Visibility Toggle */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 2,
              background: darkMode ? '#222' : '#fff',
              borderRadius: '5px',
              input: { color: darkMode ? '#fff' : '#000' },
              '& label': { color: darkMode ? 'lightgray' : 'black' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: darkMode ? 'gray' : 'black' },
                '&:hover fieldset': { borderColor: darkMode ? 'white' : '#004aad' },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <VisibilityOff sx={{ color: darkMode ? 'white' : 'black' }} />
                    ) : (
                      <Visibility sx={{ color: darkMode ? 'white' : 'black' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Error Message */}
          {error && (
            <Typography color="red" fontSize="14px" mb={2}>
              {error}
            </Typography>
          )}

          {/* Sign In Button */}
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                fontSize: '16px',
                backgroundColor: darkMode ? '#1976D2' : '#004aad',
                '&:hover': { backgroundColor: darkMode ? '#1565C0' : '#003580' },
              }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </motion.div>

          <Typography mt={2} color="primary" sx={{ cursor: 'pointer' }}>
            Forgot your password?
          </Typography>

          {/* Sign-Up Link */}
          <Typography
            mt={3}
            sx={{ cursor: 'pointer', color: 'blue', fontWeight: 'bold' }}
            onClick={() => navigate('/signup')}
          >
            Don't have an account? Sign up
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Login;
