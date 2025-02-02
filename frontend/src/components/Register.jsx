import { GoPerson } from "react-icons/go";
import { GiBellPepper } from "react-icons/gi";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useForm} from "../customHooks/useForm.js";
import {TailSpin} from "react-loading-icons";

export const Register = () => {

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

    const link = 'http://localhost:3000/auth/register';
    const fields = [  'first_name','username' , 'email', 'password' , 'confirm' , 'last_name']
    const jsonArray = ['first_name','username' , 'password' , 'last_name' , 'email']
    const [data , submitAction , isPending] = useForm( link, jsonArray ,fields , checkErrors )




    return (
        <div className='mt login-page'>
            <h2 className='register-h2'><GiBellPepper className='chef-hat'/> Register</h2>
            <p className='already'>Already have an account? <Link to='/login'>Log In</Link></p>
            <form action={submitAction} method="POST" >
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input defaultValue={data?.first_name} type="text" id="first_name" name="first_name" required/>
                    {errors.first_name && <div className='error-div'>
                        <p style={{color: 'red'}}>{errors.first_name}</p>
                    </div>}
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input defaultValue={data?.last_name} type="text" id="last_name" name="last_name" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input defaultValue={data?.username} type="text" id="username" name="username" required/>
                    {errors.username && <div className='error-div'>  <p>{errors.username}</p> </div>}
                    {data?.error?.attribute === 'username' && <div className='error-div'>  <p>{data?.error.message}</p> </div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input defaultValue={data?.email} type="email" id="email" name="email" required/>
                    {data?.error?.attribute === 'email' && <div className='error-div'>  <p>{data?.error.message}</p> </div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input defaultValue={data?.password} type="password" id="password" name="password" required/>
                    {errors.password && <div className='error-div'>
                        <p>{errors.password}</p>
                    </div>}
                    </div>
                        <div className="form-group">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input defaultValue={data?.confirm} type="password" id="confirm" name="confirm" required/>
                            {errors.confirm &&  <div className='error-div'><p>{errors.confirm}</p> </div>}
                    </div>
                <button disabled={isPending} className={isPending?  'pending-button sign-in-btn' :  "sign-in-btn"}>
                    { isPending ? <TailSpin className='pending-icon'/> : <GoPerson className="icon"/>} {isPending ? null : "Create Account"}
                </button>
            </form>

        </div>
    )
}



