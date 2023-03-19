import React, {useContext, useState} from 'react';
import {AuthContext} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/AuthService";

function Login(props) {
    const [credentials, setCredentials] = useState({
        nickname: undefined,
        password: undefined
    })

    const {loading, error, dispatch} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try {
            const res = await AuthService.login(credentials.nickname, credentials.password)
            dispatch({type: "LOGIN_SUCCESS", payload: res})
            navigate("/")
        }catch(err){
            dispatch({type: "LOGIN_FAILURE", payload: err.response?err.response.data:err})
        }
    }

    return (
        <div>
            <div className="container bg-dark d-flex flex-column p-5 w-50 align-items-center">
                <div className="w-100">
                    <div className="input-group mb-2">
                        <span className="input-group-text">Nickname</span>
                        <input type="text" id="nickname" className="form-control"
                               onChange={handleChange}/>
                    </div>
                    <div className="input-group mb-4">
                        <span className="input-group-text">Password</span>
                        <input type="password" id="password" className="form-control"
                               onChange={handleChange}/>
                    </div>
                    <button className="btn btn-outline-warning w-100"
                            onClick={handleClick}>Login</button>
                </div>
                <div className="spinner-grow text-warning mt-4" role="status"
                     style={{visibility: !loading?"hidden":"visible"}}>
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

export default Login;