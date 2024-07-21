import { StyleSheet, ColorSchemeName } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Card } from '../components/Card';
import { HEIGHT, WIDTH } from '../constants/Layout';
import { useTheme } from '../theme';
import { Categories } from '../components/Home/Categories';
import { RecentTransactions } from '../components/Home/RecentTransactions';

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const currentTheme:ColorSchemeName = useTheme();

  return (
    <View style={styles.container} lightColor='rgba(255,255,255, 0.5)' darkColor='rgba(255, 255, 255, 0.1)'>
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
      <Categories navigation={navigation} currentTheme={currentTheme} />
      <RecentTransactions navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT - 120,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    // justifyContent: 'center',
  },
  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   alignSelf: 'flex-start',
  // },
  cardStyle: { marginTop: 10, marginHorizontal: 10, width: WIDTH - 20, flexDirection: 'column' },
  cardItem: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: '80%',
  // },
  // header: {
  //   fontSize: 16,
  //   marginVertical: 10,
  //   marginLeft: 20,
  // },
});
