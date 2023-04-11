import { Component } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { idGenerator } from "../../utils/helpers";
import Task from "../task/Task";
import ConfirmDialog from "../ConfirmDialog";
import styles from './todo.module.css';

class Todo extends Component {
  state = {
    tasks: [],
    newTaskTitle: "",
    selectedTasks: new Set(),
    isConfirmDialogOpen: false,
  };

  handleInputChange = (event) => {
    const newTaskTitle = event.target.value;
    this.setState({
      newTaskTitle,
    });
  };

  handleInputKeyDown = (event) => {
    if (event.code === "Enter") {
      this.addNewTask();
    }
  };

  addNewTask = () => {
    const trimmedTitle = this.state.newTaskTitle.trim();
    if (!trimmedTitle) {
      return;
    }

    const newTask = {
      id: idGenerator(),
      title: trimmedTitle,
    };
    const tasks = [...this.state.tasks];
    tasks.push(newTask);
    this.setState({
      tasks,
      newTaskTitle: "",
    });
  };

  onTaskDelete = (taskId) => {
    const {selectedTasks, tasks} = this.state;
    const newTasks = tasks.filter(task => task.id !== taskId);

    const newState = {tasks: newTasks};

    if(selectedTasks.has(taskId)){
      const newSelectedTasks = new Set(selectedTasks);
      newSelectedTasks.delete(taskId);
      newState.selectedTasks = newSelectedTasks;
    }
    this.setState(newState);
  };

  onTaskSelect = (taskId)=>{
    const selectedTasks = new Set(this.state.selectedTasks);
    if(selectedTasks.has(taskId)){
      selectedTasks.delete(taskId);
    }
    else {
      selectedTasks.add(taskId);
    }
    this.setState({ selectedTasks });
  };

  deleteSelectedTasks = ()=>{
      const newTasks = [];
      const {selectedTasks, tasks} = this.state;
    
    tasks.forEach((task)=>{
          if(!selectedTasks.has(task.id)){
            newTasks.push(task);
          }
    });
    this.setState({
      tasks: newTasks,
      selectedTasks: new Set(),
      isConfirmDialogOpen: false
    });

  };

  openConfirmDialog = ()=>{
    this.setState({
      isConfirmDialogOpen: true
    });
  };

  closeConfirmDialog = ()=>{
    this.setState({
      isConfirmDialogOpen: false
    });
  };

  render() {

    const {isConfirmDialogOpen, newTaskTitle, selectedTasks} = this.state;
    const isAddNewTaskButtonDisabled = !newTaskTitle.trim();

    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs="12" sm="8" md="6">
            <InputGroup className="mb-3 mt-4">
              <Form.Control
                placeholder="Task title"
                onChange={this.handleInputChange}
                onKeyDown={this.handleInputKeyDown}
                value={this.state.newTaskTitle}
              />
              <Button
                variant="success"
                onClick={this.addNewTask}
                disabled={isAddNewTaskButtonDisabled}
              >
                Add
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          {this.state.tasks.map((task) => {
            return (
              <Task
                data={task}
                key={task.id}
                onTaskDelete={this.onTaskDelete}
                onTaskSelect={this.onTaskSelect}
              />
            );
          })}
        </Row>
        <Button
        className={styles.deletSelected}
        variant="danger"
        onClick={this.openConfirmDialog}
        disabled={!selectedTasks.size}
      >
        Delete selected
      </Button>      
      {isConfirmDialogOpen && 
      <ConfirmDialog 
      tasksCount={selectedTasks.size}
      onCancel={this.closeConfirmDialog}
      onSubmit={this.deleteSelectedTasks}
      />
      }
      </Container>
    );
  }
}

export default Todo;
