import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../../components/Themed';
import { Transaction, TransactionType } from '../../types';
import { Input } from '../Input';

export default function NewEntryCard() {
  const entryInitialState = {
    transactionType: 'Cash-In' as TransactionType,
    category: '',
    paymentMode: '',
    remark: '',
    amount: '',
    date: new Date
  }

  const [entry, setEntry] = useState<Transaction>(entryInitialState)

  const changeTransactionType = (transactionType: TransactionType) => {
    setEntry({ ...entry, transactionType });
  }

  const onAmountChange = (amount: string) => {
    console.log(amount)
    setEntry({ ...entry, amount: amount });
  }

  return (
    <View style={styles.card}>
      <View style={[styles.row, { justifyContent: 'center' }]}>
        <View style={[{ marginLeft: 10, flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, borderWidth: 2, borderColor: 'blue', }]}>
          <TouchableOpacity activeOpacity={1} onPress={() => changeTransactionType('Cash-In')}><Text style={[styles.transactionButton, [entry.transactionType === 'Cash-In' ? styles.transactionButtonSelected : { }]]}>Cash-In</Text></TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => changeTransactionType('Cash-Out')}><Text style={[styles.transactionButton, [entry.transactionType === 'Cash-Out' ? styles.transactionButtonSelected : { }]]}>Cash-Out</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <Input placeholder='Amount' value={entry.amount || ''} keyboardType='numeric' onChangeText={onAmountChange} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 20,
  },
  transactionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  transactionButtonSelected: {
    color: '#fff',
    backgroundColor: 'blue',
  },
  inputWrapper: {
    position: 'relative',
    backgroundColor: '#fff',
    width: '100%',
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
  },
  inputLabel: {
    backgroundColor: '#fff',
    zIndex: 2,
    paddingHorizontal: 10,
    position: 'absolute',
    top: -12,
    left: 16
  },
  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   alignSelf: 'flex-start',
  //   padding: 10,
  // },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: '80%',
  // },
});
