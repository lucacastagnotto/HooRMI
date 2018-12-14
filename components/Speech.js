import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Tts from 'react-native-tts';

const SpeechReader = props => {

  return(
    <TouchableOpacity title="Parlami">
      <View style={styles.button}>
        <Text style={styles.buttonText}>Parlami</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    alignItems: 'center'
  },
  button: {
    marginBottom: 60,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});

export default SpeechReader;
