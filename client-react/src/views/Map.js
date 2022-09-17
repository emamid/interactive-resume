import React from 'react';
import PropTypes from 'prop-types';

import useGetEmployers from '../api/hooks/useGetEmployers';

import { withRouter } from 'react-router';

import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const apiKey = 'AIzaSyC7z-889WgwZ7WGmjXR76NqT5GAdFs6OTQ';

const Home = ({
	google,
	history,
}) => {

	const { data: employers } = useGetEmployers();

	return (
		<>
			<Map google={google} zoom={5} style={{ height: '100%', width: '100%' }} containerStyle={{ height: '100%', width: '100%' }} center={{
				lat: 39.734116390299974,
				lng: -100.69986152084358
			}}>
				{employers.map(
					employer => (
						<Marker
							key={employer.name}
							name={employer.name}
							title={employer.name}
							position={{ lat: employer.latitude, lng: employer.longitude }}
							id={employer.id}
							onClick={marker => {
								history.push(`/employers/${marker.id}`);
							}}
						/>
					)
				)}
			</Map>
		</>
	)

}

Home.propTypes = {
	employers: PropTypes.array.isRequired
};

export default withRouter(GoogleApiWrapper({ apiKey })(Home));
