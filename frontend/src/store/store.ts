import {Middleware} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';

import {userReducer, updateReducer} from '../reducers/userReducer';
import {
  bookingDetailsReducer,
  getUserBookingDetailsReducer,
  deleteTravelDetailsReducer,
} from '../reducers/bookingDetailsReducer';
import {
  getAlluserReducer,
  getAllSuggestionsReducer,
  getAllTravelDetailsReducer,
  deleteAdminReducer,
} from '../reducers/adminReducer';

const rootReducer = combineReducers({
  user: userReducer,
  bookingInfo: bookingDetailsReducer,
  travelDetails: getUserBookingDetailsReducer,
  deleteTravelDetails: deleteTravelDetailsReducer,
  profile: updateReducer,
  users: getAlluserReducer,
  suggestions: getAllSuggestionsReducer,
  allTraveldetails: getAllTravelDetailsReducer,
  deletedByAdmin: deleteAdminReducer,
});

const middleWare: Middleware[] = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleWare),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
