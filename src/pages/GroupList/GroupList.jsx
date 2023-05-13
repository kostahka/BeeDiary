import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../contexts/AuthContext";
import {useFetching} from "../../hooks/useFetching";
import GroupElement from "../../partial/GroupElement";
import GroupService from "../../services/GroupService";

function GroupList(props) {
    const [groupName, setGroupName] = useState('')

    const [groups, setGroups] = useState([])

    const {user} = useContext(AuthContext)

    const [fetchGroups, isLoading, error] = useFetching(async (type) =>{
        switch (type){
            case "fetch": {
                const res = await GroupService.fetchUserGroups(user.id)
                setGroups(res.data)
                break
            }
            case "add":{
                await GroupService.addGroup(user.id, groupName)
                fetchGroups("fetch")
                break
            }
        }
    })

    const handleSetName = (e) => {
        setGroupName(e.target.value)
    }

    const handleAddGroup = async (e) => {
        e.preventDefault()

        fetchGroups("add")
    }

    useEffect(()=>{
        fetchGroups("fetch")
    }, [])

    return (
        <div className="container-fluid">
            <div className="container bg-dark p-5 mb-5 d-flex flex-column justify-content-start
            align-items-center rounded-5 border border-secondary">
                <span className="text-warning text-center mb-4 h4">New group</span>
                <div className="d-flex flex-column w-100">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="name" onChange={handleSetName}/>
                        <label className="form-label">Name of new group</label>
                    </div>

                    <button className="btn btn-outline-warning" onClick={handleAddGroup}>Add group</button>
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
                {groups.map((group)=>
                    group && <GroupElement key={group._id} group={group}/>
                )}
            </div>
        </div>
    );
}

export default GroupList;