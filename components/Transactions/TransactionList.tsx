import React, { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import { getCalendars } from 'expo-localization';

import Layout from '../../constants/Layout';
import { Text, View } from '../Themed';
import { Card } from '../Card';
import { dummyData } from './dummyData';
import useStore from '../../hooks/useStore';
import { Transaction } from '../../store/type';
import { parseObject } from '../../utils';
import TransactionFilters, { SelectedFilters } from './TransactionFilters';
import { NoRecord } from '../NoRecord';


export const filterInitialState: SelectedFilters = {
  TRANSACTION_TYPE: '',
  CATEGORY: [],
  PAYMENT_MODE: [],
}

const LIST_HEIGHT = Layout.window.height - 150;

export default function TransactionList() {
  const [ transactionList, , isLoading , , fetchList ] = useStore('transactionList');
  // @ts-ignore
  const parsedTransactionList: Transaction[] = transactionList !== '' ? parseObject(transactionList).sort((a,b) => b.createdAt - a.createdAt) : [];
  const [selectedFilters, setSelectedFilters] = useState(filterInitialState)

  useFocusEffect(
    useCallback(() => {
      fetchList();
    }, [transactionList])
  );

  const filteredList = parsedTransactionList.filter((item: Transaction, i: number) => (
    (selectedFilters.TRANSACTION_TYPE === '' || item.transactionType === selectedFilters.TRANSACTION_TYPE) &&
    (selectedFilters.CATEGORY.length === 0 || selectedFilters.CATEGORY.includes(item.category)) &&
    (selectedFilters.PAYMENT_MODE.length === 0 || selectedFilters.PAYMENT_MODE.includes(item.paymentMode))
  ));

  return (
    <>
      <TransactionFilters
        selectedFilters={selectedFilters}
        setFilter={(filter, selectedOptions) => setSelectedFilters({ ...selectedFilters, [filter]: selectedOptions})}
      />
      <ScrollView style={styles.list}>
        { isLoading
        ? <ActivityIndicator size={'large'} style={{ height: LIST_HEIGHT }} />
        : filteredList.map((item: Transaction, i: number) => {
          // const date = dayjs(item.createdAt).format('DD-MMM-YYYY');
          // const isDifferentDate = currentDate !== date;
          // currentDate = date;
          return (
            <React.Fragment key={item.createdAt}>
              {/* { isDifferentDate && <Text style={styles.date}>{date}</Text>} */}
              <Card style={styles.listItem}>
                <View style={styles.listItemWrapper}>
                  <View style={styles.transactionDetails}>
                    {item.remark && <Text>{item.remark}</Text>}
                    <View style={styles.listItemRow_1}>
                      {item.category && <Text style={styles.category}>{item.category}</Text>}
                      {item.paymentMode && <Text style={styles.paymentMode}>{item.paymentMode}</Text>}
                    </View>
                    <Text style={styles.transactionTime}>{`${dayjs(item.createdAt).format(`DD-MMM-YYYY | ${ getCalendars()[0].uses24hourClock ? 'HH:mm' : 'h:mm A'}`)}`}</Text>
                  </View>
                  <View style={styles.amount}>
                    {item.transactionType === 'Cash-In' && <Text style={styles.credit}>{item.amount
                    }</Text>}
                    {item.transactionType === 'Cash-Out' && <Text style={styles.debit}>{item.amount}</Text>}
                  </View>
                </View>
              </Card>
            </React.Fragment>
          )})
        }
        { filteredList.length === 0 && (
          <NoRecord
            header='No Transactions Found'
            subHeader='Try removing filters'
            onCancel={() => setSelectedFilters(filterInitialState)}
          />
        )}
      </ScrollView>  
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
    backgroundColor: '#dadada',
  },
  list: {
    width: Layout.window.width,
    height: LIST_HEIGHT,
  },
  listItem: {
    borderRadius: 0,
    paddingVertical: 0,
  },
  listItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0, 0.4)',
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
    backgroundColor: 'rgba(235, 128, 47, 0.2)',
    color: 'rgba(235, 128, 47, 1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 10, 
  },
  paymentMode: {
    backgroundColor: 'rgba(96, 133, 214, 0.2)',
    color: 'rgba(9, 75, 219, 1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});
