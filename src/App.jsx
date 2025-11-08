import { useState, useEffect } from "react";
import FormRegistration from "./BigComp/Note/Registration.jsx";
import FormLogin from "./BigComp/Note/Login.jsx";
import { Layout } from "./BigComp/Layout/Layout.jsx";
import { Home } from "./pages/Home.jsx";
import Exit from "./SmallComp/Exit.jsx";
import Files from "./BigComp/Files/Files.jsx";
import { NotFound } from "./pages/NoteFond.jsx";
import { AnonDownLoad } from "./pages/AnonLoadPage.jsx";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import { setALL } from "../contexts/redux/actions.js";
import Members from "./BigComp/admin_panel/member_list.jsx";

export default function App() {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')))
    const items = useSelector(state => state.user_list);
    const dispatch = useDispatch();

    useEffect(()=>{
        if (JSON.parse(sessionStorage.getItem('userToken'))) {
            dispatch(setALL(JSON.parse(sessionStorage.getItem('userToken')), JSON.parse(sessionStorage.getItem('user'))))
        }
        if (JSON.parse(localStorage.getItem('userToken')) & !JSON.parse(sessionStorage.getItem('userToken')))
            {dispatch(setALL(JSON.parse(localStorage.getItem('userToken')), JSON.parse(localStorage.getItem('user'))))}
        return
    }, [])

    const routers = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/files" element={<Files/>}/>
                <Route path="/login" element={<FormLogin />}/>
                <Route path="/registration" element={<FormRegistration />}/>
                <Route path="/exit" element={<Exit />} />
                <Route path="/file/download_anon/:loadcode" element={<AnonDownLoad />} />
                <Route path="/members" element={<Members />}/>
                <Route path="/memberfiles" element={<Files />}/>
                {/* <Route path="/memberfiles" element={<Files />}/>
                <Route path="*" element={<NotFound />} /> */}
                <Route path="*" element={<NotFound />} /> 
            </Route>
        )
    )
    return (
            <RouterProvider router={routers} />
        )
}

