import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React from 'react';
import Home from "./Home.tsx";
import UserForm from "./UserForm.tsx"

const AppRoutes = () => {


    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route exact path='/adduser' element={<UserForm method={'POST'}/>} />
                    <Route exact path='/update/:id' element={<UserForm method={'PATCH'}/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRoutes;