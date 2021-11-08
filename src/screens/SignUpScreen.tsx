/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import {
  Text,
  TextInput,
  Platform,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import { useForm } from '../hooks/useForm';
import { Background } from '../components/Background';
import { Logo } from '../components/Logo';
import { loginStyles } from '../theme/loginTheme';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/StackNavigator';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<RootStackParams, 'SignUpScreen'> {}

const SignUpScreen = ({ navigation }: Props) => {
  const { signUp, errorMessage, removeError } = useContext(AuthContext);
  const { email, password, name, onChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    }
    Alert.alert('Login Incorrecto', errorMessage, [
      {
        text: 'Ok',
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  const onRegister = () => {
    Keyboard.dismiss();
    signUp({
      correo: email,
      nombre: name,
      password,
    });
  };
  return (
    <>
      <Background />
      <KeyboardAvoidingView
        style={loginStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>
          <Logo />
          <Text style={{ ...loginStyles.title }}>Sign Up</Text>
          <Text style={{ ...loginStyles.label }}>Nombre:</Text>
          <TextInput
            placeholder="Ingrese su nrombre"
            placeholderTextColor="rgba(255,255,255, 0.4)"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={e => onChange(e, 'name')}
            onSubmitEditing={onRegister}
            value={name}
            autoCapitalize="words"
            autoCorrect={false}
          />
          <Text style={{ ...loginStyles.label }}>Email:</Text>
          <TextInput
            placeholder="Ingrese su email"
            placeholderTextColor="rgba(255,255,255, 0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={e => onChange(e, 'email')}
            onSubmitEditing={onRegister}
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
            onSubmitEditing={onRegister}
            value={password}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onRegister}>
              <Text style={loginStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.replace('LogInScreen')}
            style={loginStyles.buttonReturn}>
            <Text style={loginStyles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUpScreen;
