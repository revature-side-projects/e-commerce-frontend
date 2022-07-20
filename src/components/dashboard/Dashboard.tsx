import { Box, Button, ButtonGroup, Container, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Cart } from "../cart/Cart";
import { ClassNames } from "@emotion/react";
import { Co2Sharp } from "@mui/icons-material";
import { UserLoggedIn } from "../../models/user";
import { Hidden } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import styled from "styled-components";
import { UserCredentials } from "./UserCredentials";


export default function Dashboard() {
  
/* Sets current user or admin credentials */
    let [user, setUser] = useState <UserLoggedIn>({
      userId: 0,
      firstName: 'Joe',
      lastName: 'Luna',
      email: '',
      password: '',
      roleId: 1,
      isLoggedIn: true
    });

/* This method will be used to create & store an error message and display it later if needed. */
    let [errorMsg, setErrorMsg] = useState('');

/* This const along with the handleChange function below will be used to store a user's email and/or password. */
    const [updateData, setUpdateData] = useState <UserCredentials>({
      newEmail: '',
      newPassword:'',
      currentPassword: ''    
    });

    function handleChange(e: SyntheticEvent) {
      const { name, value } = (e.target as HTMLInputElement);
      setUpdateData({...updateData, [name]: value});
  }

/*
* The update method first validates if a user's password matches their current password, or if email and/password 
* fields are empty. If so, an error message will display informing the user of an invalid entry. 
* If user password is correct and either field contains input, the update function will update the user's credentials.
*/
  let update = async (e: SyntheticEvent) => {
    const { newEmail, newPassword, currentPassword } = updateData;

    if (!currentPassword || (!newPassword && !newEmail)) {
        errorMsg = 'Invalid entry. Please try again.';
        return;
    }

    try {
      let resp = await authenticate({currentPassword});
      
      if (resp.status === 400) {
        setErrorMsg('Invalid request. Please try again.')
      }
      if (resp.status === 401) {
        setErrorMsg('Invalid password. Please try again.')
      }
      if (resp.status === 200) {
        if (newEmail !== null) {
          user.email = newEmail;
        }
        if (newPassword !== null) {
          user.email = newPassword;
        }
        user.email = newEmail;
        user.password = newPassword;
      }
    } catch (e: any) {
        setErrorMsg('There was an error communicating with the backend');
    }
    
    console.log('You\'ve successfully updated your info!');
  }

/*
*  Dashboard is rendered depending on user (guest, user or admin) that is/isn't logged in
*  If user is a guest, they will only see a "cart" option
*  If user is registered & logged in, they will see "profile", "cart", and "order history" options
*/
    return(<>
            
            {!user.isLoggedIn || user.roleId > 2
              ? <div className="dashboard">
                  <div className="header"><h1>Welcome, Guest!</h1></div>
                  <div className="sidebar">
                    <div><Link to='/cart'><ShoppingCartOutlinedIcon/>Cart</Link></div>
                  </div>
                  <div className="mainDash">
                  </div>
                </div>
              : <div className="dashboard">
                  <div className="header"><h1>Welcome, {user.firstName}!</h1></div>
                      <div className="sidebar">
                          <div><Link to='/dashboard'><AccountCircleIcon/>Profile</Link></div>
                          <div><Link to='/cart'><ShoppingCartOutlinedIcon/>Cart</Link></div>
                      </div>
                      <div className="mainDash">
                        <fieldset>
                            <div className="update-container">
                            <div className="form=floating">
                                Update Email:
                                <input type="text" className="form-control" name="email" maxLength={50} onChange={handleChange}/>
                            </div>
                            <div className="form=floating">
                                Update Password:
                                <input type="text" className="form-control" name="new-password" maxLength={30} onChange={handleChange}/>
                            </div>
                            <div className="form=floating">
                                Current Password:
                                <input type="text" className="form-control" name="current-password" maxLength={30} required onChange={handleChange}/>
                                <div><button name="reg-button" onClick={update}>Submit</button></div>
                            </div>
                            </div>
                        </fieldset>
                      </div>
                </div>
            }
            
          </>)
              
  }