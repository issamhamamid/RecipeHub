
import Header from "./components/Header.jsx";
import {BrowserRouter , Route , Routes} from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";

function App() {


  return (
      <BrowserRouter>
        <Routes>
            <Route path = '/app'  element={<MainLayout/>} >
                <Route path='recipes' element={<div>fgf</div>}/>
                <Route path='recipes' element={<div>fgf</div>}/>
                <Route path='favorites' element={<div>fgf</div>}/>
                <Route path='settings' element={<div>fgf</div>}/>

            </Route>

        </Routes>


      </BrowserRouter>


  )
}

export default App
