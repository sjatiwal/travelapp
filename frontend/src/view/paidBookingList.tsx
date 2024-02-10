import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useEffect, useState} from 'react';
import {DELETE_TRAVELDETAILS_RESET} from '../constants/travelConstant';
import {
  deleteTravelDetails,
  getTravelDetailAction,
} from '../actions/bookingDetailsAction';
import Table from '../components/table';
import {useAppDispatch, useAppSelector} from '../helper/hooks';
import {RowData, IsDeleted} from '../helper/type';

const PaidBookingDetails: React.FC = () => {
  const [travelDetail, setTravelDetail] = useState<RowData[]>([]);
  const [reload, setReload] = useState(false);
  const dispatch = useAppDispatch();

  const {travelDetails} = useAppSelector(state => state.travelDetails);
  const {isDeleted}: IsDeleted = useAppSelector(
    state => state.deleteTravelDetails,
  );

  useEffect(() => {
    setTravelDetail(travelDetails);
  }, [travelDetails]);

  useEffect(() => {
    dispatch(getTravelDetailAction());
    if (isDeleted) {
      dispatch({type: DELETE_TRAVELDETAILS_RESET});
    }
  }, [reload, isDeleted]);

  const handleDelete = (id: string | undefined) => {
    if (id) {
      dispatch(deleteTravelDetails(id));
      setReload(!reload);
    }
  };
  const header = [
    {
      name: 'TripPackage',
      data: 'tripPackage',
    },
    {
      name: 'Date',
      data: 'selectedDate',
    },
    {
      name: 'Location',
      data: 'location',
    },
    {
      name: 'People',
      data: 'noOfPeople',
    },
    {
      name: 'Amount',
      data: 'cost',
    },
    {
      name: 'Action',
      data: 'action',
    },
  ];

  const rows: RowData[] = [];

  travelDetail &&
    travelDetail.forEach(item => {
      rows.push({
        tripPackage: item.tripPackage,
        selectedDate: item.selectedDate,
        location: item.location,
        noOfPeople: item.noOfPeople,
        cost: item.cost,
        action: item.travel_id,
      });
    });

  return (
    <>
      <View style={styles.heading}>
        <Text style={styles.headingText}>BookingList</Text>
      </View>
      {travelDetail && travelDetail.length > 0 ? (
        <ScrollView>
          <Table header={header} rows={rows} deleteHandler={handleDelete} />
        </ScrollView>
      ) : (
        <Text style={styles.noBooking}>"No Trip Booked"</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#5d88f2',
  },
  headingText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteText: {
    color: 'black',
  },
  noBooking: {
    textAlign: 'center',
    color: 'red',
    fontSize: 24,
    marginTop: 100,
    fontWeight: '500',
  },
});

export default PaidBookingDetails;
