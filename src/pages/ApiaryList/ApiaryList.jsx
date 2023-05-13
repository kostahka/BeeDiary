import React, {useContext, useEffect, useState} from 'react';
import ApiaryElement from "../../partial/ApiaryElement";
import {useFetching} from "../../hooks/useFetching";
import ApiaryService from "../../services/ApiaryService";
import {AuthContext} from "../../contexts/AuthContext";

function ApiaryList(props) {
    const [apiaryName, setApiaryName] = useState('')

    const [apiaries, setApiaries] = useState([])

    const {user} = useContext(AuthContext)

    const [fetchApiaries, isLoading, error] = useFetching(async (type) =>{
        switch (type){
            case "fetch": {
                const res = await ApiaryService.fetchApiaries(user)
                setApiaries(res.data)
                break
            }
            case "add":{
                await ApiaryService.addApiary(user, apiaryName)
                fetchApiaries("fetch")
                break
            }
        }
    })

    const handleChange = (e) => {
        setApiaryName(e.target.value)
    }

    const handleClick = async (e) => {
        e.preventDefault()

        fetchApiaries("add")
    }

    useEffect(()=>{
        fetchApiaries("fetch")
    }, [])

    return (
        <div className="container-fluid">
            <div className="container bg-dark p-5 mb-5 d-flex flex-column justify-content-start
            align-items-center rounded-5 border border-secondary">
                <span className="text-warning text-center mb-4 h4">New apiary</span>
                <div className="d-flex flex-column w-100">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="name" onChange={handleChange}/>
                        <label className="form-label">Name of new apiary</label>
                    </div>

                    <button className="btn btn-outline-warning" onClick={handleClick}>Add apiary</button>
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
                {apiaries.map((apiary)=>
                    <ApiaryElement key={apiary._id} apiary={apiary}/>
                )}
            </div>
        </div>
    );
}

export default ApiaryList;