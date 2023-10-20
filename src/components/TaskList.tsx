import { Container, Row, Col, Button } from "react-bootstrap";
import { Task } from "../types/task.type";

type Props = {
  tasks: Task[];
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
  completedTasks?: Task[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskList = ({
  tasks,
  setTasks,
  completedTasks,
  setCompletedTasks,
}: Props) => {
  const handleCompleteTask = (id: number) => {
    let task = tasks.find((task) => task.id === id);
    task!.status = "Completed";
    task!.completedDate = new Date();
    completedTasks?.push(task as Task);
    setCompletedTasks!(completedTasks || []);
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks!(newTasks);
  };

  const handleDeleteTask = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks!(newTasks);
  };

  const handleDeleteCompletedTask = (id: number) => {
    const newCompletedTasks = tasks.filter((task) => task.id !== id);
    setCompletedTasks(newCompletedTasks);
  };

  return (
    <Container fluid>
      <h1 className="text-center">Tasks</h1>
      <Row
        className="border border-2 p-2 rounded-3"
        style={{ backgroundColor: "#fcfcfc" }}
      >
        <Col className="text-center fw-bold">Title</Col>
        <Col className="text-center fw-bold">Due Date</Col>
        <Col className="text-center fw-bold">Category</Col>
        <Col className="text-center fw-bold">Actions</Col>
      </Row>
      {tasks.map((task) => {
        const evenRowStyle = {
          backgroundColor: "#fcfcfc",
        };
        const oddRowStyle = {
          backgroundColor: "#f2f2f2",
        };
        const rowStyle = task.id % 2 === 0 ? evenRowStyle : oddRowStyle;

        return (
          <Row key={task.id} className="text-center p-2" style={rowStyle}>
            <Col>{task.title}</Col>
            <Col>{task.dueDate.toString()}</Col>
            <Col>{task.category}</Col>

            <Col>
              <Row>
                {task.status === "Pending" ? (
                  <Col>
                    <Button
                      variant="success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleCompleteTask(task.id)}
                    >
                      Done
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      className="me-2"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </Button>
                  </Col>
                ) : (
                  <Col className="flex-column align-items-center">
                    <p className="text-success">
                      Task completed on {task.completedDate?.toLocaleString()}
                    </p>
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => handleDeleteCompletedTask(task.id)}
                    >
                      Delete
                    </Button>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default TaskList;
