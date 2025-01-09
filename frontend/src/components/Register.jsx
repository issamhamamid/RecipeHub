import { GoPerson } from "react-icons/go";
import { GiBellPepper } from "react-icons/gi";
import {Link} from "react-router-dom";


export const Register = () => {
    return (
        <div className='mt login-page'>
            <h2 className='register-h2'> <GiBellPepper  className='chef-hat'/> Register</h2>
            <p className='already'>Already have an account? <Link to='/login'>Log In</Link></p>
            <form action="/submit" method="POST">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" name="confirm-password" required/>
                </div>
                <button type="submit" className=" sign-in-btn">
                    <GoPerson className='icon' /> Create Account
                </button>
            </form>
        </div>
    )
}