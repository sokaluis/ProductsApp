import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export const Logo = () => {
  return (
    <View style={{ ...styles.container }}>
      <Image
        source={require('../assets/react-logo-white.png')}
        style={{ ...styles.image }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 110,
    height: 100,
  },
});
