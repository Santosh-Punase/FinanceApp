import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { AuthStackScreenProps } from '../../types';
import { ButtonPrimary, ButtonLink } from '../../components/Button';
import { Input } from '../../components/Input';
import { useState } from 'react';
import { signup } from '../../api/api';
import Toast from 'react-native-toast-message';
import HeaderView from '../../components/HeaderView';
import { EMAIL_REGEX } from '../../constants';
import { PasswordInput } from '../../components/PasswordInput';
import useApiCall from '../../hooks/useApiCall';

export default function SignupScreen({ navigation }: AuthStackScreenProps<'Signup'>) {
  
  const [userName, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const userNameError =  !!userName ? '' : 'Enter Username';
  const emailError = EMAIL_REGEX.test(email) ? '' : 'Enter Valid Email';
  const passwordError =  !!password ? '' : 'Enter Your Password';
  const isDisabled = !(!userNameError && !emailError && !passwordError);

  const { isLoading, doApiCall } = useApiCall({
    apiCall: () => signup(userName, email, password, password),
    onSuccess: () => {
      Toast.show({ type: 'info', text1: 'Signup successful', text2: 'Login to continue' });
      navigation.replace('Login');
    }
  });

  return (
    <HeaderView title='Register'>
      <View style={styles.container}>
        <View style={styles.row}>
          <Input
            placeholder='Username'
            value={userName}
            error={userNameError}
            keyboardType='default'
            onBlur={() => setUserName(userName.trim())}
            onChangeText={(val) => setUserName(val)}
          />
          <Input
            placeholder='E-mail'
            value={email}
            error={emailError}
            keyboardType='email-address'
            onBlur={() => setEmail(email.trim())}
            onChangeText={(val) => setEmail(val)}
          />
          <PasswordInput password={password} passwordError={passwordError} setPassword={setPassword} />
        </View>
        <View style={styles.buttonWrapper}>
          <ButtonPrimary
            rounded
            label='Create Account'
            isLoading={isLoading}
            disabled={isLoading || isDisabled}
            onPress={doApiCall}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.subTitle}>Already have an account? </Text>
          <ButtonLink
            label='Log In'
            disabled={isLoading}
            activeOpacity={1}
            onPress={() => navigation.replace('Login')}
            labelStyles={styles.subTitle}
          />
        </View>
      </View>
    </HeaderView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 40,
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
