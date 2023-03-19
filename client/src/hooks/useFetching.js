import {useContext, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const {dispatch, user} = useContext(AuthContext)
    const navigate = useNavigate()

    const fetching = async (...args) => {
        if(user == null){
            navigate("/login")
        }
        else {
            try {
                setIsLoading(true)
                await callback(...args)
            } catch (e) {
                if(e.response?.status == 401){
                    dispatch({type: "LOGIN_FAILURE", payload: e.response.data})
                    navigate('/login')
                }
                else{
                    setError(e);
                }
            } finally {
                setIsLoading(false)
            }
        }
    }

    return [fetching, isLoading, error]
}