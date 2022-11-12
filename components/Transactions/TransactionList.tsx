import { ScrollView, StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';
import { Text, View } from '../Themed';
import { Card } from '../Card';
import { dummyData } from './dummyData';


export default function TransactionList() {

  return (
    <ScrollView style={styles.list}>
      <Text style={styles.date}>11-Nov-2022</Text>
      {dummyData.map((item, i) => (
        <Card style={styles.listItem} key={i}>
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
        </Card>
      ))}
    </ScrollView>  
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
  date: {
    marginHorizontal: 20,
    marginVertical: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  list: {
    width: Layout.window.width,
    // padding: 10,
  },
  listItem: {
    // marginBottom: 10,
    borderRadius: 0,
  },
  listItemLeft: {
    width: '75%',
    flexDirection: 'column',
  },
  listItemRight: {
    width: '25%' ,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 5,
  },
  listItemRow_1: {
    flexDirection: 'row',
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
});
