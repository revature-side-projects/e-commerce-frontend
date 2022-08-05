import React from "react"
import {useLocation} from "react-router-dom";
import Navbar from "../navbar/Narbar";

export const SearchProducts = () =>{
    const location = useLocation();

    return(
        <>
        <Navbar/>
        <h1>
            Test
        </h1>
        <p>{new URLSearchParams(location.search).get('keyword')}</p>
        </>

    )
}