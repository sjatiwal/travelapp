import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TableProps, RowData} from '../helper/type';

function Table({header, rows, deleteHandler}: TableProps) {
  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            {header.map(item => {
              return (
                <Text key={item.name} style={styles.headerCell}>
                  {item.name}
                </Text>
              );
            })}
          </View>
          {rows.map(data => {
            return (
              <View key={data.action} style={styles.tableRows}>
                {header.map(item => {
                  return (
                    <React.Fragment key={item.data + data.action}>
                      {item.data !== 'action' ? (
                        <Text style={styles.rowCell}>
                          {data[item.data as keyof RowData]}
                        </Text>
                      ) : (
                        <View style={styles.rowButtonCell}>
                          <TouchableOpacity
                            onPress={() =>
                              deleteHandler(data[item.data as keyof RowData])
                            }
                            style={styles.deleteButton}>
                            <Text style={styles.deleteText}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </React.Fragment>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  table: {
    alignItems: 'center',
    marginTop: 10,
    padding: 4,
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  tableRows: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: -2,
  },
  headerCell: {
    borderWidth: 2,
    borderColor: 'black',
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 3,
    marginLeft: -2,
    color: 'black',
    fontSize: 17,
    fontWeight: '700',
    width: 170,
  },
  rowCell: {
    borderWidth: 2,
    borderColor: 'black',
    textAlign: 'center',
    color: '#000000',
    paddingVertical: 10,
    marginLeft: -2,
    width: 170,
  },
  rowButtonCell: {
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    paddingVertical: 10,
    marginLeft: -2,
    width: 170,
  },
  deleteButton: {
    width: 100,
    backgroundColor: '#f56942',
    borderRadius: 5,
  },
  deleteText: {
    textAlign: 'center',
    paddingVertical: 5,
    color: '#FFFFFF',
  },
});

export default Table;
