import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../../components/Themed';
import { AuthStackScreenProps } from '../../types';
import { useAuthContext } from '../../contexts/AuthContext';
import { ButtonLink, ButtonPrimary } from '../../components/Button';
import { Input } from '../../components/Input';
import { useState } from 'react';
import { Icon } from '../../components/Icon';

export default function LoginScreen(props: AuthStackScreenProps<'Login'>) {

  const { onLogin } = useAuthContext();

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isDisabled = !email || !password;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Login</Text>
      </View>
      <View style={styles.row}>
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
            secureTextEntry={!showPassword}
            keyboardType='default'
            onChangeText={(val) => setPassword(val)}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            disabled={!password}
            style={styles.eyeIcon}
          >
            <Icon type='Ionicons' name={`${showPassword ? 'eye': 'eye-off'}`} size={20} />
          </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <ButtonPrimary
          disabled={isDisabled}
          rounded
          label='Log In'
          onPress={() => onLogin(email, password)}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.subTitle}>Don't have an account? </Text>
        <ButtonLink
          label='Sign up'
          activeOpacity={1}
          onPress={() => props.navigation.replace('Signup')}
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
    position: 'relative',
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
   justifyContent: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    bottom: 20,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
