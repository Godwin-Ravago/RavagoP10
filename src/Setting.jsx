import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

function Setting() {
  const [profileInfo, setProfileInfo] = useState({
    username: 'godwin.ravago',
    email: 'godwin@example.com',
    bio: 'Living life in vacation mode.',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSave = () => {
    // Save changes (mock implementation)
    console.log('Saved profile information:', profileInfo);
    alert('Settings saved successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear session token
    navigate('/login'); // Redirect to login
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            <Card.Body>
              <Card.Title>Settings</Card.Title>
              <Form>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={profileInfo.username}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={profileInfo.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="bio" className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="bio"
                    rows={3}
                    value={profileInfo.bio}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleSave} className="me-2">
                  Save Changes
                </Button>
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Setting;
