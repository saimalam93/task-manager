import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import categories from "../categories";
import { Task } from "../types/task.type";

type Props = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};
const TaskForm = ({ setTasks }: Props) => {
  type FormValues = {
    taskTitle: string;
    dueDate: string;
    category: string;
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      taskTitle: "",
      dueDate: "",
      category: "",
    },
    validationSchema: yup.object({
      taskTitle: yup.string().required("Title is required"),
      dueDate: yup
        .date()
        .required("Due Date is required")
        .min(new Date(), "Due Date must be in the future"),
      category: yup.string().required("Category is required"),
    }),
    onSubmit: (values: FormValues) => {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      tasks.push({
        id: tasks.length + 1,
        title: values.taskTitle,
        dueDate: values.dueDate,
        category: values.category,
        status: "Pending",
      });
      setTasks(tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      formik.resetForm();
    },
  });

  return (
    <>
      <h1>Add A New Task</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="TaskTitle">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the Task Title"
            name="taskTitle"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.taskTitle}
          />
          {formik.touched.taskTitle && formik.errors.taskTitle ? (
            <p className="text-danger">{formik.errors.taskTitle}</p>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="DueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dueDate}
          />
          {formik.touched.dueDate && formik.errors.dueDate ? (
            <p className="text-danger">{formik.errors.dueDate}</p>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="Category">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          >
            <option value="" disabled selected hidden>
              Select a Category for the Task
            </option>
            {categories.map((categories, index) => (
              <option key={index} value={categories}>
                {categories}
              </option>
            ))}
          </Form.Select>
          {formik.touched.category && formik.errors.category ? (
            <p className="text-danger">{formik.errors.category}</p>
          ) : null}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default TaskForm;
