import React from "react"
import {useLocation} from "react-router-dom";
import Navbar from "../navbar/Narbar";
import { Box } from "@mui/material";

export const SearchProducts = () =>{
    const location = useLocation();

    return(
        <>
        <Navbar/>
        <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
            <h1>
                Test
            </h1>
            <p>{new URLSearchParams(location.search).get('keyword')}</p>
        </Box>
        </>

    )
}