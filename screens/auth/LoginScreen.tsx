import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { AuthStackScreenProps } from '../../types';
import { useAuthContext } from '../../contexts/AuthContext';
import { ButtonLink, ButtonPrimary } from '../../components/Button';
import { Input } from '../../components/Input';
import { useState } from 'react';
import HeaderView from '../../components/HeaderView';
import { PasswordInput } from '../../components/PasswordInput';
import { EMAIL_REGEX } from '../../constants';
import useApiCall from '../../hooks/useApiCall';
import { login } from '../../api/api';

export default function LoginScreen({ navigation }: AuthStackScreenProps<'Login'>) {

  const { onLogin: contextLogin } = useAuthContext();

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const emailError = EMAIL_REGEX.test(email) ? '' : 'Enter Valid Email';
  const passwordError =  !!password ? '' : 'Enter Your Password';

  const isDisabled = !(!emailError && !passwordError);

  const { isLoading, doApiCall } = useApiCall({
    apiCall: () => login(email, password),
    onSuccess: (data) => {
      // @ts-ignore
      const accessToken = data?.token
      contextLogin(accessToken)
    }
  });

  return (
    <HeaderView title='Login'>
      <View style={styles.container}>
        <View style={styles.row}>
          <Input
            placeholder='E-mail'
            value={email}
            error={emailError}
            onBlur={() => setEmail(email.trim())}
            keyboardType='email-address'
            onChangeText={(val) => setEmail(val)}
          />
          <PasswordInput password={password} passwordError={passwordError} setPassword={setPassword} />
        </View>
        <View style={styles.buttonWrapper}>
          <ButtonPrimary
            disabled={isLoading || isDisabled}
            isLoading={isLoading}
            rounded
            label='Log In'
            onPress={doApiCall}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.subTitle}>Don't have an account? </Text>
          <ButtonLink
            label='Sign up'
            activeOpacity={1}
            onPress={() => navigation.replace('Signup')}
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginVertical: 20,
    position: 'relative',
  },
  subTitle: {
    marginTop: 10,
    fontSize: 16,
  },
  buttonWrapper: {
    alignSelf: 'stretch',
    height: 90,
    maxHeight: 90,
   justifyContent: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
});
