import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { CategoryOption, Transaction, TransactionCategory, TransactionType } from '../store/type';
// import { CardsCarousel } from '../components/CardsCarousel';
import { Card } from '../components/Card';
import { HEIGHT, WIDTH } from '../constants/Layout';
import { HorizontalCardList } from '../components/HorizontalCardList';
import useStore from '../hooks/useStore';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { parseObject } from '../utils';
import TransactionList from '../components/Transactions/TransactionList';

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [ transactionList, , isLoading , , fetchTransactions ] = useStore('transactionList');
  const [ categoriesList, , isCategoriesLoading , , fetchCategories ] = useStore('categories');
  // @ts-ignore
  const parsedTransactionList: Transaction[] = parseObject(transactionList)?.sort((a,b) => b.createdAt - a.createdAt) || [];

  // @ts-ignore
  const parsedCategoriesList: CategoryOption[] = parseObject(categoriesList) || [];

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
      fetchCategories()
    }, [transactionList])
  );

  const categories = [...parsedCategoriesList, { id: -1, name: '', budget: 0, expense: 0 }];
  // const categories = [...new Array(3).keys()];

  return (
    <View style={styles.container} lightColor='rgba(255,255,255, 0.5)' darkColor='rgba(255, 255, 255, 0.1)'>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <Text style={styles.title}>Tab One</Text> */}
      <Card style={styles.cardStyle}>
        <View style={styles.cardItem}>
          <Text>Title 2</Text>
          <Text>Title 2</Text>
        </View>
      </Card>
      <Card style={styles.cardStyle}>
        <View style={styles.cardItem}>
          <Text>Title</Text>
          <Text>Title</Text>
        </View>
        <View style={styles.cardItem}>
          <Text>Title 2</Text>
          <Text>Title 2</Text>
        </View>
      </Card>
      <HorizontalCardList
        data={categories}
        style={{ maxHeight: 200, minHeight: 200 }}
        renderItem={({ item }) => {
          if (item.id === -1) {
            return (
              <View style={{
                flex: 1,
                height: 150,
                width: categories.length <= 2
                  ? (WIDTH / categories.length) - 20
                  :  WIDTH / 2 - 30,
                borderRadius: 10,
                alignSelf: 'center',
                backgroundColor: '#dadada',
                justifyContent: 'center',
                // padding: 10,
                marginHorizontal: 10
              }}>
                <TouchableOpacity onPress={() => navigation.navigate('AddCategoryScreen', { header: 'Add Category', category: undefined, action: 'Add' })}>
                  <Text style={{ textAlign: 'center', fontSize: 18 }}>
                    {'Add Category'}
                  </Text>
                </TouchableOpacity>
              </View>
            )
          }
          return (
            <View
              style={{
                flex: 1,
                height: 150,
                width: categories.length <= 2
                  ? WIDTH / categories.length - 20
                  :  WIDTH / 2 - 30,
                borderRadius: 10,
                alignSelf: 'center',
                backgroundColor: '#dadada',
                // justifyContent: 'center',
                padding: 10,
                marginHorizontal: 10
              }}
            >
              <Text style={{ textAlign: 'left', fontSize: 24 }}>
                {item?.name}
              </Text>
              <Text style={{ textAlign: 'left', fontSize: 16 }}>
                {`Budget: ${item?.budget}`}
              </Text>
              <Text style={{ textAlign: 'right', fontSize: 16, marginTop: 20 }}>
                {`${item?.expense} Spent`}
              </Text>
              <Text style={{ textAlign: 'right', fontSize: 16 }}>
                {`${item?.budget - item.expense} Left   `}
              </Text>
            </View>
          )}
        }
      />
      <Text style={styles.header}>Recent Transactions</Text>
      <TransactionList
        list={parsedTransactionList.slice(0,5)}
        isLoading={isLoading}
        listHeight={HEIGHT - 500}
        navigation={navigation}
      />

      {/* <CardsCarousel /> */}
      
      {/* <EditScreenInfo path="/screens/HomeScreen.tsx" /> */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 120,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  cardStyle: { marginTop: 10, marginHorizontal: 10, width: WIDTH - 20, flexDirection: 'column' },
  cardItem: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  header: {
    fontSize: 16,
    marginVertical: 10,
    marginLeft: 20,
  },
});
