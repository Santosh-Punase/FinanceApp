import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../../components/Themed';
import { Transaction, TransactionType } from '../../types';
import { Card } from '../Card';
import { Input } from '../Input';

export default function NewEntryCard({ navigation, category }: any) {
  const entryInitialState = {
    transactionType: 'Cash-In' as TransactionType,
    category: '',
    paymentMode: '',
    remark: '',
    amount: '',
    date: new Date
  }
  const [entry, setEntry] = useState<Transaction>(entryInitialState)

  useEffect(() => {
    setEntry({ ...entry, category })
  }, [category]);

  const changeTransactionType = (transactionType: TransactionType) => {
    setEntry({ ...entry, transactionType });
  }

  const onAmountChange = (amount: string) => {
    setEntry({ ...entry, amount });
  }

  const onRemarkChange = (remark: string) => {
    setEntry({ ...entry, remark });
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
        <Input showLabel placeholder='Amount' value={entry.amount || ''} keyboardType='numeric' onChangeText={onAmountChange} />
      </View>
      <View style={styles.row}>
        <Input showLabel placeholder='Remark' value={entry.remark || ''} onChangeText={onRemarkChange} />
      </View>
      <TouchableOpacity style={styles.dropdown} activeOpacity={1} onPress={() => navigation.navigate('Options')}>
        <Text style={styles.label}>Category</Text>
        <Text style={[entry.category ? {} : { color: 'gray' }]}>{entry.category || 'Category'}</Text>
        <View style={styles.dropdownIcon} />
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
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
  dropdown: {
    position: 'relative',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: -14,
    left: 10,
    paddingHorizontal: 6,
  },
  dropdownIcon: {
    height: 15,
    width: 15,
    position: 'absolute',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderRightColor: 'black',
    borderRightWidth: 2,
    right: 15,
    top: 10,
    transform: [{ rotateZ: '45deg' }],
  },
});
