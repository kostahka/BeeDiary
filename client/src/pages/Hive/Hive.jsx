import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import HiveService from "../../services/HiveService";
import {AuthContext} from "../../contexts/AuthContext";
import Select from "../../components/Select";

function Hive(props) {

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
        apiary_id: ""
    })

    const navigate = useNavigate()

    const [fetchHive, isLoading, error] = useFetching(async (type) =>{
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
        }

    })

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

    useEffect(()=>{
        fetchHive("fetch")
    }, [])

    return (
        <div>
            <div className="container bg-dark p-5 d-flex flex-column align-items-center">

                <span className="text-warning h2 mb-4">Number #{hive.number}</span>

                <div className="input-group mb-3 row-cols-3">
                    <div className="input-group-text bg-dark border-warning col-1 d-flex justify-content-center">
                        <img style={{height: "50px", width:"auto"}} src="/images/beeFrame.png"/>
                    </div>
                    <span className="input-group-text col-2">Hive type</span>
                    <Select
                        onChange={handleTypeChange}
                        options={typeOptions}
                        value={hive.type}
                    />
                </div>


                <div className="input-group mb-3 row-cols-3">
                    <div className="input-group-text bg-dark border-warning col-1 d-flex justify-content-center">
                        <img style={{height: "50px", width:"auto"}} src="/images/beeQueen.png"/>
                    </div>
                    <span className="input-group-text col-2">Queen</span>
                    <Select
                        onChange={handleQueenChange}
                        options={queenOptions}
                        value={hive.queen}
                        other
                    />
                </div>

                <div className="input-group row-cols-3">
                    <div className="input-group-text bg-dark border-warning col-1 d-flex justify-content-center">
                        <img style={{height: "50px", width:"auto"}} src="/images/swarmOfBees.png"/>
                    </div>
                    <label className="input-group-text border-warning col-2">Performance</label>
                    <div className="input-group-text form-control bg-dark col">
                        <input value={hive.performance} onChange={handlePerformanceChange} type="range" className=" form-range mb-2" min="0" max="100"/>
                    </div>
                </div>

                <div className="input-group mt-5 row-cols-2 mb-2">
                    <button onClick={handleCancelClick} className="btn btn-outline-secondary">Cancel</button>
                    <button onClick={handleSaveClick} className="btn btn-warning">Save</button>
                </div>
                <button onClick={handleDeleteClick} className="btn btn-outline-danger w-100">Delete</button>
                <div className="spinner-grow text-warning mt-4" role="status"
                     style={{visibility: !isLoading?"hidden":"visible"}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                {error &&
                    <div className="border border-danger border rounded-4 p-2 px-4 mt-2">
                        <span className="text-danger text-center h3">{error.message}</span>
                    </div>}
            </div>
        </div>
    );
}

export default Hive;