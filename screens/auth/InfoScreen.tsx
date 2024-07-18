import { StyleSheet, Image, View as DefaultView } from 'react-native';

import { Text, View } from '../../components/Themed';
import { AuthStackScreenProps } from '../../types';
import { Button } from '../../components/Button';
import { Images } from '../../assets/images/index';

export default function InfoScreen(props: AuthStackScreenProps<'Loading'>) {

  return (
    <View style={styles.container}>
      <DefaultView style={styles.titleWrapper}>
        <Text style={styles.title}>FinoVue</Text>
      </DefaultView>
      <DefaultView style={styles.logoWrapper}>
        <Image
          alt='logo' 
          source={Images.logo}
          style={{ width: 150, height: 150 }}
        />
        <Text style={styles.subTitle}>Take control of your finance!</Text>
      </DefaultView>
      <DefaultView style={styles.footer}>
        <Button
          selected
          rounded
          labelStyles={styles.labelStyles}
          label='Log In'
          onPress={() => props.navigation?.navigate('Login')}
        />
        <Button
          selected
          rounded
          labelStyles={styles.labelStyles}
          label='Sign Up'
          onPress={() => props.navigation?.navigate('Signup')}
        />
      </DefaultView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 20,
    paddingTop: 40,
    backgroundColor: '#010817'
  },
  titleWrapper: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 40,
    color: '#fff',
  },
  subTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoWrapper: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    //  flex: 1,
    maxHeight: 180,
  //  alignSelf: 'stretch',
   width: '100%',
  },
  labelStyles: {
    fontSize: 18,
  },
});
