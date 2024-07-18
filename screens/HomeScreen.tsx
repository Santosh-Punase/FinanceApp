import { StyleSheet, Dimensions, ColorSchemeName } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { CategoryOption, Transaction } from '../store/type';
import { Card } from '../components/Card';
import { HEIGHT, WIDTH } from '../constants/Layout';
import { HorizontalCardList } from '../components/HorizontalCardList';
import useStore from '../hooks/useStore';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { getProgressColor, parseObject } from '../utils';
import TransactionList from '../components/Transactions/TransactionList';
import { ButtonLink } from '../components/Button';
import Colors from '../constants/Colors';
import { useTheme } from '../theme';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from '../components/Icon';

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [ transactionList, , isLoading , , fetchTransactions ] = useStore('transactionList');
  const [ categoriesList, , isCategoriesLoading , , fetchCategories ] = useStore('categories');
  // @ts-ignore
  const parsedTransactionList: Transaction[] = parseObject(transactionList)?.sort((a,b) => b.createdAt - a.createdAt) || [];
  const currentTheme:ColorSchemeName = useTheme();

  // @ts-ignore
  const parsedCategoriesList: CategoryOption[] = parseObject(categoriesList) || [];

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
      fetchCategories()
    }, [transactionList])
  );

  const categories = parsedCategoriesList;
  // const categories = [...new Array(3).keys()];

  return (
    <View style={styles.container} lightColor='rgba(255,255,255, 0.5)' darkColor='rgba(255, 255, 255, 0.1)'>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <Text style={styles.title}>Tab One</Text> */}
      <Card style={styles.cardStyle}>
        <View style={styles.cardItem}>
          <Text style={{ fontSize: 18 }}>Net Balance</Text>
          <Text style={{ fontSize: 16 }}>0</Text>
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
      <Card style={[styles.cardStyle, { marginBottom: 10, minHeight: 240 }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: WIDTH - 40 , alignItems: 'center', height: 40 }}>
          <Text style={[styles.header, { marginLeft: 0 }]}>Budget Overview</Text>
          <ButtonLink
            label='+ Add Category'
            onPress={() => navigation.navigate('AddCategoryScreen', { header: 'Add Category', category: undefined, action: 'Add' })}
          />
        </View>
        <HorizontalCardList
          data={categories}
          style={{ maxHeight: 200, minHeight: 200 }}
          renderItem={({ item: { name, budget, expense } }) => {
            const expenseMultiple = expense/budget;
            const spentPercent = (expenseMultiple * 100).toFixed(0);
            const progressBarColor = getProgressColor(expenseMultiple);

            return (
              <View
                style={{
                  flex: 1,
                  height: 150,
                  width: categories.length === 1
                    ? WIDTH * 0.90 - 20 // (WIDTH - 40) / categories.length - 20
                    :  WIDTH * 0.75 - 10,
                  borderRadius: 10,
                  alignSelf: 'center',
                  marginHorizontal: 10
                }}
              >
                <LinearGradient colors={['#5c50ff', '#2c8bd6']} style={{ height: '100%', width: '100%', borderRadius: 10, padding: 20, position: 'relative' }}>
                  <Text style={{ textAlign: 'left', fontSize: 24, color: '#fff' }}>
                    {name}
                  </Text>
                  <Icon type='FontAwesome' name='money-bill-wave' size={100} color='white' style={{ position: 'absolute', left: '40%', top: '20%', opacity: 0.1 }}/>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, backgroundColor: 'transparent' }}>
                    <Text style={{ marginBottom: 5, fontSize: 16, color: '#fff' }}>
                      {expense}
                    </Text>
                    <Text style={{ marginBottom: 5, fontSize: 16, color: '#fff' }}>
                      {budget}
                    </Text>
                  </View>
                  <View style={{ height: 10, borderRadius: 8, marginBottom: 5, backgroundColor: Colors[currentTheme].progressBG }}>
                    <View style={{ height: 10, borderRadius: 8, opacity: 0.8, backgroundColor: progressBarColor, width: `${expenseMultiple < 1 ? expenseMultiple * 100 : 100}%` }} />
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
                    <Text style={{ marginBottom: 5, fontSize: 12, color: '#fff' }}>
                      {`${spentPercent}% Spent`}
                    </Text>
                    <Text style={{ marginBottom: 5, fontSize: 12, color: '#fff' }}>
                      Budget
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            )}
          }
        />
        { categories.length === 0 && (
          <View
            style={{
              flex: 1,
              maxHeight: 150, minHeight: 150,
              marginTop: 20, 
              width: WIDTH - 60,
              borderRadius: 10,
              alignSelf: 'center',
              justifyContent: 'center',
              // padding: 10,
              marginHorizontal: 10
            }}
          >
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ height: '100%', width: '100%', borderRadius: 10, justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}>
                Categorise your expenses
              </Text>
              <Text style={{ textAlign: 'center', fontSize: 14, color: '#fff' }}>
                Set budget to get started.
              </Text>
            </LinearGradient>
          </View>
        )}
      </Card>
      <View style={{ width: WIDTH }}>
        <Text style={styles.header}>Recent Transactions</Text>
      </View>
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
