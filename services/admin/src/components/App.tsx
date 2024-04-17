import React from "react";
import { Outlet } from "react-router-dom";


export const App = () => {
    return (
        <>
       <div>ADMIN MODULE</div>
       <Outlet />
        </>
        
    )
}