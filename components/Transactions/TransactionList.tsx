import { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';

import Layout from '../../constants/Layout';
import { Text, View } from '../Themed';
import { Card } from '../Card';
import { dummyData } from './dummyData';
import useStore from '../../hooks/useStore';
import { Transaction } from '../../store/type';
import { parseObject } from '../../utils';


export default function TransactionList() {
  const [ transactionList, , , , fetchList ] = useStore('transactionList');
  // @ts-ignore
  const parsedTransactionList: Transaction[] = transactionList !== '' ? parseObject(transactionList).sort((a,b) => b.createdAt - a.createdAt) : [];
  let currentDate = '';

  useFocusEffect(
    useCallback(() => {
      fetchList();
      console.log(transactionList)
    }, [transactionList])
  );

  return (
    <ScrollView style={styles.list}>
      {parsedTransactionList.map((item: Transaction, i) => {
        // if(i > 3) return null
        const date = dayjs(item.createdAt).format('DD-MMM-YYYY');
        const isDifferentDate = currentDate !== date;
        currentDate = date;
        return (
          <>
            { isDifferentDate && <Text style={styles.date}>{date}</Text>}
            <Card style={styles.listItem} key={i}>
              <View style={styles.listItemLeft}>
                <View style={styles.listItemRow_1}>
                  {item.category && <Text style={styles.category}>{item.category}</Text>}
                  {item.paymentMode && <Text style={styles.paymentMode}>{item.paymentMode}</Text>}
                </View>
                {item.remark && <Text>{item.remark}</Text>}
              </View>
              <View style={styles.listItemRight}>
                {item.transactionType === 'Cash-In' && <Text style={styles.credit}>{item.amount}</Text>}
                {item.transactionType === 'Cash-Out' && <Text style={styles.debit}>{item.amount}</Text>}
              </View>
            </Card>
          </>
        )})
      }
    </ScrollView>  
  );
}

const styles = StyleSheet.create({
  credit: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  debit: {
    fontSize: 18,
    fontWeight: 'bold',
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
    // padding: 10,
  },
  listItem: {
    // marginBottom: 10,
    borderRadius: 0,
  },
  listItemLeft: {
    width: '75%',
    flexDirection: 'column',
  },
  listItemRight: {
    width: '25%' ,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 5,
  },
  listItemRow_1: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  category: {
    backgroundColor: 'lightblue',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 10, 
  },
  paymentMode: {
    backgroundColor: 'lightgreen',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});
