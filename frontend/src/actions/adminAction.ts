import {
  GET_ALLUSERS_REQUEST,
  GET_ALLUSERS_SUCCESS,
  GET_ALLUSERS_FAIL,
  GET_SUGGESTION_REQUEST,
  GET_SUGGESTION_SUCCESS,
  GET_SUGGESTION_FAIL,
  GET_TRAVELDETAILS_REQUEST,
  GET_TRAVELDETAILS_SUCCESS,
  GET_TRAVELDETAILS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_SUGGESTION_REQUEST,
  DELETE_SUGGESTION_SUCCESS,
  DELETE_SUGGESTION_FAIL,
  DELETE_TRAVELDETAILS_REQUEST,
  DELETE_TRAVELDETAILS_SUCCESS,
  DELETE_TRAVELDETAILS_FAIL,
} from '../constants/adminConstant';
import backend from '../helper/axios';
import {
  UserAction,
  SuggestionAction,
  BookingAction,
  DeleteAction,
} from '../helper/type';

// Get All Users
export const getAllUsers =
  () => async (dispatch: ({type, payload}: UserAction) => void) => {
    try {
      dispatch({type: GET_ALLUSERS_REQUEST, payload: 'Loading....'});

      const {data} = await backend.get('/api/v1/admin/getallusers');

      dispatch({type: GET_ALLUSERS_SUCCESS, payload: data.users});
    } catch (error: any) {
      dispatch({type: GET_ALLUSERS_FAIL, payload: error.message});
    }
  };

// Get ALL Suggestions
export const getAllSuggestions =
  () => async (dispatch: ({type, payload}: SuggestionAction) => void) => {
    try {
      dispatch({type: GET_SUGGESTION_REQUEST, payload: 'Loading....'});

      const {data} = await backend.get('/api/v1/admin/getallsuggestions');

      dispatch({type: GET_SUGGESTION_SUCCESS, payload: data.suggestions});
    } catch (error: any) {
      dispatch({type: GET_SUGGESTION_FAIL, payload: error.message});
    }
  };

// Get All Travel Details
export const getAllTravelDetails =
  () => async (dispatch: ({type, payload}: BookingAction) => void) => {
    try {
      dispatch({type: GET_TRAVELDETAILS_REQUEST, payload: 'Loading....'});

      const {data} = await backend.get('/api/v1/admin/getalltraveldetails');

      dispatch({type: GET_TRAVELDETAILS_SUCCESS, payload: data.travelDetails});
    } catch (error: any) {
      dispatch({type: GET_TRAVELDETAILS_FAIL, payload: error.message});
    }
  };

// Delete User
export const deleteUser =
  (id: string) => async (dispatch: ({type, payload}: DeleteAction) => void) => {
    try {
      dispatch({type: DELETE_USER_REQUEST, payload: 'Loading...'});
      const {data} = await backend.delete(`/api/v1/admin/deleteuser/${id}`);
      dispatch({type: DELETE_USER_SUCCESS, payload: data});
    } catch (error: any) {
      dispatch({type: DELETE_USER_FAIL, payload: error.message});
    }
  };

// Delete Suggestion
export const deleteSuggestion =
  (id: string) => async (dispatch: ({type, payload}: DeleteAction) => void) => {
    try {
      dispatch({type: DELETE_SUGGESTION_REQUEST, payload: 'Loading...'});
      const {data} = await backend.delete(
        `/api/v1/admin/deletesuggestion/${id}`,
      );
      dispatch({type: DELETE_SUGGESTION_SUCCESS, payload: data});
    } catch (error: any) {
      dispatch({type: DELETE_SUGGESTION_FAIL, payload: error.message});
    }
  };

// Delete TravelDetails
export const deleteTravelDetails =
  (id: string) => async (dispatch: ({type, payload}: DeleteAction) => void) => {
    try {
      dispatch({type: DELETE_TRAVELDETAILS_REQUEST, payload: 'Loading...'});
      const {data} = await backend.delete(
        `/api/v1/admin/deletetraveldetail/${id}`,
      );
      dispatch({type: DELETE_TRAVELDETAILS_SUCCESS, payload: data});
    } catch (error: any) {
      dispatch({type: DELETE_TRAVELDETAILS_FAIL, payload: error.message});
    }
  };
