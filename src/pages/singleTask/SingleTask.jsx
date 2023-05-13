import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Button, Card, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPenToSquare,
    faCheck,
    faHistory,
} from "@fortawesome/free-solid-svg-icons";
import TaskModal from "../../components/taskModal/TaskModal";
import { formatDate } from "../../utils/helpers";
import TaskApi from "../../api/taskApi";
import styles from "./singleTask.module.css";

const taskApi = new TaskApi();

function SingleTask() {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [isEditTaskModalOpen, setEditTaskModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        taskApi
            .getSingle(taskId)
            .then((task) => {
                setTask(task);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }, [taskId]);

    const onEditTask = (editedTask) => {
        taskApi
            .update(editedTask)
            .then((updatedTask) => {
                setTask(updatedTask);
                toast.success(`Task has been updated successfully!`);
                setEditTaskModalOpen(false);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const onTaskDelete = () => {
        taskApi
            .delete(taskId)
            .then(() => {
                navigate('/');
                toast.success("The task has been deleted successfully!");
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    return (
        <div className={styles.taskContainer}>
            <Container>
                <Row className="justify-content-center text-center">
                    <Col xs={12}>
                        <Card className="mt-2 mb-2">
                            {task ? (
                                <Card.Body>
                                    <Card.Title>{task.title}</Card.Title>
                                    <Card.Text>{task.description}</Card.Text>
                                    <Card.Text>Status: {task.status}</Card.Text>
                                    <Card.Text>Created At: {formatDate(task.created_at)}</Card.Text>
                                    <Card.Text>Deadline: {formatDate(task.date)}</Card.Text>
                                    <Card.Text>Show details</Card.Text>
                                    <div className={styles.actionButtons}>
                                        {task.status === "active" ? (
                                            <Button
                                                title="Mark as done"
                                                variant="success"
                                                onClick={() => onEditTask({ status: 'done', _id: task._id })}
                                            >
                                                <FontAwesomeIcon icon={faCheck} />
                                            </Button>
                                        ) : (
                                            <Button
                                                title="Mark as active"
                                                variant="info"
                                                onClick={() => onEditTask({ status: 'active', _id: task._id })}
                                            >
                                                <FontAwesomeIcon icon={faHistory} />
                                            </Button>
                                        )}
                                        <Button
                                            title="Edit"
                                            className={styles.actionButton}
                                            variant="warning"
                                            onClick={() => setEditTaskModalOpen(true)}
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </Button>
                                        <Button
                                            title="Delete"
                                            variant="danger"
                                            className={styles.actionButton}
                                            onClick={onTaskDelete}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </div>
                                </Card.Body>
                            ) : (
                                <h3>Task data is not found</h3>
                            )}
                        </Card>
                    </Col>

                    {isEditTaskModalOpen && (
                        <TaskModal
                            onCancel={() => setEditTaskModalOpen(false)}
                            onSave={onEditTask}
                            data={task}
                        />
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default SingleTask;