import {
  GET_TRAVELDETAILS_FAIL,
  GET_TRAVELDETAILS_REQUEST,
  GET_TRAVELDETAILS_SUCCESS,
  DELETE_TRAVELDETAILS_FAIL,
  DELETE_TRAVELDETAILS_REQUEST,
  DELETE_TRAVELDETAILS_SUCCESS,
  DELETE_TRAVELDETAILS_RESET,
} from '../constants/travelConstant';
import {BookingAction} from '../helper/type';

export const bookingDetailsReducer = (
  state = {bookingInfo: {}},
  action: BookingAction,
) => {
  switch (action.type) {
    case 'SAVE_BOKING_DETAILS':
      return {
        ...state,
        bookingInfo: action.payload,
      };
    default:
      return state;
  }
};

export const getUserBookingDetailsReducer = (
  state = {travelDetails: []},
  action: BookingAction,
) => {
  switch (action.type) {
    case GET_TRAVELDETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TRAVELDETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        travelDetails: action.payload,
      };
    case GET_TRAVELDETAILS_FAIL:
      return {
        ...state,
        travelDetails: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteTravelDetailsReducer = (
  state = {},
  action: BookingAction,
) => {
  switch (action.type) {
    case DELETE_TRAVELDETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TRAVELDETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
      };
    case DELETE_TRAVELDETAILS_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case DELETE_TRAVELDETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
