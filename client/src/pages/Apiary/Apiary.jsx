import React, {useContext, useEffect, useState} from 'react';
import ApiaryElement from "../../partial/ApiaryElement";
import HiveElement from "../../partial/HiveElement";
import {useFetching} from "../../hooks/useFetching";
import ApiaryService from "../../services/ApiaryService";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";
import HiveService from "../../services/HiveService";

function Apiary(props) {
    const {id} = useParams()

    const [count, setCount] = useState(1)
    const [name, setName] = useState("")

    const [apiary, setApiary] = useState({
        _id: null,
        name: "",
        hives: []
    })

    const handleApiaryChange = (e) => {
        setName(e.target.value)
    }

    const handleApiaryClick = async (e) => {
        e.preventDefault()

        fetchApiary("set")
    }

    const handleHiveChange = (e) => {
        setCount(e.target.value)
    }

    const handleDeleteClick = async (e) => {
        e.preventDefault()

        fetchApiary("delete")
    }

    const handleHiveClick = async (e) => {
        e.preventDefault()

        fetchApiary("add")
    }

    const navigate = useNavigate()

    const [fetchApiary, isLoading, error] = useFetching(async (type) =>{
        switch (type) {
            case "fetch": {
                const res = await ApiaryService.fetchApiary(id)
                setApiary(res.data)
                setName(res.data.name)
                break
            }
            case "set": {
                const res = await ApiaryService.setApiary(id, name)
                fetchApiary("fetch")
                break
            }
            case "add": {
                const res = await HiveService.addHives(id, count)
                fetchApiary("fetch")
                break
            }
            case "delete": {
                await ApiaryService.deleteApiary(apiary._id)
                navigate(-1)
                break
            }
        }
    })

    useEffect(()=>{
        fetchApiary("fetch")
    }, [])

    return (
        <div className="container-fluid">
            <div className="container bg-dark p-5 mb-5 d-flex flex-column align-items-center
            rounded-5 border border-secondary">
                <span className="text-warning h2 mb-3">Apiary: {apiary.name}</span>
                <div className="d-flex flex-row justify-content-start w-100">
                    <div className="d-flex flex-column justify-content-start align-items-center w-100 mx-3">
                        <div className="form-floating mb-2 w-100">
                            <input type="text" className="form-control"
                                   value={name} onChange={handleApiaryChange}
                                    placeholder="Name"/>
                            <label className="form-label">Name</label>
                        </div>
                        <button className="btn btn-outline-warning w-100 mb-2" onClick={handleApiaryClick}>Save</button>
                        <button className="btn btn-outline-danger w-100" onClick={handleDeleteClick}>Delete</button>
                    </div>
                    <div className="d-flex flex-column justify-content-start align-items-center w-100">
                        <div className="input-group">
                            <div className="form-floating">
                                <input type="number" min="1" className="form-control col-1" value={count} onChange={handleHiveChange}/>
                                <label className="form-label">Count</label>
                            </div>
                            <button className="btn btn-warning col-5" onClick={handleHiveClick}>Add hives</button>
                        </div>

                    </div>
                </div>

                <div className="spinner-grow text-warning mt-4" role="status"
                     style={{visibility: !isLoading?"hidden":"visible"}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                {error &&
                    <div className="border border-danger border rounded-4 p-2 px-4 mt-2">
                        <span className="text-danger text-center h3">{error.message}</span>
                    </div>}
            </div>
            <div className="row row-cols-6">
                {
                    apiary.hives.map(hive=>
                        <HiveElement key={hive._id} hive={hive}/>
                    )
                }
            </div>
        </div>
    );
}

export default Apiary;