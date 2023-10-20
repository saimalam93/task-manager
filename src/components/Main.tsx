import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useState, useEffect } from "react";
import { Task } from "../types/task.type";

const Main = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const data = localStorage.getItem("tasks");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  });

  const [completedTasks, setCompletedTasks] = useState<Task[]>(() => {
    const data = localStorage.getItem("completedTasks");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  return (
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
          <Container fluid>
            <Row>
              <Col>
                <TaskForm setTasks={setTasks} />
              </Col>
              <Col md={8} xs={12}>
                <TaskList
                  tasks={tasks}
                  setTasks={setTasks}
                  completedTasks={completedTasks}
                  setCompletedTasks={setCompletedTasks}
                />
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="completed" title="Completed">
          <TaskList
            tasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Main;
