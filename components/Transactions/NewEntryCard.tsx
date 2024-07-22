import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import useStore from '../../hooks/useStore';
import { /* Transaction, */ DropdownOption, TRANSACTION_TYPE } from '../../store/type';
import { AddNewScreenProps } from '../../types';
import { parseObject, stringifyObject } from '../../utils';
import { ButtonOutline, ButtonPrimary } from '../Button';
import { Card } from '../Card';
import { Dropdown } from '../Dropdown';
import { Input } from '../Input';
import Toggle from '../Toggle';
import Toast from 'react-native-toast-message';
import { saveTransaction } from '../../api/api';

export type Transaction = {
  _id?: number;
  type: TRANSACTION_TYPE;
  amount: string;
  category?: DropdownOption;
  paymentMode?: DropdownOption;
  remark: string;
}
const getTransactionEntry = (entry: Transaction) => ({
  amount: parseFloat(entry.amount),
  type: entry.type,
  remark: entry.remark,
  category: entry.category?.id!,
  paymentMode: entry.paymentMode?.id!,
});

export default function NewEntryCard({ navigation, route }: AddNewScreenProps) {

  const entryInitialState: Transaction = {
    type: route?.params?.transactionType || TRANSACTION_TYPE.INCOME,
    category: undefined,
    paymentMode: undefined,
    remark: '',
    amount: '',
  }
  const [entry, setEntry] = useState<Transaction>(entryInitialState);
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const [isSaveAndAddNewLoading, setIsSaveAndAddNewLoading] = useState<boolean>(false);

  // const [ transactionList, setTransactionList ] = useStore('transactionList');
  // @ts-ignore
  // const parsedTransactionList: Transaction[] = transactionList !== '' ? parseObject(transactionList) : [];

  const updateEntry = (key: keyof Transaction, value: any ) => {
    setEntry({ ...entry, [key]: value })
  }

  useEffect(() => {
    updateEntry('category', route?.params?.category);
  }, [route?.params?.category]);

  useEffect(() => {
    updateEntry('paymentMode', route?.params?.paymentMode);
  }, [route?.params?.paymentMode]);

  const changeTransactionType = (transactionType: TRANSACTION_TYPE) => {
    updateEntry('type', transactionType);
  }

  // const saveEntry = () => {
  //   save();
    // const newEntry: Transaction = {
    //   ...entry, id: Math.random(), amount: Number(entry.amount).toFixed(2), createdAt: Date.now()
    // };
    // setTransactionList(stringifyObject([ ...parsedTransactionList, newEntry]));
  // }

  const onSaveClick = () => {
    setIsSaveLoading(true);
    saveTransaction(getTransactionEntry(entry))
    .then(() => {
      Toast.show({
        type: 'success',
        text1: 'Entry Saved Successfully',
      });
      navigation.navigate('Root')
    })
    .catch()
    .finally(() => setIsSaveLoading(false));
  }

  const onSaveAndAddNewClick = () => {
    setIsSaveAndAddNewLoading(true);
    saveTransaction(getTransactionEntry(entry))
    .then(() => {
      setEntry({ ...entryInitialState, type: entry.type });
      Toast.show({
        type: 'success',
        text1: 'Entry Saved Successfully',
      });
      navigation.setParams({ category: undefined });
      navigation.setParams({ paymentMode: undefined });
    })
    .catch()
    .finally(() => setIsSaveAndAddNewLoading(false));
  }

  const isExpenseTransaction = entry.type === TRANSACTION_TYPE.EXPENSE
  const isSaveDisabled = isSaveLoading || isSaveAndAddNewLoading || !entry.category || !entry.paymentMode || !entry.remark;

  return (
    <Card style={[styles.wrapperCard, { borderColor: entry.type === TRANSACTION_TYPE.INCOME ? 'green' : 'red' }]}>
      <View style={{ marginHorizontal: 30, marginBottom: 20 }}>
        <Toggle width={300} value={isExpenseTransaction} onPress={() => changeTransactionType(isExpenseTransaction ? TRANSACTION_TYPE.INCOME : TRANSACTION_TYPE.EXPENSE)} />
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
            onPress={() => navigation.navigate('PaymentOptionsScreen', { header: 'Choose Payment Mode', category: entry.category, paymentMode: entry.paymentMode, action: 'select' })}
          />
        </>
      )}
      <View style={styles.bottomRow}>
        <ButtonOutline
          disabled={isSaveDisabled}
          isLoading={isSaveAndAddNewLoading}
          label={'Save & Add New'}
          style={[{ width: '48%' }]}
          labelStyles={styles.buttonLabel}
          onPress={onSaveAndAddNewClick}
        />
        <ButtonPrimary
          disabled={isSaveDisabled}
          isLoading={isSaveLoading}
          label={'Save'}
          style={[{ width: '48%' }]}
          labelStyles={styles.buttonLabel}
          onPress={onSaveClick}
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
