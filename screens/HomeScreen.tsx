import { StyleSheet, Dimensions, FlatList } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { FloatingButton } from '../components/FloatingButton';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { TransactionType } from '../store/type';
import { CardsCarousel } from '../components/CardsCarousel';
import { Card } from '../components/Card';
import { WIDTH } from '../constants/Layout';
import { HorizontalCardList } from '../components/HorizontalCardList';
import { withDecay } from 'react-native-reanimated';

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const addNewTransaction = (transactionType: TransactionType ) => {
    navigation.navigate('AddNewTransaction', { category: undefined, paymentMode: undefined, transactionType })
  }

  const categories = [...new Array(1).keys()];

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
        style={{  }}
        renderItem={({ item }) => (
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
              justifyContent: 'center',
              marginHorizontal: 10
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 30 }}>
              {item}
            </Text>
          </View> 
        )}
      />
      {/* <CardsCarousel /> */}
      
      {/* <EditScreenInfo path="/screens/HomeScreen.tsx" /> */}
      <FloatingButton
        onPress={() => addNewTransaction('Cash-In')}
        label={'+'}
        style={{ backgroundColor: 'green', bottom: 100, }}
      />
      <FloatingButton
        onPress={() => addNewTransaction('Cash-Out')}
        label={'+'}
        style={{ backgroundColor: 'red', bottom: 20, }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 120,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  cardStyle: { marginVertical: 10, marginHorizontal: 10, width: WIDTH - 20, flexDirection: 'column' },
  cardItem: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
