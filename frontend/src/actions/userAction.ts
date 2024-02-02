import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from '../constants/userConstant';
import backend from '../helper/axios';

// LOGIN USER
export const loginUser =
  (loginEmail: string, loginPassword: string) =>
  async (dispatch: (arg0: {type: string; payload: string}) => void) => {
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
    } catch (error) {
      dispatch({type: LOGIN_FAIL, payload: 'Invalid Email or Password'});
    }
  };

// REGISTER USER
export const registerUser =
  (
    registerName: string,
    registerEmail: string,
    registerPhoneNo: string,
    registerPassword: string,
  ) =>
  async (dispatch: (arg0: {type: string; payload: string}) => void) => {
    try {
      dispatch({
        type: REGISTER_USER_REQUEST,
        payload: 'Wait....',
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
        payload: error.response.data.message,
      });
    }
  };

// LOGOUT USER
export const logoutUser =
  () => async (dispatch: (arg0: {type: string; payload: string}) => void) => {
    try {
      await backend.get(`/api/v1/logout`);
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: 'User Logout',
      });
    } catch (error: any) {
      dispatch({type: LOGOUT_FAIL, payload: error.response.data.message});
    }
  };
