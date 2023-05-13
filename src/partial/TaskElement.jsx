import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import TaskService from "../services/TaskService";

function TaskElement(props) {

    const [taskText, setTaskText] = useState(props.task.text)
    const [complete, setComplete] = useState(props.task.isCompleted)

    const [editText, setEditText] = useState(false)

    const [fetchTask, isLoading, error] = useFetching(async (type) => {
        switch (type){
            case "completeTask":
            {
                const res = await TaskService.setTaskCompletion(props.task._id, complete)
                break
            }
            case "setTask":
            {
                const res = await TaskService.setTask(props.task._id, taskText)
                break
            }
            case "removeTask":
            {
                const res = await TaskService.deleteTask(props.task._id)
                props.handleDelete()
                break
            }
        }
    })

    const handleEditClick = (e) => {
        setEditText(!editText)
    }

    const handleTaskTextChange = (e) => {
        setTaskText(e.target.value)
    }

    const handleCompleteChecked = (e) => {
        setComplete(!complete)
    }

    const handleRemoveTask = (e) => {
        fetchTask("removeTask")
    }

    useEffect(()=>{
        fetchTask("completeTask")
    }, [complete])

    useEffect(()=>{
        if(!editText)
            fetchTask("setTask")
    }, [editText])

    return (
        <div className="p-2 input-group">
            <textarea className="form-control bg-dark text-warning" value={taskText}
                      onChange={handleTaskTextChange}
                disabled={!editText}/>
            <input type="checkbox" id={props.task._id.toString() + "edit"}
                   className="btn-check apiaryCheckbox"
                   onClick={handleEditClick}/>
            <label className="btn btn-outline-secondary d-flex flex-row align-items-center"
                   htmlFor={props.task._id.toString() + "edit"}>{editText ? "Save" : "Edit"}</label>
            <input type="checkbox" id={props.task._id}
                   className="btn-check apiaryCheckbox"
                    onClick={handleCompleteChecked} defaultChecked={complete}/>
            <label className="btn btn-outline-success  d-flex flex-row align-items-center"
                   htmlFor={props.task._id}>{complete ? "Completed!" : "In process..."}</label>
            <button className="btn btn-outline-danger"
                    onClick={handleRemoveTask}>Delete</button>
        </div>
    );
}

export default TaskElement;