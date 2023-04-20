import { useState, useEffect } from "react";
import {InputGroup, Form, Button, Modal} from "react-bootstrap";

function TaskModal(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  return (
    <Modal size="md" show={true} onHide={props.onCancel}>
    <Modal.Header closeButton>
      <Modal.Title>Add new task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="d-flex justify-content-evenly">
        <Button variant="success" onClick={props.onSubmit}>
          Save
        </Button>
        <Button variant="warning" onClick={props.onCancel}>
          Cancel
        </Button>
      </div>
    </Modal.Body>
  </Modal>
  );
}

export default TaskModal;