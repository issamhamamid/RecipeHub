import { GoPerson } from "react-icons/go";
import { GiBellPepper } from "react-icons/gi";
import {Link} from "react-router-dom";
import {useActionState, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useUser} from "../customHooks/useUser.js";

export const Register = () => {
    const {jwt , setJwt} = useUser()


    let Navigate = useNavigate()
    const [errors, setErrors] = useState({
        first_name: '' ,
        last_name : '',
        username : '',
        password : '',
        confirm : ''
    });

    const checkErrors = (data)=>{

        setErrors({
            first_name: '' ,
            last_name : '',
            username : '',
            password : '',
            confirm : ''
        })

        const errorsObj = {}
        if (data.password.length < 6){
            errorsObj.password = 'Password must be at least 5 characters'

        }

        if (data.username.length < 5){
           errorsObj.username = 'Username must be at least 4 characters'

        }

        if(!(data.password === data.confirm)){
            errorsObj.confirm = 'Passwords do not match'

        }

        setErrors(errorsObj)
        return Object.keys(errorsObj).length === 0;
    }

    const submit =   async (previousState , formData)=>{
        const data = {
            'first_name' : formData.get('firstname') ,
            'last_name' : formData.get('lastname') ,
            'username' : formData.get('username'),
            'confirm' :formData.get('confirm-password'),
            'email' : formData.get('email'),
            'password' : formData.get('password'),
            'role' : 'user'
        }



        const isValid = checkErrors(data)
        if (!isValid){
            return data
        }

        const jsonObj = {
            'first_name' : formData.get('firstname') ,
            'last_name' : formData.get('lastname') ,
            'username' : formData.get('username'),
            'email' : formData.get('email'),
            'password' : formData.get('password'),
            'role' : 'user'
        }


            try{

                const response = await axios.post('http://localhost:3000/auth/register' , jsonObj )
                if(response.status===201){
                    setJwt(response.headers['authorization'])
                    Navigate('/app')

                }

            }
            catch (err){
                console.log(err.response?.data?.message)
            }

        return data

    }

    const [data, submitAction, isPending] = useActionState(submit, null);



    return (
        <div className='mt login-page'>
            <h2 className='register-h2'><GiBellPepper className='chef-hat'/> Register</h2>
            <p className='already'>Already have an account? <Link to='/login'>Log In</Link></p>
            <form action={submitAction} method="POST" >
                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input defaultValue={data?.first_name} type="text" id="firstname" name="firstname" required/>
                    {errors.first_name && <div className='error-div'>
                        <p style={{color: 'red'}}>{errors.first_name}</p>
                    </div>}
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input defaultValue={data?.last_name} type="text" id="lastname" name="lastname" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input defaultValue={data?.username} type="text" id="username" name="username" required/>
                    {errors.username && <div className='error-div'>  <p>{errors.username}</p> </div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input defaultValue={data?.email} type="email" id="email" name="email" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input defaultValue={data?.password} type="password" id="password" name="password" required/>
                    {errors.password && <div className='error-div'>
                        <p>{errors.password}</p>
                    </div>}
                    </div>
                        <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input defaultValue={data?.confirm} type="password" id="confirm-password" name="confirm-password" required/>
                            {errors.confirm &&  <div className='error-div'><p>{errors.confirm}</p> </div>}
                    </div>
                        <button disabled={isPending} className="sign-in-btn">
                    <GoPerson className="icon"/> Create Account
                </button>
            </form>

        </div>
    )
}



