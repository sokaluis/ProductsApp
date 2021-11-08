import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = () => {
  const { logOut, user, token } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Protected Screen</Text>
      <Button title="Log Out" onPress={logOut} />
      <Text>{JSON.stringify(user, null, 2)}</Text>
      <Text>Token: {token}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
