import { v4 as uuidv4 } from 'uuid';

// Redux
import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

// Types
import { 
  IReduxStore__User
} from '../../types/';



const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    request: {
      pending: false,
      success: false,
      failed: false,
    }
  } as IReduxStore__User,
  reducers: {
    loginRequest: (state) => {
      state.request = {
        pending: true,
        success: false,
        failed: false,
      }
    },
    loginRequestSuccess: (state, action: PayloadAction<{accessToken?: string, refreshToken?: string, email: string, name: string}>) => {
      state.data = {
        id: uuidv4(),
        name: action.payload.name,
        email: action.payload.email,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      }
      state.request = {
        pending: false,
        success: true,
        failed: false
      }
    },
    loginRequestFailed: (state) => {
      state.request = {
        pending: false,
        success: false,
        failed: true,
      }
    },

    registerRequest: (state) => {
      state.request = {
        pending: true,
        success: false,
        failed: false,
      }
    },
    registerRequestSuccess: (state, action: PayloadAction<{accessToken: string, refreshToken: string, email: string, name: string}>) => {
      state.data = {
        id: uuidv4(),
        name: action.payload.name,
        email: action.payload.email,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      }
      state.request ={
        pending: false,
        success: true,
        failed: false
      }
    },
    registerRequestFailed: (state) => {
      state.request = {
        pending: false,
        success: false,
        failed: true,
      }
    },

    changeUserDataRequest: (state) => {
      state.request = {
        pending: true,
        success: false,
        failed: false,
      }
    },
    changeUserDataRequestSuccess: (state, action: PayloadAction<{email: string, name: string}>) => {
      state.data = {
        ...state.data,
        name: action.payload.name,
        email: action.payload.email,
      }

      state.request = {
        pending: false,
        success: true,
        failed: false
      }
    },
    changeUserDataRequestFailed: (state) => {
      state.request = {
        pending: false,
        success: false,
        failed: true,
      }
    },

    resetPasswordRequest: (state) => {
      state.request = {
        pending: true,
        success: false,
        failed: false,
      }
    },
    resetPasswordRequestSuccess: (state) => {
      state.request = {
        pending: false,
        success: false,
        failed: false
      }
    },
    resetPasswordRequestFailed: (state) => {
      state.request = {
        pending: false,
        success: false,
        failed: true,
      }
    },

    logoutRequest: (state) => {
      state.request = {
        pending: true,
        success: false,
        failed: false,
      }
    },
    logoutRequestSuccess: (state) => {
      state.data = {};
      
      state.request = {
        pending: false,
        success: false,
        failed: false
      }
    },
    logoutRequestFailed: (state) => {
      state.request = {
        pending: false,
        success: false,
        failed: true,
      }
    },
    
    moveRequestToDefault: (state) => {
      state.request = {
        pending: false,
        success: false,
        failed: false,
      }
    }
  },
});


// Extract the action creators object and the reducer
const { actions, reducer } = userSlice
// Extract and export each action creator by name
export const {
  loginRequest,
  loginRequestSuccess,
  loginRequestFailed,

  registerRequest,
  registerRequestSuccess,
  registerRequestFailed,

  changeUserDataRequest,
  changeUserDataRequestSuccess,
  changeUserDataRequestFailed,

  resetPasswordRequest,
  resetPasswordRequestSuccess,
  resetPasswordRequestFailed,

  logoutRequest,
  logoutRequestSuccess,
  logoutRequestFailed,
  
  moveRequestToDefault
} = actions;
// Export the reducer, either as a default or named export
export default reducer