import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
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
import TransactionFilters from './TransactionFilters';

export const filterInitialState: { TRANSACTION_TYPE: string, CATEGORY: string[] } = {
  TRANSACTION_TYPE: '',
  CATEGORY: [],
}

export default function TransactionList() {
  const [ transactionList, , , , fetchList ] = useStore('transactionList');
  // @ts-ignore
  const parsedTransactionList: Transaction[] = transactionList !== '' ? parseObject(transactionList).sort((a,b) => b.createdAt - a.createdAt) : [];
  const [selectedFilters, setSelectedFilters] = useState(filterInitialState)

  useFocusEffect(
    useCallback(() => {
      fetchList();
    }, [transactionList])
  );

  return (
    <ScrollView style={styles.list}>
      <TransactionFilters
        selectedFilters={selectedFilters}
        setFilter={(filter, selectedOptions) => setSelectedFilters({ ...selectedFilters, [filter]: selectedOptions})}
      />
      {parsedTransactionList.map((item: Transaction, i) => {
        // const date = dayjs(item.createdAt).format('DD-MMM-YYYY');
        // const isDifferentDate = currentDate !== date;
        // currentDate = date;
        if(selectedFilters.TRANSACTION_TYPE !== '' && item.transactionType !== selectedFilters.TRANSACTION_TYPE) return null;
        if(selectedFilters.CATEGORY.length !== 0 && !selectedFilters.CATEGORY.includes(item.category)) return null;
        return (
          <React.Fragment key={i}>
            {/* { isDifferentDate && <Text style={styles.date}>{date}</Text>} */}
            <Card style={styles.listItem} key={i}>
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
    </ScrollView>  
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
