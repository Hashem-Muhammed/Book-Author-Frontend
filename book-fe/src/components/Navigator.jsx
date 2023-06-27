import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default function Navigation() {
  const navigator = useNavigate();
  const { contextData } = useContext(AuthContext);
  const { userInfo, authTokens, logOut } = contextData;

  const handleLogout = () => {
    logOut();
    navigator('/login');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        My Books
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          {userInfo && userInfo.user_type === 'author' && (
            <Nav.Link as={Link} to="/my-books">
              My Books
            </Nav.Link>
          )}
        </Nav>
        {authTokens ? (
          <Nav>
            {userInfo && (
              <NavDropdown title={`Hello, ${userInfo.user ? userInfo.user.first_name : userInfo.first_name}`} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        ) : (
          <Nav>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Signup
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}