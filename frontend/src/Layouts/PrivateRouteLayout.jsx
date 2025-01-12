import {Navigate, Outlet} from "react-router-dom";
import {useUser} from "../customHooks/useUser.js";
import axios from "axios";
import {useEffect, useState} from "react";

const PrivateRouteLayout = () => {

    const {jwt} = useUser()
    const [isValid, setIsValid] = useState(null);
    const [isLoadig, setIsLoadig] = useState(true)


    useEffect(() => {

        setIsLoadig(true)
        axios.post('http://localhost:3000/auth/validate', {}, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setIsValid(response.data.data)
                setIsLoadig(false)
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }, [jwt]);

    return (
        <>
            {isLoadig ? <h1>Loading</h1> : isValid ? <Outlet/> : <Navigate to='/login'/>}
        </>
    )
}


export default PrivateRouteLayout