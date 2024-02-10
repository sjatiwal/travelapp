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
  DELETE_ADMIN_RESET,
} from '../constants/adminConstant';
import {
  BookingAction,
  DeleteAction,
  SuggestionAction,
  UserAction,
} from '../helper/type';

export const getAlluserReducer = (state = {users: []}, action: UserAction) => {
  switch (action.type) {
    case GET_ALLUSERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALLUSERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case GET_ALLUSERS_FAIL:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getAllSuggestionsReducer = (
  state = {suggestions: []},
  action: SuggestionAction,
) => {
  switch (action.type) {
    case GET_SUGGESTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SUGGESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        suggestions: action.payload,
      };
    case GET_SUGGESTION_FAIL:
      return {
        ...state,
        loading: false,
        suggestions: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getAllTravelDetailsReducer = (
  state = {traveldetails: []},
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
        traveldetails: action.payload,
      };
    case GET_TRAVELDETAILS_FAIL:
      return {
        ...state,
        loading: false,
        traveldetails: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export const deleteAdminReducer = (state = {}, action: DeleteAction) => {
  switch (action.type) {
    case DELETE_SUGGESTION_REQUEST:
    case DELETE_TRAVELDETAILS_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_SUGGESTION_SUCCESS:
    case DELETE_TRAVELDETAILS_SUCCESS:
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
      };
    case DELETE_ADMIN_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case DELETE_SUGGESTION_FAIL:
    case DELETE_TRAVELDETAILS_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
