import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Layout from '../../constants/Layout';
import { RootTabScreenProps } from '../../types';
import { Text, View } from '../Themed';

import { dummyData } from './dummyData';


export default function TransactionList({ navigation }: { navigation: any }) {

  return (
    <>
    <ScrollView style={styles.list}>
      {dummyData.map((item, i) => (
        <View style={styles.listItem} key={i} lightColor="#fff" darkColor='#010101'>
          <View style={styles.listItemLeft}>
            <View style={styles.listItemRow_1}>
              {item.category && <Text style={styles.category}>{item.category}</Text>}
              {item.paymentMode && <Text style={styles.paymentMode}>{item.paymentMode}</Text>}
            </View>
            {item.remark && <Text>{item.remark}</Text>}
          </View>
          <View style={styles.listItemRight}>
            {item.cashIn && <Text style={styles.credit}>{item.cashIn}</Text>}
            {item.cashOut && <Text style={styles.debit}>{item.cashOut}</Text>}
          </View>
        </View>
      ))}
      </ScrollView>
      <TouchableOpacity style={styles.addNewButton} onPress={() => navigation.navigate('AddNew')}>
        <Text style={styles.button}>+</Text>
      </TouchableOpacity>
      </>
  );
}

const styles = StyleSheet.create({
  credit: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  debit: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  list: {
    width: Layout.window.width,
    padding: 10,
  },
  listItem: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
  },
  listItemLeft: {
    width: '75%',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  listItemRight: {
    width: '25%' ,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 5,
  },
  listItemRow_1: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  category: {
    backgroundColor: 'lightblue',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 10, 
  },
  paymentMode: {
    backgroundColor: 'lightgreen',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  addNewButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 60,  
    height: 60,   
    borderRadius: 30,            
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 32,
    fontWeight: 'bold',
  }
});
