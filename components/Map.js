import React from 'react';
import { View, Stylesheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const UserMap = props => {
	return (
		<View>
			<MapView style={styles.map}/>
		</View>

	);
};

const styles = Stylesheet.create({
	mapContainer: {
		width: '100%',
		height: 200
	},
	map: {
		width: '100%',
		height: '100%'
	}
})

/*
in order to enable geolocation in the background, you need to 
	add location as a background mode in the 'Capabilities' tab in Xcode.



*/
