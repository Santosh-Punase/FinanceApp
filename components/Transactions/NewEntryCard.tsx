import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../../components/Themed';
import { Transaction, TransactionType } from '../../types';
import { Card } from '../Card';
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
    <Card style={[{ flexDirection: 'column' }]}>
      <View style={[styles.row, { justifyContent: 'center' }]}>
        <View style={[{ marginLeft: 10, flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, borderWidth: 2, borderColor: 'blue', }]}>
          <TouchableOpacity activeOpacity={1} onPress={() => changeTransactionType('Cash-In')}><Text style={[styles.transactionButton, [entry.transactionType === 'Cash-In' ? styles.transactionButtonSelected : { }]]}>Cash-In</Text></TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => changeTransactionType('Cash-Out')}><Text style={[styles.transactionButton, [entry.transactionType === 'Cash-Out' ? styles.transactionButtonSelected : { }]]}>Cash-Out</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <Input placeholder='Amount' value={entry.amount || ''} keyboardType='numeric' onChangeText={onAmountChange} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
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
});
