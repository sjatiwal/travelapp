import {
  CREATE_TRAVEL_REQUEST,
  CREATE_TRAVEL_SUCCESS,
  CREATE_TRAVEL_FAIL,
} from '../constants/travelConstant';
import backend from '../helper/axios';
interface BookingDetails {
  user: {};
  location: string;
  cost: number;
  tripPackage: string;
  noOfPeople: string;
  selectedDate: string | undefined;
}
interface TravelDetails {
  location: string;
  cost: number;
  tripPackage: string;
  noOfPeople: string;
  selectedDate: string | undefined;
}
export const savebookingDetails =
  (data: BookingDetails) =>
  async (dispatch: (arg0: {type: string; payload: BookingDetails}) => void) => {
    dispatch({
      type: 'SAVE_BOKING_DETAILS',
      payload: data,
    });
  };

export const confirmTravelDetails =
  (traveldetalis: TravelDetails) =>
  async (
    dispatch: (arg0: {type: string; payload: BookingDetails | string}) => void,
  ) => {
    try {
      dispatch({type: CREATE_TRAVEL_REQUEST, payload: 'Processing'});
      const config = {
        headers: {'content-Type': 'application/json'},
      };
      const {data} = await backend.post(
        '/api/v1/travel/new',
        traveldetalis,
        config,
      );

      dispatch({type: CREATE_TRAVEL_SUCCESS, payload: data});
    } catch (error) {
      dispatch({
        type: CREATE_TRAVEL_FAIL,
        payload: 'Not Woking',
      });
    }
  };
