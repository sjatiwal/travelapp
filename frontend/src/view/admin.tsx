import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useState, useEffect} from 'react';
import {
  getAllUsers,
  getAllSuggestions,
  getAllTravelDetails,
  deleteUser,
  deleteSuggestion,
  deleteTravelDetails,
} from '../actions/adminAction';
import {useAppDispatch} from '../helper/hooks';
import Table from '../components/table';
import {useAppSelector} from '../helper/hooks';
import {RowData} from '../helper/type';
import {DELETE_ADMIN_RESET} from '../constants/adminConstant';
import {TravelDetails, Suggestion, User} from '../helper/type';

const Admin: React.FC = () => {
  const dispatch = useAppDispatch();
  const {users} = useAppSelector(state => state.users);
  const {suggestions} = useAppSelector(state => state.suggestions);
  const {traveldetails} = useAppSelector(state => state.allTraveldetails);
  const {isDeleted}: {isDeleted?: boolean} = useAppSelector(
    state => state.deletedByAdmin,
  );

  const [showTable, setShowTable] = useState('0');
  const handleUserData = () => {
    dispatch(getAllUsers());
    setShowTable('1');
  };
  const handelSuggestionData = () => {
    dispatch(getAllSuggestions());
    setShowTable('2');
  };
  const handleTravelDetailsData = () => {
    dispatch(getAllTravelDetails());
    setShowTable('3');
  };

  useEffect(() => {
    if (isDeleted) {
      dispatch(getAllUsers());
      dispatch(getAllSuggestions());
      dispatch(getAllTravelDetails());
      dispatch({type: DELETE_ADMIN_RESET});
    }
  }, [isDeleted]);

  const handleDeleteUser = (id: string | undefined) => {
    if (id) {
      dispatch(deleteUser(id));
    }
  };
  const handelDeleteSuggestion = (id: string | undefined) => {
    if (id) {
      dispatch(deleteSuggestion(id));
    }
  };
  const handleDeleteTravelDetails = (id: string | undefined) => {
    if (id) {
      dispatch(deleteTravelDetails(id));
    }
  };

  const header1 = [
    {
      name: 'Name',
      data: 'username',
    },
    {
      name: 'Email',
      data: 'email',
    },
    {
      name: 'Phone No',
      data: 'phoneNo',
    },
    {
      name: 'Role',
      data: 'userrole',
    },
    {
      name: 'Action',
      data: 'action',
    },
  ];

  const rows1: RowData[] = [];

  users &&
    (users as User[]).forEach((item: RowData) => {
      rows1.push({
        username: item.username,
        email: item.email,
        phoneNo: item.phoneNo,
        userrole: item.userrole,
        action: item.user_id,
      });
    });

  const header2 = [
    {
      name: 'Name',
      data: 'name',
    },
    {
      name: 'Suggestion',
      data: 'message',
    },
    {
      name: 'Action',
      data: 'action',
    },
  ];
  const rows2: RowData[] = [];

  suggestions &&
    (suggestions as Suggestion[]).forEach((item: RowData) => {
      rows2.push({
        name: item.name,
        message: item.message,
        action: item.suggestion_id,
      });
    });
  const header3 = [
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

  const rows3: RowData[] = [];

  traveldetails &&
    (traveldetails as TravelDetails[]).forEach((item: RowData) => {
      rows3.push({
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
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Admin</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUserData}>
          <Text style={styles.buttontxt}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handelSuggestionData}>
          <Text style={styles.buttontxt}>Suggestion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleTravelDetailsData}>
          <Text style={styles.buttontxt}>TravelDetails</Text>
        </TouchableOpacity>
      </View>
      <View>
        {showTable === '1' && users && (users as User[]).length > 0 && (
          <Table
            header={header1}
            rows={rows1}
            deleteHandler={handleDeleteUser}
          />
        )}
        {showTable === '1' && (users as User[]).length === 0 && (
          <View style={styles.noData}>
            <Text style={styles.noDataText}>"No User Register"</Text>
          </View>
        )}
        {showTable === '2' &&
          suggestions &&
          (suggestions as Suggestion[]).length > 0 && (
            <Table
              header={header2}
              rows={rows2}
              deleteHandler={handelDeleteSuggestion}
            />
          )}
        {showTable === '2' && (suggestions as Suggestion[]).length === 0 && (
          <View style={styles.noData}>
            <Text style={styles.noDataText}>"No Suggestion"</Text>
          </View>
        )}
        {showTable === '3' &&
          traveldetails &&
          (traveldetails as TravelDetails[]).length > 0 && (
            <Table
              header={header3}
              rows={rows3}
              deleteHandler={handleDeleteTravelDetails}
            />
          )}
        {showTable === '3' &&
          traveldetails &&
          (traveldetails as TravelDetails[]).length === 0 && (
            <View style={styles.noData}>
              <Text style={styles.noDataText}>"No Trip Booked"</Text>
            </View>
          )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    backgroundColor: '#eb7734',
  },
  headingText: {
    textAlign: 'center',
    fontSize: 28,
    color: '#000000',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#eb7734',
    width: 100,
    borderRadius: 10,
  },
  buttontxt: {
    textAlign: 'center',
    color: '#000000',
    paddingVertical: 5,
    fontWeight: '500',
  },
  noData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 100,
  },
  noDataText: {
    color: 'red',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default Admin;
