
import {BrowserRouter , Route , Routes} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout.jsx";
import {OfflineLayout} from "./Layouts/OfflineLayout.jsx";
import {Register} from "./components/Register.jsx";
import {Login} from './components/Login.jsx'
import {UserProvider} from "./components/UserProvider.jsx";

function App() {


  return (
      <UserProvider>
          <BrowserRouter>
                <Routes>
                    <Route path = '/app'  element={<MainLayout/>} >
                        <Route path='recipes' element={<div>fgf</div>}/>
                        <Route path='recipes' element={<div>fgf</div>}/>
                        <Route path='favorites' element={<div>fgf</div>}/>
                        <Route path='settings' element={<div>fgf</div>}/>

                    </Route>
                    <Route path = '/'  element={<OfflineLayout/>} >
                        <Route path='register' element={<Register/>}/>
                        <Route path='login' element={<Login/>}/>


                    </Route>


                </Routes>


          </BrowserRouter>
      </UserProvider>


  )
}

export default App
