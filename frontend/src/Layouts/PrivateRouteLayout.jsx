import {Navigate, Outlet} from "react-router-dom";
import {useUser} from "../customHooks/useUser.js";
import axios from "axios";
import {useEffect, useState} from "react";
import {Loading} from "../components/Loading.jsx";

const PrivateRouteLayout = () => {

    const {jwt} = useUser()
    const [isValid, setIsValid] = useState(null);
    const [isLoadig, setisLoadig] = useState(true)


    useEffect(() => {

        setisLoadig(true)
        axios.post('http://localhost:3000/auth/validate', {}, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setIsValid(response.data.data)
                setisLoadig(false)
            })
            .catch(error => {
                console.error('Error:', error);
            });


    }, [jwt]);

    return (
        <>
            {isLoadig ? <Loading/> : isValid ? <Outlet/> : <Navigate to='/login'/>}
        </>
    )
}


export default PrivateRouteLayout