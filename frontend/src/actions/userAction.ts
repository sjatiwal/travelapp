import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  MESSAGE_SENT_REQUEST,
  MESSAGE_SENT_SUCCESS,
  MESSAGE_SENT_FAIL,
} from '../constants/userConstant';
import backend from '../helper/axios';
import {
  LoginUser,
  ProfileType,
  PasswordType,
  RegisterUser,
  Suggestion,
  User,
  UserAction,
} from '../helper/type';

// LOGIN USER
export const loginUser =
  ({loginEmail, loginPassword}: LoginUser) =>
  async (dispatch: ({type, payload}: UserAction) => void) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
        payload: 'Checking for User',
      });

      const config = {headers: {'Content-Type': 'application/json'}};

      const {data} = await backend.post(
        `/api/v1/login`,
        {loginEmail, loginPassword},
        config,
      );
      dispatch({type: LOGIN_SUCCESS, payload: data.user});
    } catch (error: any) {
      dispatch({type: LOGIN_FAIL, payload: 'Invalid EmailId or Password'});
    }
  };

// REGISTER USER
export const registerUser =
  ({
    registerName,
    registerEmail,
    registerPhoneNo,
    registerPassword,
  }: RegisterUser) =>
  async (dispatch: ({type, payload}: UserAction) => void) => {
    try {
      dispatch({
        type: REGISTER_USER_REQUEST,
        payload: 'loading...',
      });
      const config = {headers: {'Content-Type': 'application/json'}};

      const {data} = await backend.post(
        `api/v1/register`,
        {registerName, registerEmail, registerPhoneNo, registerPassword},
        config,
      );
      dispatch({type: REGISTER_USER_SUCCESS, payload: data.user});
    } catch (error: any) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.message,
      });
    }
  };

// LOAD USER
export const loadUser =
  () => async (dispatch: ({type, payload}: UserAction) => void) => {
    try {
      dispatch({type: LOAD_USER_REQUEST, payload: 'Loading...'});

      const {data} = await backend.get(`/api/v1/me`);

      dispatch({type: LOAD_USER_SUCCESS, payload: data.user});
    } catch (error: any) {
      dispatch({type: LOAD_USER_FAIL, payload: error.message});
    }
  };

// LOGOUT USER
export const logoutUser =
  () => async (dispatch: ({type, payload}: UserAction) => void) => {
    try {
      const {data} = await backend.get(`/api/v1/logout`);
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: data.message,
      });
    } catch (error: any) {
      dispatch({type: LOGOUT_FAIL, payload: error.message});
    }
  };

//Change Profile
export const updateProfileAction =
  ({editedName, editedphoneNo}: ProfileType) =>
  async (dispatch: ({type, payload}: UserAction) => void) => {
    try {
      dispatch({
        type: UPDATE_PROFILE_REQUEST,
        payload: 'loading...',
      });

      const config = {headers: {'Content-Type': 'application/json'}};

      const {data} = await backend.post(
        `/api/v1/update/profile`,
        {editedName, editedphoneNo},
        config,
      );

      dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data.success});
    } catch (error: any) {
      dispatch({type: UPDATE_PROFILE_FAIL, payload: error.message});
    }
  };

//Change Password
export const updatePasswordAction =
  ({currentPassword, changedPassword}: PasswordType) =>
  async (dispatch: ({type, payload}: UserAction) => void) => {
    try {
      dispatch({
        type: CHANGE_PASSWORD_REQUEST,
        payload: 'loading...',
      });

      const config = {headers: {'Content-Type': 'application/json'}};

      const {data} = await backend.post(
        `/api/v1/changepassword`,
        {currentPassword, changedPassword},
        config,
      );
      dispatch({type: CHANGE_PASSWORD_SUCCESS, payload: data.success});
    } catch (error: any) {
      dispatch({type: CHANGE_PASSWORD_FAIL, payload: error.message});
    }
  };

// Message Sent
export const messageSentAction =
  ({name, message}: Suggestion) =>
  async (dispatch: ({type, payload}: UserAction) => void) => {
    try {
      dispatch({
        type: MESSAGE_SENT_REQUEST,
        payload: 'loading...',
      });

      const config = {headers: {'Content-Type': 'application/json'}};

      const {data} = await backend.post(
        `/api/v1/messageSent`,
        {name, message},
        config,
      );

      dispatch({type: MESSAGE_SENT_SUCCESS, payload: data.message});
    } catch (error: any) {
      dispatch({type: MESSAGE_SENT_FAIL, payload: error.message});
    }
  };
