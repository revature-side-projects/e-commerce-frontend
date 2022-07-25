import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// setup user interface to match response object
export interface UserState {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    token: string;
}

// setup of initial state to show before change
const initialState: UserState = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    token: '',
};

/* userslice is the main method functionality for creating state and changing it.
it takes is a name parameter, initialstate which shows the change to new state, and reducers which is an object of all the methods that alter state and their logic. 
Adding methods in the reducers object also automatically creates an action creator which is used to initiate state changes on the UI. 
*/
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.token = action.payload.token;
        },
    },
});

// we export the reducers action creators to allow for them to be used on the UI
export const { updateUser } = userSlice.actions;
export const currentUser = (state: RootState) => state.user;
// export that is used in the store
export default userSlice.reducer;
