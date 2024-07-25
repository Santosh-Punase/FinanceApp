import { StyleSheet, TouchableOpacity } from "react-native";

import { Icon } from "./Icon";
import { View } from "./Themed";
import { Input } from "./Input";
import { useState } from "react";


interface PasswordInputProps {
  password: string;
  passwordError: string;
  setPassword: (p: string) => void
}

export function PasswordInput({ password, passwordError, setPassword }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View style={{ alignSelf: 'stretch' }}>
      <Input
        placeholder='Password'
        value={password}
        secureTextEntry={!showPassword}
        error={passwordError}
        keyboardType='default'
        onBlur={() => setPassword(password.trim())}
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
  );
}

const styles = StyleSheet.create({
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
