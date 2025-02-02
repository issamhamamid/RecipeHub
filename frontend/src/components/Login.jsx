import { GiBellPepper } from "react-icons/gi";
import {Link} from "react-router-dom";
import { MdOutlineLogin } from "react-icons/md";
import {useForm} from "../customHooks/useForm.js";
import {TailSpin} from "react-loading-icons";
import {GoPerson} from "react-icons/go";




export const Login = () => {
    const link = 'http://localhost:3000/auth/login';
    const fields = ['username' , 'password']
    const jsonArray = ['username' , 'password']


   const [data , submitAction , isPending] = useForm( link, jsonArray ,fields )


    return (
        <div className='mt login-page'>
            <h2 className='register-h2'> <GiBellPepper  className='chef-hat'/> Login</h2>
            {data?.error?.message && <div className='error-div'>
                <p style={{color: 'red'}}>{data?.error?.message}</p>
            </div>}

            <form action={submitAction} method="POST">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input defaultValue={data?.username} type="text" id="username" name="username" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input defaultValue={data?.password} type="password" id="password" name="password" required/>
                </div>

                <a className='forgot'>Forgot password?</a>
                <button type="submit" className={isPending ? 'pending-button sign-in-btn' : "sign-in-btn"}>

                    {isPending ? <TailSpin className='pending-icon'/> :
                        <MdOutlineLogin className="icon"/>} {isPending ? null : "Login"}
                </button>

                <Link to='/register' className='dont'>Don&#39;t have an account? Register </Link>
            </form>
        </div>
    )
}