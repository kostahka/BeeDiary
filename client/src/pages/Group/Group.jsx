import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import GroupService from "../../services/GroupService";
import UserElement from "../../partial/UserElement";
import {AuthContext} from "../../contexts/AuthContext";
import ApiaryElement from "../../partial/ApiaryElement";
import ApiaryService from "../../services/ApiaryService";

function Group(props) {
    const {id} = useParams()
    const {user} = useContext(AuthContext)

    const [name, setName] = useState("")

    const [ownApiaries, setOwnApiaries] = useState([])
    const [addAllowedApiary, setAddAllowedApiary] = useState([])

    const [group, setGroup] = useState({
        _id: null,
        name: "",
        allowedApiaries: [],
        users: []
    })

    const [showList, setShowList] = useState("showUsers")

    const handleSwitchShowList = (e) => {
        setShowList(e.target.id)
    }

    const switchRenderList = () => {
        switch (showList){
            case "showUsers":
            {
                return group.users.map(u=>
                    <div key={u.id} className="d-flex flex-column justify-content-center border border-1 border-secondary p-1 rounded-4">
                        <UserElement user={u}/>
                        <button disabled={!user || user.id === u.id || group.userId !== user.id}
                                id={u.id} onClick={handleRemoveFromGroup}
                                className="btn btn-outline-danger">Remove from group</button>
                    </div>
                )
            }
            case "showApiaries":
                return group.allowedApiaries.map(a=>
                    <div key={a._id} className="d-flex flex-column justify-content-center border border-1 border-secondary p-1 rounded-4">
                        <ApiaryElement apiary={a}/>
                        <button disabled={!user || (a.userId !== user.id && group.userId !== user.id)}
                                id={a._id} onClick={handleRemoveAllowedApiary}
                                className="btn btn-outline-danger">Remove from allowed</button>
                    </div>
                )
        }
    }

    const handleSetGroupName = (e) => {
        setName(e.target.value)
    }

    const handleSetGroup = async (e) => {
        e.preventDefault()

        fetchGroup("set")
    }

    const handleDeleteGroup = async (e) => {
        e.preventDefault()

        fetchGroup("delete")
    }

    const handleRemoveFromGroup = async (e) =>{
        e.preventDefault()

        fetchGroup("removeUser", e.target.id)
    }

    const handleRemoveAllowedApiary = async (e) =>{
        e.preventDefault()

        fetchGroup("removeAllowedApiary", e.target.id)
    }

    const navigate = useNavigate()

    const [fetchGroup, isLoading, error] = useFetching(async (type, someId) =>{
        switch (type) {
            case "fetch": {
                const res = await GroupService.fetchGroup(id)
                setGroup(res.data)
                setName(res.data.name)
                break
            }
            case "set": {
                const res = await GroupService.setGroup(id, name)
                fetchGroup("fetch")
                break
            }
            case "delete": {
                await GroupService.deleteGroup(group._id)
                navigate(-1)
                break
            }
            case "removeUser": {
                await GroupService.removeUser(someId, group._id)
                fetchGroup("fetch")
                break
            }
            case "fetchOwnApiaries": {
                const res = await ApiaryService.fetchUserOwnApiaries(user.id)
                setOwnApiaries(res.data)
                break;
            }
            case "addAllowedApiaries": {
                for (const apiaryId of addAllowedApiary) {
                    const res = await GroupService.addAllowedApiary(apiaryId, group._id)
                }
                fetchGroup("fetch")
                break;
            }
            case "removeAllowedApiary": {
                await GroupService.removeAllowedApiary(someId, group._id)
                fetchGroup("fetch")
                break
            }
        }
    })

    const handleAddAllowedApiaries = (e) => {
        fetchGroup("addAllowedApiaries")
    }

    const handleCheckAllowedApiaryToAdd = (e) => {
        const apiaryCheckboxes = document.querySelectorAll(".apiaryCheckbox")
        let apiariesId = []
        apiaryCheckboxes.forEach(checkbox => {
            if(checkbox.checked){
                apiariesId.push(checkbox.id)
            }
        })
        setAddAllowedApiary(apiariesId)
    }

    useEffect(()=>{
        fetchGroup("fetch")
        fetchGroup("fetchOwnApiaries")
    }, [])

    return (
        <div className="container-fluid">
            <div className="modal fade" id="modalAddAllowedApiary" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                Select apiaries to allow
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex flex-column">
                                {
                                    ownApiaries.map(apiary =>
                                        <div key={apiary._id}>
                                            <input type="checkbox" id={apiary._id}
                                                   disabled={group.allowedApiaries
                                                       .some(a => a._id === apiary._id)}
                                                   className="btn-check apiaryCheckbox"
                                                   onClick={handleCheckAllowedApiaryToAdd}/>
                                            <label className={"btn w-100 " +
                                                (group.allowedApiaries
                                                        .some(a => a._id === apiary._id) ?
                                                    "btn-warning"
                                                    :
                                                    "btn-outline-warning")}
                                                   htmlFor={apiary._id}>{apiary.name}</label>
                                        </div>
                                    )
                                }
                                {
                                    !ownApiaries.length && <span
                                        className="text-center">No apiaries to allow</span>
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-warning" data-bs-dismiss="modal"
                                    onClick={handleAddAllowedApiaries}>Accept</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container bg-dark p-5 mb-5 d-flex flex-column align-items-center
            rounded-5 border border-secondary">
                <span className="text-warning h2 mb-3">Group: {group.name}</span>
                <div className="d-flex flex-row justify-content-start w-100">
                    <div className="d-flex flex-column justify-content-start align-items-center w-100 mx-3">
                        <div className="form-floating mb-2 w-100">
                            <input type="text" className="form-control"
                                   value={name} onChange={handleSetGroupName}
                                   placeholder="Name"/>
                            <label className="form-label">Name</label>
                        </div>
                        <button className="btn btn-outline-warning w-100 mb-2" onClick={handleSetGroup}>Save</button>
                        <button className="btn btn-outline-danger w-100" onClick={handleDeleteGroup}>Delete</button>
                        <button className="btn btn-outline-warning w-100 mt-4"
                                data-bs-toggle="modal" data-bs-target="#modalAddAllowedApiary">Add allowed apiary</button>
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
            <div className="btn-group d-flex flex-row justify-content-center mb-3">
                <input type="radio" className="btn-check"
                       name="btnradio" id="showUsers" onClick={handleSwitchShowList}
                       autoComplete="off" defaultChecked={true}/>
                <label className="btn btn-outline-dark" htmlFor="showUsers">Users</label>

                <input type="radio" className="btn-check"
                       name="btnradio" id="showApiaries" onClick={handleSwitchShowList}
                       autoComplete="off"/>
                <label className="btn btn-outline-dark" htmlFor="showApiaries">Apiaries</label>
            </div>
            <div className="m-1 row row-cols-6">
                    {
                        switchRenderList()
                    }
            </div>
        </div>
    );
}

export default Group;