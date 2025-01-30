import {useScroll} from "../customHooks/useScroll.js";
import {Modal} from "./Modal.jsx";
import {ModalTitle} from "./ModalTitle.jsx";
import {useActionState, useEffect, useRef, useState} from "react";
import {useUser} from "../customHooks/useUser.js";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const Account = () => {

    const {jwt} = useUser()
    const [userInfo, setUserInfo] = useState({
        username : null ,
        email : null
    });

    useEffect(() => {
        axios.get('http://localhost:3000/users/profile' , {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        }).then(res=>setUserInfo(res.data.data.userinfo))
    }, []);



    const isScrolled = useScroll(3)
    const submitEmail = async (prev , formData)=>{
        const email = formData.get('email')
          await axios.put('http://localhost:3000/users/profile/email' , {email} ,{
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        } )

        setUserInfo({...userInfo , email: email})
        emailRef.current.close()

    }
    const submitPass = async (prev , formData)=>{
        const password = formData.get('password')
        await axios.put('http://localhost:3000/users/profile/password' , {password} ,{
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        } )

        passwordRef.current.close()

    }
    const [data , submitActionEmail , isEmailPending] = useActionState(submitEmail, null);
    const [passwodData , submitActionPass , isPasswordPending] = useActionState(submitPass, null);
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    return (
        <>
            <header className={isScrolled ? 'discover-header-scroll' : 'discover-header'}>
                <div className='discover-header-content'>
                    <h2 className='planner-title'>Account settings</h2>
                </div>
            </header>


            <div className='discover '>
                <div className='settings-main'>
                    <p className='email-ad'>Email Address</p>
                    <p className='user-email'>{userInfo.email}</p>
                    <a onClick={()=>{emailRef?.current.showModal()}} className='change-link'>Change Email Address</a>
                    <br/>
                    <p className='password-text'>Password</p>
                    <a onClick={()=>{passwordRef?.current.showModal()}} className='change-link'>Change Password</a>

                </div>
            </div>

            <Modal dialogRef={emailRef} confirmationText='Change email' showButtons={false} className='modal with-keyframes'>
                <ModalTitle>Change Email</ModalTitle>
                <div className='settings-modal'>

                    <form action={submitActionEmail} className='meal-planner-form'>

                        <div className='settings-flex'>
                        <label htmlFor="email">New email Address:</label>
                        <input className='change-mail-input' type="email" id="email" name="email" required/>
                        </div>

                        <div className='modal-buttons meal-form-btns'>
                            <button type="button" className='modal-btn default'
                                    onClick={() => emailRef.current?.close()}>Cancel
                            </button>
                            <button type='submit' className='modal-btn confirm'>Change Email</button>

                        </div>
                    </form>


                </div>
            </Modal>

            <Modal dialogRef={passwordRef} confirmationText='Change email' showButtons={false} className='modal with-keyframes'>
                <ModalTitle>Change Password</ModalTitle>
                <div className='settings-modal'>

                    <form action={submitActionPass} className='meal-planner-form'>

                        <div className='settings-flex'>
                            <label htmlFor="password">New Password:</label>
                            <input className='change-mail-input' type="password" id="password" name="password" required/>
                        </div>
                        <div className='settings-flex'>
                            <label htmlFor="confirm">Confirm Password:</label>
                            <input className='change-mail-input' type="password" id="confirm" name="confirm" required/>
                        </div>

                        <div className='modal-buttons meal-form-btns'>
                            <button type="button" className='modal-btn default'
                                    onClick={() => passwordRef.current?.close()}>Cancel
                            </button>
                            <button type='submit' className='modal-btn confirm'>Change Password</button>

                        </div>
                    </form>


                </div>
            </Modal>
        </>
    )
}