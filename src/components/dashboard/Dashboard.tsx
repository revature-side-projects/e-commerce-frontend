import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserCredentials } from "./UserCredentials";
import { useAppSelector } from "../../store/hooks";
import { UserState, currentUser } from "../../store/userSlice";


export default function Dashboard() {

  // Retrieves user from redux
  const user: UserState = useAppSelector(currentUser);


  /* This method will be used to create & store an error message and display it later if needed. */
  let [errorMsg, setErrorMsg] = useState('');

  /* This const along with the handleChange function below will be used to store a user's email and/or password. */
  const [updateData, setUpdateData] = useState<UserCredentials>({
    newEmail: '',
    newPassword: '',
    currentPassword: ''
  });

  function handleChange(e: SyntheticEvent) {
    const { name, value } = (e.target as HTMLInputElement);
    setUpdateData({ ...updateData, [name]: value });
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
      let resp = await authenticate({ currentPassword });

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
  if (user.id === 0) {
    return (
      <Navigate to="/login" />
    );
  }

  return (
    <>

      <div className="dashboard">
        <div><h1>Welcome, {user.firstName}!</h1></div>
        <fieldset>
          <div className="update-container">
            <div >
              Update First Name:
              <input type="text" name="email" maxLength={50} onChange={handleChange} />
            </div>
            <div >
              Update Last Name:
              <input type="text" name="email" maxLength={50} onChange={handleChange} />
            </div>
            <div >
              Update Email:
              <input type="text" name="email" maxLength={50} onChange={handleChange} />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div >
            Update Password:
            <input type="text" name="new-password" maxLength={30} onChange={handleChange} />
          </div>
          <div >
            Current Password:
            <input type="text" name="current-password" maxLength={30} required onChange={handleChange} />
            <div><button name="reg-button" onClick={update}>Submit</button></div>
          </div>
        </fieldset>
      </div>


    </>
  )
}