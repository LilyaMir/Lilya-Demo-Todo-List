import { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import Task from "../task/Task";
import ConfirmDialog from "../ConfirmDialog";
import DeleteSelected from "../deleteSelected/DeleteSelected";
import TaskApi from "../../api/taskApi";

const taskApi = new TaskApi();

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    taskApi.getAll().then((tasks) => {
      setTasks(tasks);
    });

    // fetch(apiUrl+'/task', {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((result) => result.json())
    //   .then((tasks) => {
    //     setTasks(tasks);
    //   });
  }, []);

  const handleInputChange = (event) => {
    setNewTaskTitle(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.code === "Enter") {
      addNewTask();
    }
  };

  const addNewTask = () => {
    const trimmedTitle = newTaskTitle.trim();
    if (!trimmedTitle) {
      return;
    }

    const newTask = {
      title: trimmedTitle,
    };

    taskApi.add(newTask).then((task) => {
      const tasksCopy = [...tasks];
      tasksCopy.push(task);
      setTasks(tasksCopy);
      setNewTaskTitle("");
    });
  };

  const onTaskDelete = (taskId) => {
    const newTasks = tasks.filter((task) => task._id !== taskId);
    setTasks(newTasks);

    if (selectedTasks.has(taskId)) {
      const newSelectedTasks = new Set(selectedTasks);
      newSelectedTasks.delete(taskId);
      setSelectedTasks(newSelectedTasks);
    }
  };

  const onTaskSelect = (taskId) => {
    const selectedTasksCopy = new Set(selectedTasks);
    if (selectedTasksCopy.has(taskId)) {
      selectedTasksCopy.delete(taskId);
    } else {
      selectedTasksCopy.add(taskId);
    }
    setSelectedTasks(selectedTasksCopy);
  };

  const deleteSelectedTasks = () => {
    const newTasks = [];
    tasks.forEach((task) => {
      if (!selectedTasks.has(task._id)) {
        newTasks.push(task);
      }
    });
    setTasks(newTasks);
    setSelectedTasks(new Set());
  };

  const isAddNewTaskButtonDisabled = !newTaskTitle.trim();

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="12" sm="8" md="6">
          <InputGroup className="mb-3 mt-4">
            <Form.Control
              placeholder="Task title"
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              value={newTaskTitle}
            />
            <Button
              variant="success"
              onClick={addNewTask}
              disabled={isAddNewTaskButtonDisabled}
            >
              Add
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {tasks.map((task) => {
          return (
            <Task
              data={task}
              key={task._id}
              onTaskDelete={setTaskToDelete}
              onTaskSelect={onTaskSelect}
            />
          );
        })}
      </Row>
      <footer>
      <DeleteSelected
        disabled={!selectedTasks.size}
        tasksCount={selectedTasks.size}
        onSubmit={deleteSelectedTasks}    
      />
      </footer>
      {taskToDelete && (
        <ConfirmDialog
          tasksCount={1}
          onCancel={() => setTaskToDelete(null)}
          onSubmit={() => {
            onTaskDelete(taskToDelete);
            setTaskToDelete(null);
          }}
        />
      )}
    </Container>
  );
}

export default Todo;
