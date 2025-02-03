
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
import {ForgotPassword} from "./components/ForgotPassword.jsx";
import {ResetPassword} from "./components/ResetPassword.jsx";

function App() {

  return (
      <UserProvider>
          <BrowserRouter>
                <Routes>

                    <Route element={<PrivateRouteLayout />}>

                        <Route path = '/app'  element={<MainLayout/>} >
                            <Route index element={<MealPlanner/>}/>
                            <Route path='recipes' element={<Discover/>}/>
                            <Route path='favorites' element={<ResetPassword/>}/>
                            <Route path='settings' element={<Account/>}/>
                            <Route path='recipes/:id' element={<RecipePage/>}/>

                        </Route>
                       
                    </Route>
                    <Route path = '/'  element={<OfflineLayout/>} >
                        <Route path='register' element={<Register/>}/>
                        <Route path='login' element={<Login/>}/>
                        <Route path='forgotpass' element={<ForgotPassword/>}/>
                        <Route path='resetpass' element={<ResetPassword/>}/>


                    </Route>



                    <Route path='*' element={<NotFound/>} />
                </Routes>


          </BrowserRouter>
      </UserProvider>


  )
}

export default App
