import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import HiveService from "../../services/HiveService";
import {AuthContext} from "../../contexts/AuthContext";
import Select from "../../components/Select";
import ApiaryService from "../../services/ApiaryService";
import TaskService from "../../services/TaskService";
import TaskElement from "../../partial/TaskElement";

function Hive(props) {
    const {user} = useContext(AuthContext)

    const typeOptions = [
        {value:"Vertical"},
        {value:"Horizontal"},
        {value:"Queen bee rearing"},
        {value:"Nucleus"}
    ]

    const queenOptions = [
        {value:"Carniolan"},
        {value:"Buckfast"},
        {value:"Italian"},
        {value:"Caucasian"}
    ]

    const {id} = useParams()

    const [hive, setHive] = useState({
        _id: null,
        type: "",
        queen: "",
        performance: 0,
        apiaryId: ""
    })
    const [apiary, setApiary] = useState({
        _id: null,
        name: "",
        hives: []
    })

    const [tasks, setTasks] = useState([])
    const [taskText, setTaskText] = useState("")

    const navigate = useNavigate()

    const [fetchHive, isLoading, error] = useFetching(async (type, someId, someData) =>{
        switch (type){
            case "fetch":
            {
                const res = await HiveService.fetchHive(id)
                setHive(res.data)
                break
            }
            case "set":
            {
                await HiveService.setHive(hive)
                navigate(-1)
                break
            }
            case "delete":
            {
                await HiveService.deleteHive(hive._id)
                navigate(-1)
                break
            }
            case "fetchApiary":
            {
                const res = await ApiaryService.fetchApiary(hive.apiaryId)
                setApiary(res.data)
                break
            }
            case "fetchTasks":
            {
                const res = await TaskService.fetchTasks(hive._id)
                setTasks(res.data)
                break
            }
            case "addTask":
            {
                const res = await TaskService.addTask(hive._id, taskText)
                setTaskText("")
                fetchHive("fetchTasks")
                break
            }
        }
    })

    const handleDeleteTask = () => {
        fetchHive("fetchTasks")
    }

    const handlePerformanceChange = (e) => {
        setHive(prev => ({...prev, performance: e.target.value}))
    }

    const handleTypeChange = (e) => {
        setHive(prev => ({...prev, type: e.target.value}))
    }

    const handleQueenChange = (e) => {
        setHive(prev => ({...prev, queen: e.target.value}))
    }

    const handleCancelClick = (e) => {
        e.preventDefault()

        navigate(-1)
    }

    const handleSaveClick = (e) =>{
        e.preventDefault()

        fetchHive("set")
    }

    const handleDeleteClick = async (e) => {
        e.preventDefault()

        fetchHive("delete")
    }

    const handleAddTask = (e) => {
        e.preventDefault()

        fetchHive("addTask")
    }

    const handleChangeTaskText = (e) => {
        setTaskText(e.target.value)
    }

    useEffect(()=>{
        fetchHive("fetch")
    }, [])

    useEffect(()=>{
        if(hive._id)
        {
            fetchHive("fetchTasks")
            fetchHive("fetchApiary")
        }
    }, [hive])

    return (
        <div>

            <div className="modal fade" id="modalAddTask" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                Add task
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group">
                                <span className="input-group-text">Task text</span>
                                <textarea className="form-control" onChange={handleChangeTaskText}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-warning" data-bs-dismiss="modal"
                                    onClick={handleAddTask}>Accept</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container bg-dark p-5 d-flex flex-column align-items-center
            rounded-5 border border-secondary">

                <span className="text-warning h2 mb-4">Number #{hive.number}</span>

                <div className="input-group mb-3 row-cols-2">
                    <div className="input-group-text bg-dark border-warning col-1
                    d-flex justify-content-center">
                        <img style={{height: "5vh", width:"auto"}}
                             src="/images/beeFrame.png"/>
                    </div>
                    <div className="form-floating col">
                        <Select
                            onChange={handleTypeChange}
                            options={typeOptions}
                            value={hive.type}
                        />
                        <label className="form-label">Hive type</label>
                    </div>
                </div>


                <div className="mb-3 input-group row-cols-2">
                    <div className="input-group-text bg-dark border-warning col-1
                    d-flex justify-content-center">
                        <img style={{height: "5vh", width:"auto"}}
                             src="/images/beeQueen.png"/>
                    </div>
                    <div className="form-floating col">
                        <Select
                            onChange={handleQueenChange}
                            options={queenOptions}
                            value={hive.queen}
                            other
                        />
                        <label className="form-label">Queen</label>
                    </div>
                </div>

                <div className="input-group row">
                    <div className="input-group-text bg-dark border-warning col-1
                    d-flex justify-content-center">
                        <img style={{height: "5vh", width:"auto"}}
                             src="/images/swarmOfBees.png"/>
                    </div>

                    <div className="form-control bg-dark border-warning col">
                        <label className="form-label text-warning border-warning">
                            Performance: {hive.performance}%</label>
                        <input value={hive.performance} onChange={handlePerformanceChange} type="range"
                               className=" form-range mb-2" min="0" max="100" />
                    </div>

                </div>

                <div className="input-group mt-5 row-cols-2 mb-2">
                    <button onClick={handleCancelClick} className="btn btn-outline-secondary">Cancel</button>
                    <button onClick={handleSaveClick} className="btn btn-warning">Save</button>
                </div>
                <button onClick={handleDeleteClick} className="btn btn-outline-danger w-100"
                        disabled={apiary.userId !== user.id}>Delete</button>
                <div className="spinner-grow text-warning mt-4" role="status"
                     style={{visibility: !isLoading?"hidden":"visible"}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                {error &&
                    <div className="border border-danger border rounded-4 p-2 px-4 mt-2">
                        <span className="text-danger text-center h3">{error.message}</span>
                    </div>}
            </div>
            <div className="d-flex flex-column align-items-center my-4 bg-dark container rounded-4">
                <span className="text-warning h2 mb-4">Tasks</span>
                <div className="d-flex flex-column align-items-center border border-1 border-warning rounded-4 container">
                    {
                        !tasks.length && <span className="text-warning h4">No tasks</span>
                    }
                    {
                        tasks.map(task =>
                            <TaskElement key={task._id} handleDelete={handleDeleteTask} task={task}/>
                        )
                    }
                </div>
                <button className="btn btn-outline-warning my-4"
                        data-bs-toggle="modal" data-bs-target="#modalAddTask">+</button>
            </div>
        </div>
    );
}

export default Hive;