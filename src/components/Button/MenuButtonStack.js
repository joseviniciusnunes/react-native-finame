import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MenuButtonStack({ onPress }) {
  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
      <Ionicons name="ios-menu" size={32} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    width: 60,
    height: 45,
  },
});
