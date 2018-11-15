import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const UsersMap = props => {
	return(
		<View style={styles.mapContainer} >
			<MapView 
			    region={props.myLocation} 
			    showsUserLocation={true}
				style={styles.map} 
			>
				<MapViewDirections
					origin={props.myLocation}
					destination="44.49,11.34"
				    apikey="AIzaSyD1saWNvYTd_v8sfbPB8puL7fvxKdjcfF0"
				    strokeWidth={3}
            		strokeColor="hotpink"
            		mode="walking"
				/>
			</MapView>
		</View>
	);
};

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: 200,
    marginTop: 20
  },
  map: {
    width: '100%',
    height: '100%'
  }
});

export default UsersMap;


/*
in order to enable geolocation in the background, you need to 
	add location as a background mode in the 'Capabilities' tab in Xcode.
*/