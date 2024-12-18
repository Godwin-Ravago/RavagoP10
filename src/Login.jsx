import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_ENDPOINT } from './Api'; // Correct import of API endpoint

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Set initial loading state to false

  // Check if there's a valid token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        jwtDecode(token); // Verify token
        navigate('/dashboard');
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  }, [navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    // Debugging the API endpoint
    console.log('API Endpoint:', API_ENDPOINT);

    // Ensure the API endpoint exists
    if (!API_ENDPOINT) {
      setError('API endpoint is not configured correctly.');
      return;
    }

    setIsLoading(true); // Start loading state when request is made

    try {
      const response = await axios.post(`${API_ENDPOINT}/auth/login`, { username, password });

      // On successful login, save the token and navigate to the dashboard
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        setError(''); // Clear any previous error
        navigate('/dashboard');
      } else {
        throw new Error('Token not found');
      }
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);

      // Check for network errors explicitly
      if (err.code === 'ERR_NETWORK') {
        setError('Network error. Please check your connection.');
      }
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2 className="text-center mb-4">Login</h2>
      <img src={'https://hearprojectva.org/wp-content/uploads/2018/12/instagram-logo-png-transparent-50x50.png'} />
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3 w-100" disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Login'}
        </Button>
      </Form>
    </div>
  );
}

export default Login;