import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../components/Card';

import { Text, View } from '../components/Themed';

export default function SettingScreen() {
  const user = {
    name: 'Santosh',
    phoneNumber: '6574839300',
    email: ''
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Profile</Text>
      <Card style={[ { marginBottom: 10, }]}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileInitial}>s</Text>
        </View>
        <View style={[{ flexDirection: 'column', marginBottom: 5, justifyContent: 'center' }]}>
          <Text style={styles.header}>{user.name}</Text>
          { user.phoneNumber && <Text style={styles.subHeader}>{user.phoneNumber}</Text> }
          { user.email && <Text style={styles.subHeader}>{user.email}</Text> }
        </View>
      </Card>
      <Text style={styles.sectionHeader}>Application</Text>
      <Card>
        <TouchableOpacity onPress={() => alert('Work in progress')} style={[{ flexDirection: 'row' }]}>
          <AntDesign name='logout' color={'black'} size={30} />
          <Text style={styles.label}>Log-out</Text>
        </TouchableOpacity>
      </Card>
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
