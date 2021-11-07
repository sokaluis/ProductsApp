import React from 'react';
import {
  Text,
  TextInput,
  Platform,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { useForm } from '../hooks/useForm';
import { Background } from '../components/Background';
import { Logo } from '../components/Logo';
import { loginStyles } from '../theme/loginTheme';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'LogInScreen'> {}

const LogInScreen = ({ navigation }: Props) => {
  const { email, password, onChange } = useForm({
    email: '',
    password: '',
  });

  const onLogIn = () => {
    console.log({ email, password });
    Keyboard.dismiss();
  };
  return (
    <>
      <Background />
      <KeyboardAvoidingView
        style={loginStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>
          <Logo />
          <Text style={{ ...loginStyles.title }}>Login</Text>
          <Text style={{ ...loginStyles.label }}>Email:</Text>
          <TextInput
            placeholder="Ingrese su Email"
            placeholderTextColor="rgba(255,255,255, 0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={e => onChange(e, 'email')}
            onSubmitEditing={onLogIn}
            value={email}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={{ ...loginStyles.label }}>Password:</Text>
          <TextInput
            placeholder="*******"
            placeholderTextColor="rgba(255,255,255, 0.4)"
            secureTextEntry
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={e => onChange(e, 'password')}
            onSubmitEditing={onLogIn}
            value={password}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onLogIn}>
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('SignUpScreen')}>
              <Text style={loginStyles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LogInScreen;
