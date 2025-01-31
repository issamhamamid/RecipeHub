
import {Outlet} from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import {MealPlanProvider} from "../components/MealPlanProvider.jsx";

export const MainLayout = () => {
    return (


            <MealPlanProvider>
                <Sidebar/>
                <div className='content'>
                    <Outlet/>
                </div>
            </MealPlanProvider>



    )
}


export  default MainLayout