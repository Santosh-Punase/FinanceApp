import { StyleSheet, Image, View as DefaultView } from 'react-native';

import { Text, View } from '../../components/Themed';
import { AuthStackScreenProps } from '../../types';
import { ButtonPrimary } from '../../components/Button';
import { Images } from '../../assets/images/index';
import { LinearGradient } from 'expo-linear-gradient';

export default function InfoScreen(props: AuthStackScreenProps<'Loading'>) {

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#10223E', '#0D2D61', '#0D2D61', '#10223E']}
        style={{ height: '100%', width: '100%', padding: 40 }}
        locations={[0.2, 0.4, 0.5, 0.7]}
      >
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
          <ButtonPrimary
            rounded
            label='Log In'
            onPress={() => props.navigation?.navigate('Login')}
          />
          <ButtonPrimary
            rounded
            label='Sign Up'
            onPress={() => props.navigation?.navigate('Signup')}
          />
        </DefaultView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 40,
    // paddingBottom: 20,
    // paddingTop: 40,
    // backgroundColor: '#010817'
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
  }
});
