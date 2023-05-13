import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import UserService from "../../services/UserService";
import {useParams} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";
import GroupService from "../../services/GroupService";
import ApiaryService from "../../services/ApiaryService";

function User(props) {

    const {id} = useParams()

    const {user: authUser} = useContext(AuthContext)

    const [user, setUser] = useState(null)
    const [ownGroups, setOwnGroups] = useState([])
    const [ownApiaries, setOwnApiaries] = useState([])

    const [addToGroups, setAddToGroups] = useState([])
    const [addAllowedApiary, setAddAllowedApiary] = useState([])

    const [fetchUser, isLoading, error] = useFetching(async (type) => {
        switch (type)
        {
            case "fetch": {
                const res = await UserService.fetchUser(id)
                setUser(res.data)
                break;
            }
            case "fetchOwnGroups": {
                const res = await GroupService.fetchUserOwnGroups(authUser.id)
                setOwnGroups(res.data)
                break;
            }
            case "fetchOwnApiaries": {
                const res = await ApiaryService.fetchUserOwnApiaries(authUser.id)
                setOwnApiaries(res.data)
                break;
            }
            case "addToGroups": {
                for (const groupId of addToGroups) {
                    const res = await GroupService.addUser(user.id, groupId)
                }
                fetchUser("fetch")
                break;
            }
            case "addAllowedApiaries": {
                for (const apiaryId of addAllowedApiary) {
                    const res = await ApiaryService.addAllowedUser(apiaryId, user.id)
                }
                fetchUser("fetch")
                break;
            }
        }
    })

    useEffect(()=>{
        fetchUser("fetch")
        fetchUser("fetchOwnGroups")
        fetchUser("fetchOwnApiaries")
    },[])

    const handleCheckGroupToAdd = (e) => {
        const groupCheckboxes = document.querySelectorAll(".groupCheckbox")
        let groupsId = []
        groupCheckboxes.forEach(checkbox => {
            if(checkbox.checked){
                groupsId.push(checkbox.id)
            }
        })
        setAddToGroups(groupsId)
    }

    const handleAddToGroups = (e) => {
        fetchUser("addToGroups")
    }

    const handleAddAllowedApiaries = (e) => {
        fetchUser("addAllowedApiaries")
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

    return (
        <div className="d-flex justify-content-center">
            <div className="modal fade" id="modalAddToGroup" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                Select groups to add user
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex flex-column">
                                {
                                    ownGroups.map(group =>
                                        <div key={group._id.toString()} className="mb-2">
                                            <input type="checkbox" id={group._id}
                                                   disabled={user.groups.includes(group._id)}
                                                   className="btn-check groupCheckbox"
                                                   onClick={handleCheckGroupToAdd}/>
                                            <label className={"btn w-100 " +
                                                (user.groups.includes(group._id) ?
                                                "btn-warning"
                                                :
                                                "btn-outline-warning")}
                                                   htmlFor={group._id}>{group.name}</label>
                                        </div>
                                    )
                                }
                                {
                                    !ownGroups.length && <span className="text-center">No groups to add</span>
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-warning" data-bs-dismiss="modal"
                                onClick={handleAddToGroups}>Accept</button>
                        </div>
                    </div>
                </div>
            </div>

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
                                                   disabled={user.allowedApiaries
                                                       .some(u => u === apiary._id)}
                                                   className="btn-check apiaryCheckbox"
                                                   onClick={handleCheckAllowedApiaryToAdd}/>
                                            <label className={"btn w-100 " +
                                                (user.allowedApiaries
                                                    .some(u => u === apiary._id) ?
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

            <div className="d-flex w-75 justify-content-center bg-dark border border-1 rounded-5 border-warning p-5">
                <div className="d-flex flex-row justify-content-center w-50">
                    <img className="h-100" src="/images/beeKeeper.png"/>
                    <div className="d-flex flex-column justify-content-center text-warning mx-5">
                        <span className="h3 text-center">{user?user.nickname:"..."}</span>
                        <button className="btn btn-outline-warning mb-2"
                                data-bs-toggle="modal" data-bs-target="#modalAddToGroup">Add to group</button>
                        <button className="btn btn-outline-warning"
                                data-bs-toggle="modal" data-bs-target="#modalAddAllowedApiary">Add to user allowed apiary</button>
                    </div>
                </div>
                <div className="spinner-grow text-warning mt-4" role="status"
                     style={{visibility: isLoading?"visible":"hidden"}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
}

export default User;