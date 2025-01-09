import {Outlet} from "react-router-dom";
import Header from "../components/Header.jsx";

export const OfflineLayout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
        </>

    )
}