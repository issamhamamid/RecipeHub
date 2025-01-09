
import Header from "./components/Header.jsx";
import {BrowserRouter , Route , Routes} from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";

function App() {


  return (
      <BrowserRouter>
        <Routes>
            <Route path = '/app' element={<MainLayout/>} >
                <Route path='test' element={<div>
                    <h1 className='content'>tesvgbfvgfgf </h1>




                </div>}/>

            </Route>

        </Routes>


      </BrowserRouter>


  )
}

export default App
