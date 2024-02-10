import {
  CREATE_TRAVEL_REQUEST,
  CREATE_TRAVEL_SUCCESS,
  CREATE_TRAVEL_FAIL,
  GET_TRAVELDETAILS_REQUEST,
  GET_TRAVELDETAILS_SUCCESS,
  GET_TRAVELDETAILS_FAIL,
  DELETE_TRAVELDETAILS_REQUEST,
  DELETE_TRAVELDETAILS_SUCCESS,
  DELETE_TRAVELDETAILS_FAIL,
} from '../constants/travelConstant';
import backend from '../helper/axios';
import {BookingAction, BookingDetails} from '../helper/type';

export const savebookingDetails =
  (data: BookingDetails) =>
  async (dispatch: ({type, payload}: BookingAction) => void) => {
    dispatch({
      type: 'SAVE_BOKING_DETAILS',
      payload: data,
    });
  };

// New Travel Details
export const confirmTravelDetails =
  (traveldetalis: BookingDetails) =>
  async (dispatch: ({type, payload}: BookingAction) => void) => {
    try {
      dispatch({type: CREATE_TRAVEL_REQUEST, payload: 'Processing...'});
      const config = {
        headers: {'content-Type': 'application/json'},
      };
      const {data} = await backend.post(
        '/api/v1/travel/new',
        traveldetalis,
        config,
      );

      dispatch({type: CREATE_TRAVEL_SUCCESS, payload: data});
    } catch (error: any) {
      dispatch({
        type: CREATE_TRAVEL_FAIL,
        payload: error.message,
      });
    }
  };

// Get Travel Detais
export const getTravelDetailAction =
  () => async (dispatch: ({type, payload}: BookingAction) => void) => {
    try {
      dispatch({type: GET_TRAVELDETAILS_REQUEST, payload: 'Loading...'});

      const {data} = await backend.get('/api/v1/traveldetails');
      dispatch({type: GET_TRAVELDETAILS_SUCCESS, payload: data.travelDetails});
    } catch (error: any) {
      dispatch({
        type: GET_TRAVELDETAILS_FAIL,
        payload: error.message,
      });
    }
  };

// Detlete travel detsils
export const deleteTravelDetails =
  (id: string) =>
  async (dispatch: ({type, payload}: BookingAction) => void) => {
    try {
      dispatch({type: DELETE_TRAVELDETAILS_REQUEST, payload: 'Delete Req...'});

      const {data} = await backend.delete(`/api/v1/traveldetails/user/${id}`);

      dispatch({type: DELETE_TRAVELDETAILS_SUCCESS, payload: data.message});
    } catch (error: any) {
      dispatch({
        type: DELETE_TRAVELDETAILS_FAIL,
        payload: error.message,
      });
    }
  };
