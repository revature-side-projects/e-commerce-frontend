import { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ResetRequest } from '../../models/ResetRequest';
import { useAppSelector } from '../../store/hooks';
import { UserState, currentUser } from '../../store/userSlice';


export const Dashboard = () => {
  // Retrieves user from redux
  const user: UserState = useAppSelector(currentUser);

  /* This method will be used to create & store an error message and display it later if needed. */
  // let [errorMsg, setErrorMsg] = useState('');

  /**
   * This const along with the handleChange function below will be used to store a user's email and/or password.
   */

  const [updateData, setUpdateData] = useState<ResetRequest>({
    newFirstName: '',
    newLastName: '',
    newEmail: '',
    newPassword: '',
    currentPassword: '',
  });

  /**
   * Handles how the user is to be changed.
   *
   * @param {SyntheticEvent} e The event that handles the change. 
   */
  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setUpdateData({ ...updateData, [name]: value });
  };


  /**
   * The update method first validates if a user's password matches their current password, or if email and/password
   * fields are empty. If so, an error message will display informing the user of an invalid entry.
   * If user password is correct and either field contains input, the update function will update the user's credentials.
   *
   * @param {SyntheticEvent} e The event that handles the update. 
   * @returns React element
   */

  let update = async (e: SyntheticEvent) => {
    console.log(e);
    // const { newFirstName, newLastName, newEmail, newPassword, currentPassword } = updateData;

    // if (!currentPassword || (!newPassword && !newEmail)) {
    //   setErrorMsg('Invalid entry. Please try again.');
    //   return;
    // }

  };

  /*
   *  Dashboard is rendered depending on user (guest, user or admin) that is/isn't logged in
   *  If user is a guest, they will only see a "cart" option
   *  If user is registered & logged in, they will see "profile", "cart", and "order history" options
   */
  if (user.id === 0) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <div className='dashboard'>
        <div>
          <h1>Welcome, {user.firstName}!</h1>
        </div>
        <fieldset>
          <div className='update-container'>
            <div>
              Update First Name:
              <input
                type='text'
                name='email'
                maxLength={50}
                onChange={handleChange}
              />
            </div>
            <div>
              Update Last Name:
              <input
                type='text'
                name='email'
                maxLength={50}
                onChange={handleChange}
              />
            </div>
            <div>
              Update Email:
              <input
                type='text'
                name='email'
                maxLength={50}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div>
            Update Password:
            <input
              type='text'
              name='new-password'
              maxLength={30}
              onChange={handleChange}
            />
          </div>
          <div>
            Current Password:
            <input
              type='text'
              name='current-password'
              maxLength={30}
              required
              onChange={handleChange}
            />
            <div>
              <button name='reg-button' onClick={update}>
                Submit
              </button>
            </div>
          </div>
        </fieldset>
      </div>
    </>
  );
};
