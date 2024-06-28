import { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../components/Card';
import { InputModal } from '../components/Modals/InputModal';

import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import useStore from '../hooks/useStore';
import { User } from '../store/type';
import { parseObject, stringifyObject } from '../utils';
import { ThemeSetting } from '../components/ThemeSetting';
import { Icon } from '../components/Icon';
import { initialize, removeValue } from '../store/store';
import { defaultCategories, defaultPaymentModes } from '../constants/Store';
import { useAuthContext } from '../contexts/AuthContext';

export default function SettingScreen() {
  const [user, setUser] = useStore('user');
  const { onLogout } = useAuthContext();

  const parsedUser:User = parseObject(user) as User || { name: '', phoneNumber: '' };
 
  const [showModal, setShowModal] = useState<boolean>(false);

  // const onLogoutClick = () => {
  //   Alert.alert(
  //     'Are you sure',
  //     'Logout ?',
  //     [
  //       {
  //         text: "Cancel",
  //         style: "cancel"
  //       },
  //       { text: "OK", onPress: () => console.log("OK Pressed") }
  //     ]
  //   )
  // }

  const onResetCategoryAndPaymentModes = async() => {
    removeValue('categories');
    removeValue('paymentModes');
    initialize('categories', stringifyObject(defaultCategories));
    initialize('paymentModes', stringifyObject(defaultPaymentModes));
  }

  const onResetTransactionList = async() => {
    removeValue('transactionList');
    initialize('transactionList', stringifyObject([]));
  }

  return (
    <View style={styles.container} lightColor='rgba(255,255,255, 0.5)' darkColor='rgba(255, 255, 255, 0.1)'>
      <Text style={styles.sectionHeader}>Profile</Text>
      <Card>
        <View style={styles.profileIcon}>
          <Text style={styles.profileInitial}>s</Text>
        </View>
        <View style={[{ flexDirection: 'column', marginBottom: 5, justifyContent: 'center', width: Layout.window.width - 120 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.header}>{parsedUser.name}</Text>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Icon type="AntDesign" name="edit" size={24} />
            </TouchableOpacity>
          </View>
          { parsedUser.phoneNumber && <Text style={styles.subHeader}>{parsedUser.phoneNumber}</Text> }
        </View>
      </Card>
      <Text style={styles.sectionHeader}>Theme</Text>
      <ThemeSetting />
      <Text style={styles.sectionHeader}>Application</Text>
      <Card style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <Text>App Version</Text>
          <Text>0.0.1</Text>
        </View>
        <TouchableOpacity onPress={onResetCategoryAndPaymentModes} style={[{ flexDirection: 'row', marginBottom: 10 }]}>
          <Icon type="Ionicons" name='refresh-circle' size={30} />
          <Text style={styles.label}>Reset Category and Payment modes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onResetTransactionList} style={[{ flexDirection: 'row', marginBottom: 10 }]}>
          <Icon type="Ionicons" name='refresh-circle' size={30} />
          <Text style={styles.label}>Reset transaction list</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogout} style={[{ flexDirection: 'row' }]}>
          <Icon type="AntDesign" name='logout' size={30} />
          <Text style={styles.label}>Log-out</Text>
        </TouchableOpacity>
      </Card>
      { showModal && (
        <InputModal
          title={'Edit Name'}
          initialValue={parsedUser.name}
          placeholder={'Name'}
          onCancel={() => setShowModal(false)}
          onSubmit={(name) => {
            setUser(stringifyObject({ ...parsedUser, name }))
            setShowModal(false)
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'gray',
    marginLeft: 10,
    // textTransform: 'uppercase',
    letterSpacing: 1,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    marginRight: 20,
  },
  profileInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'gray',
  },
  header: {
    fontSize: 16,
  },
  subHeader: {
    fontSize: 12
  },
  label: {
    fontSize: 16,
    marginLeft: 20,
  },
});
