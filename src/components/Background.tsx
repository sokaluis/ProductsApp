import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { height: heightScreen, width: widthScreen } = Dimensions.get('screen');

export const Background = () => {
  return <View style={{ ...styles.container }} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#5856D6',
    width: widthScreen * 2,
    height: heightScreen * 1.5,
    top: -250,
    transform: [
      {
        rotate: '-70deg',
      },
    ],
  },
});
