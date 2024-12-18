import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import the jwt-decode library
import { Navbar, Container, Nav, NavDropdown, Row, Col, Card, Button } from 'react-bootstrap'; // Import necessary components


function Dashboard() {
  const [user, setUser ] = useState(null); // Store user data
  const [posts, setPosts] = useState([]); // Store posts data
  const navigate = useNavigate();

  // Verify if User In-Session in LocalStorage
  useEffect(() => {
    const fetchDecodedUserID = () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate("/login");
          return;
        }

        const decoded_token = jwtDecode(token); // Decode the token
        setUser (decoded_token); // Set user with decoded token

        // Fetch posts (mock data for now)
        fetchPosts();
      } catch (error) {
        console.error('Error decoding token:', error);
        navigate("/login");
      }
    };

    fetchDecodedUserID(); // Call the function on component mount
  }, [navigate]);

  // Mock function to fetch posts
  const fetchPosts = () => {
    // This would typically be an API call
    const mockPosts = [
      { id: 1, username: 'Godwin Ravago', content: 'Living life in permanent vacation mode. ', imageUrl: 'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-6/434296054_757572409776257_1622573371246577573_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG6tmOzFRJWEeOL9fBwZmvWuubx49XUVXC65vHj1dRVcBn45wqylHHWnzfIKBWgElvnEBJZynGU08TNgBO9GPAe&_nc_ohc=xoARiGTdCIMQ7kNvgEJrTzr&_nc_zt=23&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=A9siYRl0CdVWvl7VDI8J3HI&oh=00_AYCByB_1IaGoR5W8Bp0T3JTo4kUDVFb-sSuzuXcRjxqC3w&oe=676813A5' },
      { id: 1, username: 'Godwin Ravago', content: 'Happy Birthday. ', imageUrl: 'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-6/418726523_714145240785641_7808628857059400821_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeES5iIJ9IfbCb6Pnu_sDlFjBlGtQn1zn30GUa1CfXOffUBNdtmmDa1OFP8eVt4bFIAJ-D-_iErJzpnbskfw2uV4&_nc_ohc=lQ9rrJ9ulIAQ7kNvgEpR6Be&_nc_zt=23&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=AjSx15vmfHFUxHuJVEQqlrL&oh=00_AYBrjg-Mu_u_TE8K7tvpsbGm9mGFYPbnf993-o1dY5Abgw&oe=676830A5' },
    ];
    setPosts(mockPosts);
  };

  // Performs Logout Method
  const handleLogout = () => {
    try {
      localStorage.removeItem('token'); // Remove token from LocalStorage
      navigate('/login'); // Navigate to login page
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><img src='https://hearprojectva.org/wp-content/uploads/2018/12/instagram-logo-png-transparent-50x50.png' width={50} /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#explore">Explore</Nav.Link>
            <Nav.Link href="#messages">Messages</Nav.Link>
          </Nav>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown
                title={user ? `:User  ${user.username}` : 'Dropdown'}
                id="basic-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/setting')}>Settings</NavDropdown.Item>
                <NavDropdown.Item href="#" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Row>
          {posts.map(post => (
            <Col key={post.id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={post.imageUrl} />
                <Card.Body>
                  <Card.Title>{post.username}</Card.Title>
                  <Card.Text>{post.content}</Card.Text>
                  <Button variant="primary">1k Reacts</Button>
                  <Button variant="secondary" className="ms-2">356 Comment</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;