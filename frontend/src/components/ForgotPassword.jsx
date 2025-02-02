import {GiBellPepper} from "react-icons/gi";
import {TailSpin} from "react-loading-icons";
import { FiSend } from "react-icons/fi";
import {useActionState} from "react";
import axios from "axios";

export const ForgotPassword = () => {

    const resetPass =async  (prev , formData)=>{
        const data = {}
        data.username = formData.get('username')
        try{
            const response = await axios.post('http://localhost:3000/auth/forgotpass' , data)
            if(response.status===201 || response.status ===200){

               data.success = true
            }

        }
            catch (err){
                data.error =  err.response?.data.message
            }

            return data
    }
    const [data , submitAction , isPending] = useActionState(resetPass ,  null);


    return (
        <div className='mt login-page'>
            <h2 className='register-h2'><GiBellPepper className='chef-hat'/> Reset Password</h2>
            { data?.success ?
                <div className='password-reset-success'>
                    <p>
                      we will now send a link to reset your password. Please check your email and click the link to continue.

                    </p>

                    <p>
                        If you do not receive an email we likely did not have any accounts using that email and you may want to try another email address.
                    </p>
                </div>

                :  <>
                <p>Enter your username in the form below and we&#39;ll send you instructions to your email for resetting
                    your password.</p>

                <form action={submitAction} method="POST">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input defaultValue={data?.username} type="text" id="username" name="username" required/>
                        {data?.error && <div className='error-div'><p>{data.error}</p></div>}
                    </div>


                    <button type="submit" className={isPending ? 'pending-button sign-in-btn' : "sign-in-btn"}>

                        {isPending ? <TailSpin className='pending-icon'/> :
                            <FiSend className="icon"/>} {isPending ? null : "Send Password Reset Email"}
                    </button>

                </form>
            </>}
        </div>
    )
}