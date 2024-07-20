import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import useStore from '../../hooks/useStore';
import { Transaction, TransactionType } from '../../store/type';
import { AddNewScreenProps } from '../../types';
import { parseObject, stringifyObject } from '../../utils';
import { ButtonOutline, ButtonPrimary } from '../Button';
import { Card } from '../Card';
import { Dropdown } from '../Dropdown';
import { Input } from '../Input';
import Toggle from '../Toggle';

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
      ...entry, id: Math.random(), amount: Number(entry.amount).toFixed(2), createdAt: Date.now()
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

  const isInTransaction = entry.transactionType === 'Cash-In'

  return (
    <Card style={[styles.wrapperCard, { borderColor: entry.transactionType === 'Cash-In' ? 'green' : 'red' }]}>
      <View style={{ marginHorizontal: 30, marginBottom: 20 }}>
        <Toggle width={300} value={!isInTransaction} onPress={() => changeTransactionType(isInTransaction ? 'Cash-Out' : 'Cash-In')} />
      </View>
      <Input showLabel placeholder='Amount' value={entry.amount || ''} keyboardType='numeric' onChangeText={(amount) => updateEntry('amount', amount)} />
      { entry.amount && (
        <>
          <Input showLabel label='Remark' placeholder='Item, Quantity, Person, Place etc' value={entry.remark || ''} onChangeText={(remark) => updateEntry('remark', remark)} />
          <Dropdown
            key='category'
            iconStyle={{ size: 18 }}
            placeholder='Category'
            label={'Category'}
            value={entry?.category}
            onPress={() => navigation.navigate('CategoryOptionsScreen', { header: 'Choose Category', category: entry.category, paymentMode: entry.paymentMode, action: 'select' })}
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
        <ButtonOutline
          disabled={!entry.category || !entry.paymentMode || !entry.remark}
          label={'Save & Add New'}
          style={[{ width: '48%' }]}
          labelStyles={styles.buttonLabel}
          onPress={onSaveAndAddNewClick}
        />
        <ButtonPrimary
          disabled={!entry.category || !entry.paymentMode || !entry.remark}
          label={'Save'}
          style={[{ width: '48%' }]}
          labelStyles={styles.buttonLabel}
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
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  bottomRow: {
    // flex: 1,
    // height: 80,
    flexDirection: 'row',
    // backgroundColor: 'red',
    marginTop: 'auto',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    // paddingVertical: 20,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'semibold',
    width: '100%',
    textAlign: 'center',
  },
});
