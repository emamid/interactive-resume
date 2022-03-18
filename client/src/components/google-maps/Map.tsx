import React, { FC, useEffect, useRef, useState } from 'react';

import { Wrapper, Status } from '@googlemaps/react-wrapper';

import { useDeepCompareEffectForMaps } from './utils';

const renderStatus = (status: Status) => {
	return <div>{status}</div>;
};

interface MapProps extends google.maps.MapOptions {
	style?: { [key: string]: string };
	onClick?: (event: google.maps.MapMouseEvent) => void;
	onIdle?: (map: google.maps.Map) => void;
}

interface MapWrapperProps extends MapProps {
	apiKey: string;
}

const Map: FC<MapProps> = ({
	onClick,
	onIdle,
	style,
	...options
}: MapProps) => {
	const divRef = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<google.maps.Map>();

	useEffect(() => {
		if (divRef.current && !map) {
			setMap(
				new window.google.maps.Map(divRef.current, {
					center: {
						lat: 39.734116390299974,
						lng: -100.69986152084358
					},
					zoom: 5
				})
			);
		}
	}, [divRef, map]);

	useDeepCompareEffectForMaps(() => {
		map?.setOptions(options);
	}, [map, options]);

	return <div ref={divRef} style={style} />;
};

const MapWithGoogle: FC<MapWrapperProps> = ({ apiKey }: MapWrapperProps) => {
	return (
		<Wrapper apiKey={apiKey} render={renderStatus}>
			<Map />
		</Wrapper>
	);
};

export default MapWithGoogle;
