import { StyleSheet, Image } from 'react-native';

import { Text, View } from '../../components/Themed';
import { AuthStackScreenProps } from '../../types';
import { Button } from '../../components/Button';

const dummyImage = 'https://img.freepik.com/free-vector/letter-n-d-colorful-icon-logo-design_474888-3460.jpg?w=826&t=st=1719559646~exp=1719560246~hmac=2dbcffec17f2ee44e4136a2dc49b6cdc6e2257d7b588e98d5093fe252d952470';

export default function LoadingScreen(props: AuthStackScreenProps<'Loading'>) {

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>App</Text>
      </View>
      <View style={styles.logoWrapper}>
        <Image
          alt='logo' 
          source={{ uri: dummyImage }}
          height={200}
          width={200}
        />
        <Text style={styles.subTitle}>Say hello to your new app</Text>
      </View>
      <View style={styles.footer}>
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
      </View>
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
  },
  subTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoWrapper: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
   flex: 1,
   maxHeight: 180,
   alignSelf: 'stretch',
  },
  labelStyles: {
    fontSize: 18,
  },
});
