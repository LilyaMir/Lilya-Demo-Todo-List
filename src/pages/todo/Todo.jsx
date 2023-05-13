import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Container, Row, Col, Button } from "react-bootstrap";
import Task from "../../components/task/Task";
import ConfirmDialog from "../../components/ConfirmDialog";
import DeleteSelected from "../../components/deleteSelected/DeleteSelected";
import TaskModal from "../../components/taskModal/TaskModal";
import Filters from "../../components/filters/Filters";
import TaskApi from "../../api/taskApi";
import styles from "./todo.module.css";

const taskApi = new TaskApi();
 
function Todo() {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [editableTask, setEditableTask] = useState(null);

  const getTasks = (filters) => {
    taskApi.getAll(filters)
      .then((tasks) => {
        setTasks(tasks);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);


  const onAddNewTask = (newTask) => {
    taskApi
      .add(newTask)
      .then((task) => {
        const tasksCopy = [...tasks];
        tasksCopy.push(task);
        setTasks(tasksCopy);
        setIsAddTaskModalOpen(false);
        toast.success("The task has been added successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const onTaskDelete = (taskId) => {
    taskApi
      .delete(taskId)
      .then(() => {
        const newTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(newTasks);

        if (selectedTasks.has(taskId)) {
          const newSelectedTasks = new Set(selectedTasks);
          newSelectedTasks.delete(taskId);
          setSelectedTasks(newSelectedTasks);
        }

        toast.success("The task has been deleted successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
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
    taskApi
      .deleteMany([...selectedTasks])
      .then(() => {
        const newTasks = [];
        const deletedTasksCount = selectedTasks.size;
        tasks.forEach((task) => {
          if (!selectedTasks.has(task._id)) {
            newTasks.push(task);
          }
        });
        setTasks(newTasks);
        setSelectedTasks(new Set());
        toast.success(
          `${deletedTasksCount} tasks have been deleted successfully!`
        );
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const selectAllTasks = () => {
    const taskIds = tasks.map((task) => task._id);
    setSelectedTasks(new Set(taskIds));
  };

  const resetSelectedTasks = () => {
    setSelectedTasks(new Set());
  };

  const onEditTask = (editedTask) => {
    taskApi
      .update(editedTask)
      .then((task) => {
        const newTasks = [...tasks];
        const foundIndex = newTasks.findIndex((t) => t._id === task._id);
        newTasks[foundIndex] = task;
        toast.success(`Task has been updated successfully!`);
        setTasks(newTasks);
        setEditableTask(null);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const onFilter = (filters)=>{
    getTasks(filters);
  };

  return (
    <Container>
      <span className={styles.todo}>
        TODO  LIST
      </span>
      <Row className="justify-content-center m-4">
        <Col  xs="12" sm="6" md="4" lg="2">
          <Button className={styles.buttonsSize} variant="success" 
          onClick={() => setIsAddTaskModalOpen(true)}>
            Add new task
          </Button>
        </Col>
        <Col  xs="12" sm="6" md="4" lg="2">
          <Button className={styles.buttonsSize} variant="warning"
            onClick={selectAllTasks}
            disabled={!tasks.length}
          >
            Select all
          </Button>
        </Col>
        <Col  xs="12" sm="6" md="4" lg="2">
          <Button className={styles.buttonsSize} variant="info"
            onClick={resetSelectedTasks}
            disabled={!tasks.length}
          >
            Reset selected
          </Button>
        </Col>
        <Col xs="12" sm="6" md="4" lg="2">
          <DeleteSelected 
              disabled={!selectedTasks.size}
              tasksCount={selectedTasks.size}
              onSubmit={deleteSelectedTasks}
          />
        </Col>
       
      </Row>
      <Row>
        <Filters onFilter={onFilter} />  
      </Row>
      <Row className="mb-5">
        {tasks.map((task) => {
          return (
            <Task
              data={task}
              key={task._id}
              onTaskDelete={setTaskToDelete}
              onTaskSelect={onTaskSelect}
              checked={selectedTasks.has(task._id)}
              onTaskEdit={setEditableTask}
              onStatusChange={onEditTask}
            />
          );
        })}
      </Row>
    
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
      {isAddTaskModalOpen && (
        <TaskModal
          onCancel={() => setIsAddTaskModalOpen(false)}
          onSave={onAddNewTask}
        />
      )}
      {editableTask && (
        <TaskModal
          onCancel={() => setEditableTask(null)}
          onSave={onEditTask}
          data={editableTask}
        />
      )}
      
    </Container>
  );
}

export default Todo;
