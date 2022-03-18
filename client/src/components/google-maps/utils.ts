import { EffectCallback, useEffect, useRef } from 'react';
import { createCustomEqual } from 'fast-equals';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';

// Copied from https://github.com/googlemaps/js-samples

const deepCompareEqualsForMaps = createCustomEqual(
	(deepEqual) => (a: any, b: any) => {
		if (
			isLatLngLiteral(a) ||
			a instanceof google.maps.LatLng ||
			isLatLngLiteral(b) ||
			b instanceof google.maps.LatLng
		) {
			return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
		}

		// TODO extend to other types

		// use fast-equals for other objects
		return deepEqual(a, b);
	}
);

export const useDeepCompareMemoize = (value: any) => {
	const ref = useRef();

	if (!deepCompareEqualsForMaps(value, ref.current)) {
		ref.current = value;
	}

	return ref.current;
}

export const useDeepCompareEffectForMaps = (
	callback: EffectCallback,
	dependencies: any[]
) => useEffect(callback, dependencies.map(useDeepCompareMemoize));
