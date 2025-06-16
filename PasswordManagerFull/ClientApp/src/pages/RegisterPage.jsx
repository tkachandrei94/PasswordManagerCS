import React, { useState } from 'react';
import { Container, Box, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTitle from '../components/CustomTitle';
import CustomTextField from '../components/CustomTextField';
import PasswordField from '../components/PasswordField';
import CustomButton from '../components/CustomButton';
import CustomLink from '../components/CustomLink';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      console.log("res:", res);

      const data = await res.json();
      console.log("data:", data);
      if (res.ok) {
        try {
          localStorage.setItem('token', data.token);
          setOpenSnackbar(true);
          navigate('/passwords');
        } catch (storageError) {
          console.error('Помилка збереження токена:', storageError);
          setError('Помилка авторизації');
        }
      } else {
        setError(data.message || 'Помилка реєстрації');
      }
    } catch (error) {
      console.error('Помилка реєстрації:', error);
      setError('Виникла помилка');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 18, mb: 4 }}>
        <CustomTitle>
          Register
        </CustomTitle>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2, borderRadius: '8px' }}
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleRegister} sx={{ mt: 4 }}>
          <CustomTextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
            disabled={loading}
          />

          <PasswordField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            sx={{ mb: 4 }}
            disabled={loading}
          />

          <CustomButton
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </CustomButton>

          <CustomLink to="/login" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
            Already have an account? Login
          </CustomLink>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: '100%',
            fontFamily: 'var(--font-tomorrow)',
            borderRadius: '8px'
          }}
        >
          Registration successful! Redirecting...
        </Alert>
      </Snackbar>
    </Container>
  );
} 