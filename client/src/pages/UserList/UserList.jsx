import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import UserService from "../../services/UserService";
import UserElement from "../../partial/UserElement";

function UserList(props) {
    const [users, setUsers] = useState([])

    const [userFilter, setUserFilter] = useState("");
    const [page, setPage] = useState(1);
    const inPageCount = 6;
    const [usersCount, setUsersCount] = useState(0);

    const [fetchUsers, isLoading, error] = useFetching(async (type) =>{
        switch (type){
            case "fetch": {
                const res = await UserService.fetchUsers(userFilter, page, inPageCount)
                setUsers(res.data)
                break
            }
            case "fetchCount":{
                const res = await UserService.fetchUsersCount(userFilter)
                setUsersCount(res.data)
                setPage(1)
                break
            }
            default:
                break;
        }
    })

    useEffect(()=>{
        fetchUsers("fetch")
    }, [page])

    useEffect(()=>{
        fetchUsers("fetchCount")
        fetchUsers("fetch")
    }, [userFilter])

    function handleFilterChanged(e){
        setUserFilter(e.target.value);
    }

    function handleChangePage(e){
        e.preventDefault();
        setPage(e.target.id)
    };

    useEffect(()=>{
        fetchUsers("fetchCount")
        fetchUsers("fetch")
    }, [])

    return (
        <div className="container-fluid">
            <div className="container bg-dark p-5 mb-5 d-flex flex-column justify-content-start
            align-items-center rounded-5 border border-secondary">
                <span className="text-warning h3">Users</span>

                <div className="input-group mb-3">
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="name"
                               onChange={handleFilterChanged}/>
                        <label className="form-label">Search for nickname</label>
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
            <div className="bg-dark border border-1 border-warning d-flex justify-content-center
            align-items-center mb-3">
                {
                    usersCount &&
                    Array.from({length: Math.floor((usersCount-1)/inPageCount) + 1},
                        (_, i) => i + 1)
                        .map((page)=>{
                            return (<button key={page} id={page} onClick={handleChangePage} className="btn btn-outline-warning m-2">
                                {page}
                            </button>)
                        })
                }
                {
                    !usersCount && <span className="text-warning h3">Cannot find</span>
                }
            </div>

            <div className="row row-cols-3">
                {users.map((user)=>
                    <UserElement key={user.id} user={user}/>
                )}
            </div>

        </div>
    );
}

export default UserList;