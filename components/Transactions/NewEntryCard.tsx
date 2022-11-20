import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../../components/Themed';
import useStore from '../../hooks/useStore';
import { Transaction, TransactionType } from '../../types';
import { parseObject, stringifyObject } from '../../utils';
import { Button } from '../Button';
import { Card } from '../Card';
import { Input } from '../Input';
import { OverlayModal } from '../OverlayModal';

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [paymentModes, setPaymentModes, isLoading] = useStore('paymentModes');
  // @ts-ignore
  const parsedPaymentModes: string[] = paymentModes !== '' ? parseObject(paymentModes) : [];

  const updateEntry = (key: keyof Transaction, value: string ) => {
    setEntry({ ...entry, [key]: value })
  }

  useEffect(() => {
    updateEntry('category', category);
  }, [category]);

  const changeTransactionType = (transactionType: TransactionType) => {
    updateEntry('transactionType', transactionType);
  }

  return (
    <Card style={[{ flexDirection: 'column', height: '100%', paddingBottom: 0, }]}>
      <View style={[styles.row, { justifyContent: 'center' }]}>
        <View style={[{ marginLeft: 10, flexDirection: 'row', width: '50%', justifyContent: 'space-between', }]}>
          <Button
            rounded
            activeOpacity={1}
            label='Cash-In'
            selected={entry.transactionType === 'Cash-In'}
            buttonType='success'
            onPress={() => changeTransactionType('Cash-In')}
          />
          <Button
            rounded
            activeOpacity={1}
            label='Cash-Out'
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
          <TouchableOpacity style={styles.dropdown} activeOpacity={1} onPress={() => navigation.navigate('Options', { header: 'Choose Category' })}>
            <Text style={styles.label}>Category</Text>
            <Text style={[entry.category ? {} : { color: 'gray' }]}>{entry.category || 'Category'}</Text>
            <View style={styles.dropdownIcon} />
          </TouchableOpacity>
          <View style={styles.paymentModeWrapper}>
            <Text style={[styles.label, { left: 0 }]}>Payment Mode</Text>
            { parsedPaymentModes.map(paymentMode => (
              <Button
                key={paymentMode}
                rounded
                activeOpacity={1}
                label={paymentMode}
                style={styles.paymentModeButton}
                selected={entry.paymentMode === paymentMode}
                onPress={() => updateEntry('paymentMode', paymentMode)}
              />
            ))}
            { parsedPaymentModes.length < 10 && (
              <View style={{ width: '100%' }}>
                <Button
                  rounded
                  activeOpacity={1}
                  label={'+ Add New'}
                  buttonType='link'
                  style={[styles.paymentModeButton, { alignSelf: 'flex-start' }]}
                  selected
                  onPress={() => setShowModal(true)}
                />
              </View>
            )}
          </View>
        </>
      )
      }
      <OverlayModal
        title='Add New Payment Mode'
        placeholder='Payment Mode'
        submitText='Save'
        visible={showModal}
        onSubmit={(text) => {
          setPaymentModes(stringifyObject([ ...parsedPaymentModes, text]));
          setShowModal(false)
        }}
        onCancel={() => setShowModal(false)}
      />
      <View style={styles.bottomRow}>
        <Button
          activeOpacity={1}
          label={'Save & Add New'}
          buttonType='outline'
          style={[{ width: '65%' }]}
          labelStyles={styles.buttonLabel}
          selected
          onPress={() => null}
        />
        <Button
          activeOpacity={1}
          label={'Save'}
          style={[{ width: '30%' }]}
          labelStyles={styles.buttonLabel}
          selected
          onPress={() => null}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
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
  dropdown: {
    position: 'relative',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 30,
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
  paymentModeWrapper: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  paymentModeButton: {
    marginBottom: 20,
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
