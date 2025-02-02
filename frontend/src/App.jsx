
import {BrowserRouter , Route , Routes} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout.jsx";
import {OfflineLayout} from "./Layouts/OfflineLayout.jsx";
import {Register} from "./components/Register.jsx";
import {Login} from './components/Login.jsx'
import {UserProvider} from "./components/UserProvider.jsx";
import PrivateRouteLayout from "./Layouts/PrivateRouteLayout.jsx";
import {Discover} from "./components/Discover.jsx";

import {RecipePage} from "./components/RecipePage.jsx";
import {DayJs} from "./components/DayJs.jsx";
import {MealPlanner} from "./components/MealPlanner.jsx";
import {Account} from "./components/Account.jsx";
import {MealPlanProvider} from "./components/MealPlanProvider.jsx";
import {NotFound} from "./components/NotFound.jsx";

function App() {

  return (
      <UserProvider>
          <BrowserRouter>
                <Routes>

                    <Route element={<PrivateRouteLayout />}>

                        <Route path = '/app'  element={<MainLayout/>} >
                            <Route index element={<MealPlanner/>}/>
                            <Route path='recipes' element={<Discover/>}/>
                            <Route path='favorites' element={<NotFound/>}/>
                            <Route path='settings' element={<Account/>}/>
                            <Route path='recipes/:id' element={<RecipePage/>}/>

                        </Route>
                       
                    </Route>
                    <Route path = '/'  element={<OfflineLayout/>} >
                        <Route path='register' element={<Register/>}/>
                        <Route path='login' element={<Login/>}/>


                    </Route>



                    <Route path='*' element={<NotFound/>} />
                </Routes>


          </BrowserRouter>
      </UserProvider>


  )
}

export default App
