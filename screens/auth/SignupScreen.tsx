import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../../components/Themed';
import { AuthStackScreenProps } from '../../types';
import { ButtonPrimary, ButtonLink } from '../../components/Button';
import { Input } from '../../components/Input';
import { useState } from 'react';

export default function SignupScreen(props: AuthStackScreenProps<'Signup'>) {
  
  const [userName, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onSignup = () => {

  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Create new account</Text>
      </View>
      <View style={styles.row}>
        <Input
          placeholder='Username'
          value={userName}
          style={styles.inputStyle}
          keyboardType='default'
          onChangeText={(val) => setUserName(val)}
        />
         <Input
          placeholder='E-mail'
          value={email}
          style={styles.inputStyle}
          keyboardType='email-address'
          onChangeText={(val) => setEmail(val)}
        />
        <Input
          placeholder='Password'
          value={password}
            style={styles.inputStyle}
            secureTextEntry
            keyboardType='default'
            onChangeText={(val) => setPassword(val)}
          />
      </View>
      <View style={styles.buttonWrapper}>
        <ButtonPrimary
          rounded
          label='Sign Up'
          onPress={onSignup}
        />
      </View>
      <View style={styles.footer}>
        
        <Text style={styles.subTitle}>Don't have an account? </Text>
        <ButtonLink
          label='Log In'
          activeOpacity={1}
          onPress={() => props.navigation.replace('Login')}
          labelStyles={styles.subTitle}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 50,
    paddingBottom: 20,
    paddingTop: 40,

  },
  row: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
  },
  inputStyle: {
    marginVertical: 20,
  },
  subTitle: {
    marginTop: 10,
    fontSize: 16,
  },
  buttonWrapper: {
    alignSelf: 'stretch',
    height: 90,
    maxHeight: 90,
  },
  footer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
});
