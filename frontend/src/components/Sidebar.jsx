
import { NavLink} from "react-router-dom";
import {Links} from '../data/Links.js'
import { IoIosLogOut } from "react-icons/io";
import {useRef} from "react";
import {ModalTitle} from "./ModalTitle.jsx";
import {ModalMainText} from "./ModalMainText.jsx";
import {Modal} from "./Modal.jsx";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {useUser} from "../customHooks/useUser.js";

const Sidebar = ()=>{

    const navigate = useNavigate();
    const logout = ()=>{
        dialogRef.current?.showModal()
        localStorage.clear();
        navigate('/login');
    }

    const dialogRef = useRef(null);
    const {jwt} = useUser()
    const decoded = jwtDecode(jwt);

    return(
        <aside className="sidebar">

            <div className="user-info">
                <p className='first-letter'>{decoded?.username[0]}</p>
                <p className='username'>{decoded?.username}</p>
            </div>
            {Links.map((item) => {
                return (
                    <NavLink key={item.title} className={({isActive})=> isActive ? 'side-bar-active' : 'side-bar-icons'} to={item.link} end >
                        <div className="side-bar-element" >

                                <item.icon className='element'/>
                            <p className='side-bar-text'>{item.title}</p>
                        </div>
                    </NavLink>
                )
            })}
            <a onClick={() => dialogRef.current?.showModal()} className='side-bar-icons logout'>
                <div className="side-bar-element " >

                        <IoIosLogOut className='element'/>
                    <p className='side-bar-text'>Logout</p>
                </div>
                </a>

            <Modal onConfirm={logout} dialogRef={dialogRef} confirmationText='Log out' showButtons={true} className='modal with-keyframes'>
                <ModalTitle>Are you sure you want to log out?</ModalTitle>
                <ModalMainText>You&#39;re about to log out of your account. Press &#39;Log out to proceed and you&#39;ll be redirected to the login page.</ModalMainText>
            </Modal>


        </aside>
    )
}


export default Sidebar