import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FetchLocation = props => {
    return (
        <TouchableOpacity title="Get Location" onPress={props.onGetLocation}>
        	<View style={styles.button}>
            	<Text style={styles.buttonText}>Get Location</Text>
          	</View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});


export default FetchLocation;