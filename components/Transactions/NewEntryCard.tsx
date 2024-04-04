import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import useStore from '../../hooks/useStore';
import { Transaction, TransactionType } from '../../store/type';
import { AddNewScreenProps } from '../../types';
import { parseObject, stringifyObject } from '../../utils';
import { Button } from '../Button';
import { Card } from '../Card';
import { Dropdown } from '../Dropdown';
import { Input } from '../Input';

export default function NewEntryCard({ navigation, route }: AddNewScreenProps) {

  const entryInitialState: Transaction = {
    id: Math.random(),
    transactionType: route?.params?.transactionType || 'Cash-In',
    category: undefined,
    paymentMode: undefined,
    remark: '',
    amount: '',
    createdAt: 0,
  }
  const [entry, setEntry] = useState<Transaction>(entryInitialState);
  const [ transactionList, setTransactionList ] = useStore('transactionList');
  // @ts-ignore
  const parsedTransactionList: Transaction[] = transactionList !== '' ? parseObject(transactionList) : [];

  const updateEntry = (key: keyof Transaction, value: any ) => {
    setEntry({ ...entry, [key]: value })
  }

  useEffect(() => {
    updateEntry('category', route?.params?.category);
  }, [route?.params?.category]);

  useEffect(() => {
    updateEntry('paymentMode', route?.params?.paymentMode);
  }, [route?.params?.paymentMode]);

  const changeTransactionType = (transactionType: TransactionType) => {
    updateEntry('transactionType', transactionType);
  }

  const saveEntry = () => {
    const newEntry: Transaction = {
      ...entry, createdAt: Date.now()
    };
    setTransactionList(stringifyObject([ ...parsedTransactionList, newEntry]));
  }

  const OnSaveClick = () => {
    saveEntry();
    navigation.navigate('Root');
  }

  const onSaveAndAddNewClick = () => {
    saveEntry();
    navigation.setParams({ category: undefined, paymentMode: undefined });
    setEntry({ ...entryInitialState, id: Math.random(), transactionType: entry.transactionType });
  }

  return (
    <Card style={[styles.wrapperCard, { borderColor: entry.transactionType === 'Cash-In' ? 'green' : 'red' }]}>
      <View style={[styles.row, { justifyContent: 'center' }]}>
        <View style={[{ marginLeft: 10, flexDirection: 'row', width: '50%', justifyContent: 'space-between', }]}>
          <Button
            // rounded
            activeOpacity={1}
            label='CASH IN'
            selected={entry.transactionType === 'Cash-In'}
            buttonType='success'
            onPress={() => changeTransactionType('Cash-In')}
          />
          <Button
            // rounded
            activeOpacity={1}
            label='CASH OUT'
            selected={entry.transactionType === 'Cash-Out'}
            buttonType='error'
            onPress={() => changeTransactionType('Cash-Out')}
          />
        </View>
      </View>
      <View style={styles.row}>
        <Input showLabel placeholder='Amount' value={entry.amount || ''} keyboardType='numeric' onChangeText={(amount) => updateEntry('amount', amount)} />
      </View>
      { entry.amount && (
        <>
          <View style={styles.row}>
            <Input showLabel label='Remark' placeholder='Item, Quantity, Person, Place etc' value={entry.remark || ''} onChangeText={(remark) => updateEntry('remark', remark)} />
          </View>
          <Dropdown
            key='category'
            iconStyle={{ size: 18 }}
            placeholder='Category'
            label={'Category'}
            value={entry?.category}
            onPress={() => navigation.navigate('CategoryOptionsScreen', { header: 'Choose Category', category: entry.category, paymentMode: entry.paymentMode })}
          />
          <Dropdown
            key='Payment Mode'
            iconStyle={{ size: 18 }}
            placeholder='Payment Mode'
            label={'Payment Mode'}
            value={entry?.paymentMode}
            onPress={() => navigation.navigate('PaymentOptionsScreen', { header: 'Choose Payment Mode', category: entry.category, paymentMode: entry.paymentMode })}
          />
        </>
      )}
      <View style={styles.bottomRow}>
        <Button
          activeOpacity={1}
          disabled={!entry.paymentMode || !entry.remark}
          label={'Save & Add New'}
          buttonType='outline'
          style={[{ width: '65%' }]}
          labelStyles={styles.buttonLabel}
          selected
          onPress={onSaveAndAddNewClick}
        />
        <Button
          activeOpacity={1}
          disabled={!entry.paymentMode || !entry.remark}
          label={'Save'}
          style={[{ width: '30%' }]}
          labelStyles={styles.buttonLabel}
          selected
          onPress={OnSaveClick}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  wrapperCard: {
    flexDirection: 'column',
    height: '100%',
    paddingBottom: 0,
    borderTopWidth: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  bottomRow: {
    flexDirection: 'row',
    marginTop: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
});
