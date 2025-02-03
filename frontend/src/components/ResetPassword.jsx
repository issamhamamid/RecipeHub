
import {GiBellPepper} from "react-icons/gi";
import {TailSpin} from "react-loading-icons";
import {Link, useSearchParams} from "react-router-dom";
import { GrPowerReset } from "react-icons/gr";
import {useActionState} from "react";
import axios from "axios";


export const ResetPassword = () => {
    const link = 'http://localhost:3000/auth/resetpassword';
    const [params] = useSearchParams();

    const setNewPass = async (prev , formData) =>{
        const data = {}
        const password= formData.get('password')
        data.password = formData.get('password')
        if (formData.get('password') !== formData.get('confirm')){
            data.error = 'Passwords do not match'
            return data
        }
        try{
            const response = await axios.post(link , {password} , {
                headers: {
                    'Authorization': `Bearer ${params.get('token')}`,
                    'Content-Type': 'application/json'
                }
            })

            if(response.status===201 || response.status ===200){

                data.success = true
            }
        }

        catch (err){
            data.error =  err.response?.data.message
        }

        return data
    }
    const [data , submitAction , isPending] = useActionState(setNewPass , null);


    return (
        <div className='mt login-page'>

            {data?.success ?

                <p>Your password has been reset you can now login <Link to='/login'>here</Link></p>
                :

                <>
                    <h2 className='register-h2 new-pass-text'><GiBellPepper className='chef-hat'/> Enter your new
                        password</h2>
                    {data?.error && <div className='error-div'><p>{data.error}</p></div>}


                    <form action={submitAction} method="POST">
                        <div className="form-group">
                            <label htmlFor="password">New password</label>
                            <input defaultValue={data?.password} type="password" id="password" name="password"
                                   required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm">Confirm new password</label>
                            <input type="password" id="confirm" name="confirm" required/>
                        </div>

                        <button type="submit" className={isPending ? 'pending-button sign-in-btn' : "sign-in-btn"}>

                            {isPending ? <TailSpin className='pending-icon'/> :
                                <GrPowerReset className="icon"/>} {isPending ? null : "Reset password"}
                        </button>

                    </form>
                </>
            }
        </div>
    )
}