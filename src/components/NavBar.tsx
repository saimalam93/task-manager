import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container className="justify-content-center">
          <Navbar.Brand href="/">Task Manager</Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar.Toggle aria-controls="navbarScroll" />
    </>
  );
};

export default NavBar;
