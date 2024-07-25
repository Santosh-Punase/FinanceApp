import React from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
// import { getCalendars } from 'expo-localization';

import { HEIGHT, WIDTH } from '../../constants/Layout';
import { Text, View } from '../Themed';
import { Card } from '../Card';
// import { dummyData } from './dummyData';
import { Transaction, TRANSACTION_TYPE } from '../../store/type';
import { NoRecord } from '../NoRecord';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { AddEntryFooter } from '../AddEntryFooter';
import { ListLoading } from '../LoadingSkeleton';

const DEFAULT_LIST_HEIGHT = HEIGHT - 190;

type TransactionListProps = {
  list: Transaction[]
  isFilterSelected?: boolean;
  loadMore?: () => void;
  listHeight?: number;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  clearAllFilters?: () => void;
  navigation?: NativeStackNavigatorProps;
}

export default function TransactionList({ isFilterSelected, clearAllFilters, list, isLoading = false, listHeight, navigation, loadMore, isLoadingMore = false } : TransactionListProps) {

  if (isLoading && !isLoadingMore) {
    return (
      <ScrollView style={{ width: WIDTH, minHeight: listHeight || DEFAULT_LIST_HEIGHT, paddingBottom: 200 }}>
        <View style={{ minHeight: listHeight || DEFAULT_LIST_HEIGHT + 10 }}>
          <ListLoading />
        </View>
      </ScrollView>  
    )
  };

  if (!isLoading && list.length === 0) {
    return (
      <>
        <View style={{ width: WIDTH, minHeight: listHeight || DEFAULT_LIST_HEIGHT + 10 }}>
          { isFilterSelected ? 
            <NoRecord
              header={'No Transactions Found'}
              subHeader={'Try removing filters'}
              onCancel={() => clearAllFilters?.()}
            />
            : <NoRecord
              header={'No Transactions Yet'}
              subHeader={'Add Transactions to get started'}
            />
          }
        </View>
        <AddEntryFooter navigation={navigation} />
      </>
    )
  };

  return (
    <>
      <FlatList
        style={{ minHeight: listHeight || DEFAULT_LIST_HEIGHT }}
        data={list}
        keyExtractor={(item, i) => `${item.date}_${i}`}
        renderItem={({ item, index }) => {
          return (
            <Card style={[styles.listItem, !isLoading && index === list.length - 1 ? { paddingBottom: 80 } : { }]}>
              <View style={styles.listItemWrapper}>
                <View style={styles.transactionDetails}>
                  {item.remark && <Text>{item.remark}</Text>}
                  <View style={styles.listItemRow_1}>
                    {item.category && (
                      <View lightColor='rgba(44, 44, 214, 0.2)' darkColor='rgba(199, 10, 130, 0.3)' style={{ marginRight: 10, borderRadius: 8 }}>
                        <Text style={styles.category} lightColor='rgba(44, 44, 214, 1)' darkColor='rgba(255, 255, 255, 0.7)'>{item.category.name || 'No Category'}</Text>
                        {/* <Text style={styles.category} lightColor='rgba(44, 44, 214, 1)' darkColor='rgba(199, 10, 130, 1)'>{item.category}</Text> */}
                      </View>
                    )}
                    {item.paymentMode && (
                      <View lightColor='rgba(79, 79, 79, 0.2)' darkColor='rgba(212, 112, 10, 0.3)' style={{ borderRadius: 8 }}>
                        <Text style={styles.paymentMode} lightColor='rgba(79, 79, 79, 1)' darkColor='rgba(255, 255, 255, 0.7)'>{item.paymentMode.name || 'No Payment Mode'}</Text>
                        {/* <Text style={styles.paymentMode} lightColor='rgba(79, 79, 79, 1)' darkColor='rgba(212, 112, 10, 1)'>{item.paymentMode}</Text> */}
                      </View>
                    )}
                  </View>
                  <Text style={styles.transactionTime}>{`${dayjs(item.date).format(`DD-MMM-YYYY | HH:mm`)}`}</Text>
                  {/* <Text style={styles.transactionTime}>{`${dayjs(item.createdAt).format(`DD-MMM-YYYY | ${ getCalendars()[0].uses24hourClock ? 'HH:mm' : 'h:mm A'}`)}`}</Text> */}
                </View>
                <View style={styles.amount}>
                  {item.type === TRANSACTION_TYPE.INCOME && <Text style={styles.credit}>{item.amount}</Text>}
                  {item.type === TRANSACTION_TYPE.EXPENSE && <Text style={styles.debit}>{item.amount}</Text>}
                </View>
              </View>
            </Card>
          )
        }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
      { isLoading && isLoadingMore && (
        <View style={{ width: WIDTH, minHeight: listHeight || DEFAULT_LIST_HEIGHT + 10 }}>
          <ListLoading />
        </View>
      )}
      <AddEntryFooter navigation={navigation} />
    </>
  );
}

const styles = StyleSheet.create({
  credit: {
    fontSize: 16,
    color: 'green',
    paddingBottom: 3,
  },
  debit: {
    fontSize: 16,
    paddingBottom: 3,
    color: 'red',
  },
  date: {
    marginVertical: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
    // backgroundColor: '#dadada',
  },
  // list: {
  //   width: Layout.window.width,
  //   height: LIST_HEIGHT,
  // },
  listItem: {
    borderRadius: 0,
    paddingTop: 0,
    paddingBottom: 1,
  },
  listItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    // borderColor: 'rgba(0,0,0, 0.4)',
  },
  transactionDetails: {
    width: '70%',
    flexDirection: 'column',
  },
  transactionTime: {
    color: 'rgba(0,0,0, 0.6)',
  },
  amount: {
    width: '30%' ,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listItemRow_1: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  category: {
    // backgroundColor: 'rgba(235, 128, 47, 0.2)',
    // color: 'rgba(235, 128, 47, 1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    // marginRight: 10, 
  },
  paymentMode: {
    // backgroundColor: 'rgba(96, 133, 214, 0.2)',
    // color: 'rgba(9, 75, 219, 1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});
