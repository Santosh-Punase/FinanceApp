import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../components/Card';
import { InputModal } from '../components/Modals/InputModal';

import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import useStore from '../hooks/useStore';
import { User } from '../store/type';
import { parseObject, stringifyObject } from '../utils';

export default function SettingScreen() {
  const [user, setUser] = useStore('user');

  const parsedUser:User = parseObject(user) as User || { name: '', phoneNumber: '' };
 
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Profile</Text>
      <Card style={[ { marginBottom: 10, }]}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileInitial}>s</Text>
        </View>
        <View style={[{ flexDirection: 'column', marginBottom: 5, justifyContent: 'center', width: Layout.window.width - 120 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.header}>{parsedUser.name}</Text>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
          { parsedUser.phoneNumber && <Text style={styles.subHeader}>{parsedUser.phoneNumber}</Text> }
        </View>

      </Card>
      <Text style={styles.sectionHeader}>Application</Text>
      <Card>
        <TouchableOpacity onPress={() => alert('Work in progress')} style={[{ flexDirection: 'row' }]}>
          <AntDesign name='logout' color={'black'} size={30} />
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
    padding: 10,
    // backgroundColor: '#dadada',
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'gray',
    marginLeft: 10,
    textTransform: 'uppercase',
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
