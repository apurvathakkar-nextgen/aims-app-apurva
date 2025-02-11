import { useState } from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from './amplify_outputs.json';
import { signUp, confirmSignUp, signInWithRedirect } from 'aws-amplify/auth';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff, DarkMode, LightMode, Google, Facebook } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

// Configure Amplify
Amplify.configure(awsExports);

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [step, setStep] = useState<'signup' | 'confirm'>('signup');
  const navigate = useNavigate();

  // Handle Sign Up
  const handleSignUp = async () => {
    setError(null);
    try {
      await signUp({ username: email, password, options: { userAttributes: { email } } });
      setStep('confirm');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle Confirmation Code
  const handleConfirmSignUp = async () => {
    try {
      await confirmSignUp({ username: email, confirmationCode: confirmCode });
      alert('Account verified! 🎉 Redirecting to login...');
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Google & Facebook Login
  const handleSocialLogin = async (provider: 'Google' | 'Facebook') => {
    try {
      await signInWithRedirect({ provider });
    } catch (err: any) {
      setError(err.message);
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
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
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
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <LightMode sx={{ color: 'yellow' }} /> : <DarkMode />}
            </IconButton>
          </Box>

          <Typography variant="h4" fontWeight="bold" color={darkMode ? '#ffffff' : '#004aad'} mb={2}>
            Create Account
          </Typography>
          <Typography variant="subtitle1" color={darkMode ? 'lightgray' : 'gray'} mb={3}>
            Sign up to get started
          </Typography>

          {step === 'signup' ? (
            <>
              {/* Email Input */}
              <TextField fullWidth label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />

              {/* Password Input */}
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {error && <Typography color="red" fontSize="14px" mb={2}>{error}</Typography>}

              {/* Sign Up Button */}
              <Button fullWidth variant="contained" color="primary" onClick={handleSignUp} sx={{ py: 1.5, fontSize: '16px' }}>
                Sign Up
              </Button>
            </>
          ) : (
            <>
              {/* Confirmation Code Input */}
              <TextField fullWidth label="Confirmation Code" variant="outlined" value={confirmCode} onChange={(e) => setConfirmCode(e.target.value)} sx={{ mb: 2 }} />

              {error && <Typography color="red" fontSize="14px" mb={2}>{error}</Typography>}

              {/* Confirm Button */}
              <Button fullWidth variant="contained" color="primary" onClick={handleConfirmSignUp} sx={{ py: 1.5, fontSize: '16px' }}>
                Confirm Sign Up
              </Button>
            </>
          )}

          {/* Social Logins */}
          <Typography mt={3} mb={2}>Or Sign Up with</Typography>
          <Button fullWidth variant="contained" color="secondary" startIcon={<Google />} sx={{ mb: 1 }} onClick={() => handleSocialLogin('Google')}>
            Continue with Google
          </Button>
          <Button fullWidth variant="contained" color="primary" startIcon={<Facebook />} onClick={() => handleSocialLogin('Facebook')}>
            Continue with Facebook
          </Button>

          <Typography mt={2}>
            Already have an account? <Link to="/">Sign in</Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default SignUp;
