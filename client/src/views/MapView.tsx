import React from 'react';

import { withRouter, RouteComponentProps } from 'react-router';

import Map from '../components/google-maps/Map';

interface MapViewProps extends RouteComponentProps {}

const googleMapsKey = 'AIzaSyC7z-889WgwZ7WGmjXR76NqT5GAdFs6OTQ';

const MapView = ({ history }: MapViewProps) => {
	return (
		<>
			<Map apiKey={googleMapsKey}/>
		</>
	);
};

export default withRouter(MapView);
