
import {Outlet} from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'

export const MainLayout = () => {
    return (

           <>
               <Sidebar/>
               <Outlet/>
           </>

    )
}


export  default MainLayout