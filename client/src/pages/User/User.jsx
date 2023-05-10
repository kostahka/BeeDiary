import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import UserService from "../../services/UserService";
import {useParams} from "react-router-dom";

function User(props) {

    const {id} = useParams()

    const [user, setUser] = useState(null)

    const [fetchUser, isLoading, error] = useFetching(async () => {
        const res = await UserService.fetchUser(id)
        setUser(res.data)
    })

    useEffect(()=>{
        fetchUser()
    },[])

    return (
        <div>
            <div className="container bg-dark border border-1 rounded-5 border-warning p-5">
                <div className="d-flex flex-row justify-content-start">
                    <img src="/images/beeKeeper.png"/>
                    <div className="d-flex flex-column justify-content-center text-warning mx-5">
                        <span className="h3">{user && user.nickname}</span>
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