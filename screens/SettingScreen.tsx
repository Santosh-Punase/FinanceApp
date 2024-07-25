import { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View as DefaultView } from 'react-native';
import { Card } from '../components/Card';
import { InputModal } from '../components/Modals/InputModal';

import { Text, View } from '../components/Themed';
import Layout, { WIDTH } from '../constants/Layout';
// import useStore from '../hooks/useStore';
// import { User } from '../store/type';
// import { parseObject, stringifyObject } from '../utils';
import { ThemeSetting } from '../components/ThemeSetting';
import { Icon } from '../components/Icon';
// import { initialize, removeValue } from '../store/store';
// import { defaultCategories, defaultPaymentModes } from '../constants/Store';
import { useAuthContext } from '../contexts/AuthContext';
import { RootTabScreenProps } from '../types';
// import useApiCall from '../hooks/useApiCall';
import { updateUser } from '../api/api';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
// import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { ConcentModal } from '../components/Modals/ConsentModal';

export default function SettingScreen({ navigation }: RootTabScreenProps<'TabThree'>) {
  const { onLogout, user, setUser } = useAuthContext();
  const [isUserUpdateLoading, setIsUserUpdateLoading] = useState<boolean>(false);

  // const parsedUser:User = parseObject(user) as User || { name: '', phoneNumber: '' };
  // const { isLoading: isUserLoading, doApiCall: fetchUser } = useApiCall({
  //   apiCall: () => getUser(),
  //   onSuccess: (data) => {
  //     setUser(data);
  //   }
  // });

  const updateUserName = (name: string) => {
    setShowModal(false);
    setIsUserUpdateLoading(true);
    updateUser(name)
    .then(() => {
      Toast.show({
        type: 'success',
        text1: 'Username updated!'
      });
      user && setUser({ ...user, username: name });
    })
    .catch()
    .finally(() => {
      setIsUserUpdateLoading(false);
    });
  }

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchUser();
  //   }, [])
  // );
 
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const closeLogoutModal = () => setShowLogoutModal(false);
  // const onResetCategoryAndPaymentModes = async() => {
  //   removeValue('categories');
  //   removeValue('paymentModes');
  //   // initialize('categories', stringifyObject(defaultCategories));
  //   initialize('paymentModes', stringifyObject(defaultPaymentModes));
  // }

  // const onResetTransactionList = async() => {
  //   removeValue('transactionList');
  //   initialize('transactionList', stringifyObject([]));
  // }

  return (
    <View style={styles.container} lightColor='rgba(255,255,255, 0.5)' darkColor='rgba(255, 255, 255, 0.1)'>
      <Text style={styles.sectionHeader}>Profile</Text>
      { isUserUpdateLoading
      ? (
        <Card style={{ marginBottom: 10, width: WIDTH - 20, flexDirection: 'column', justifyContent: 'center' }}>
          <DefaultView style={{ width: WIDTH - 40, flexDirection: 'row', alignItems: 'center' }}>
            <LoadingSkeleton itemStyle={{ borderRadius: 50, }}>
              <DefaultView style={{ width: 60, height: 60 }}/>
            </LoadingSkeleton>
            <LoadingSkeleton style={{ marginLeft: 20, marginTop: 8 }} itemStyle={{ marginBottom: 10 }}>
              <DefaultView style={{ width: 100, height: 15 }}/>
              <DefaultView style={{ width: 100, height: 15 }}/>
            </LoadingSkeleton>
            <LoadingSkeleton style={{ alignSelf: 'flex-start', marginLeft: WIDTH - 250, marginTop: 5 }} itemStyle={{ borderRadius: 8 }}>
              <DefaultView style={{ width: 30, height: 30 }}/>
            </LoadingSkeleton>
          </DefaultView>
        </Card>
      ): (
        <Card>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>{user?.username?.charAt(0) || 'U'}</Text>
          </View>
          <View style={[{ flexDirection: 'column', marginBottom: 5, justifyContent: 'center', width: Layout.window.width - 120 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.header}>Username</Text>
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Icon type="AntDesign" name="edit" size={24} />
              </TouchableOpacity>
            </View>
            <Text style={styles.subHeader}>{user?.username}</Text>
          </View>
        </Card>
      )}
      <Text style={styles.sectionHeader}>Theme</Text>
      <ThemeSetting />
      <Text style={styles.sectionHeader}>Application</Text>
      <Card style={{ flexDirection: 'column' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CategoryOptionsScreen', { header: 'Categories', category: undefined, paymentMode: undefined, action: 'list' })}
          style={[{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }]}
        >
          <Icon type="Ionicons" name='list-circle-outline' size={30} />
          <Text style={styles.label}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('PaymentOptionsScreen', { header: 'Payment Modes', category: undefined, paymentMode: undefined, action: 'list' })}
          style={[{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }]}
        >
          <Icon type="Ionicons" name='card-outline' size={30} />
          <Text style={styles.label}>Payment Modes</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={onResetCategoryAndPaymentModes} style={[{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }]}>
          <Icon type="Ionicons" name='refresh-circle' size={30} />
          <Text style={styles.label}>Reset Category and Payment modes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onResetTransactionList} style={[{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }]}>
          <Icon type="Ionicons" name='refresh-circle' size={30} />
          <Text style={styles.label}>Reset transaction list</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => setShowLogoutModal(true)} style={[{ flexDirection: 'row', marginBottom: 20, alignItems: 'center', }]}>
          <Icon type="Ionicons" name='log-out-outline' size={30} style={{ marginLeft: 3, marginRight: -3, }}/>
          <Text style={styles.label}>Log-out</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
          <Text>App Version</Text>
          <Text>0.0.1</Text>
        </View>
      </Card>
      { showModal && (
        <InputModal
          title={'Edit Username'}
          initialValue={user?.username}
          placeholder={'Username'}
          onCancel={() => setShowModal(false)}
          onSubmit={updateUserName}
        />
      )}
      { showLogoutModal && (
        <ConcentModal
          visible
          message="Are you sure. Logout?"
          onClose={closeLogoutModal}
          onSubmit={onLogout}
          submitText='Logout'
          onCancel={closeLogoutModal}
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
