import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

type HeaderItem = {
  name: string;
  data: string;
};

type RowData = {
  tripPackage: string;
  selectedDate: string;
  location: string;
  noOfPeople: string;
  cost: string;
};

type TableProps = {
  header: HeaderItem[];
  rows: RowData[];
};
function Table({header, rows}: TableProps) {
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
          {rows.map((data, index) => {
            return (
              <View key={index} style={styles.tableRows}>
                {header.map(item => {
                  return (
                    <Text key={item.data} style={styles.rowCell}>
                      {data[item.data as keyof RowData]}
                    </Text>
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
    paddingVertical: 10,
    marginLeft: -2,
    width: 170,
  },
});

export default Table;
