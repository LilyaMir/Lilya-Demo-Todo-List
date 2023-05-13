import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import TaskApi from "../../api/taskApi";

const taskApi = new TaskApi();

function SingleTask(){
const { taskId }  = useParams();
const [task, setTask] = useState(null);

useEffect(() => {
    taskApi.getSingle(taskId)
    .then(task=>{
        setTask(task);
    })
    .catch((err)=>{

    });
  }, [taskId]);

    return(
        <div>
        <h1 className="text-center">Task page</h1>
        {task ? <div>{task.title}</div> : <div>Task not found</div>}
        {task ? <div>{task.description}</div> : ""}
        </div>
    )
}

export default SingleTask;