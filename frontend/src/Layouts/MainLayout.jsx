
import {Outlet} from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'

export const MainLayout = () => {
    return (
        <div className='main-layout'>
            <Sidebar/>
            <Outlet/>
        </div>
    )
}


export  default MainLayout