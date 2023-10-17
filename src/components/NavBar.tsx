import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import TaskForm from "./TaskForm";

const NavBar = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container className="justify-content-center">
          <Navbar.Brand href="/">Task Manager</Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Container className="justify-content-center">
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3"
          fill
          justify
          data-bs-theme="dark"
        >
          <Tab eventKey="home" title="Home">
            <TaskForm />
          </Tab>
          <Tab eventKey="profile" title="Profile">
            Tab Profile Content
          </Tab>
          <Tab eventKey="contact" title="Contact">
            Tab Contact Content
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default NavBar;
