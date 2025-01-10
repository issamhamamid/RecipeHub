import { GiBellPepper } from "react-icons/gi";
import {Link} from "react-router-dom";
import { MdOutlineLogin } from "react-icons/md";




export const Login = () => {
    return (
        <div className='mt login-page'>
            <h2 className='register-h2'> <GiBellPepper  className='chef-hat'/> Login</h2>

            <form action="/submit" method="POST">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required/>
                </div>

                <a className='forgot'>Forgot password?</a>
                <button type="submit" className=" sign-in-btn">
                    <MdOutlineLogin className='icon'/> Login
                </button>
                <Link to='/register' className='dont'>Don&#39;t have an account? Register </Link>
            </form>
        </div>
    )
}