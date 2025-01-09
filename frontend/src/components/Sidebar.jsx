
import {NavLink} from "react-router-dom";
import {Links} from '../data/Links.js'
import { IoIosLogOut } from "react-icons/io";

const Sidebar = ()=>{
    return(
        <aside className="sidebar">

            <div className="user-info">
                <p className='first-letter'>I</p>
                <p className='username'>hammamidissam2</p>
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
            <NavLink className='side-bar-icons logout' to='/app'>
                <div className="side-bar-element " >

                        <IoIosLogOut className='element'/>
                    <p className='side-bar-text'>Logout</p>
                </div>
                </NavLink>

        </aside>
    )
}


export default Sidebar