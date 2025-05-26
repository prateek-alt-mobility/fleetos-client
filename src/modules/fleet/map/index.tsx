'use client';

import { useFetchAllMapVehiclesQuery } from '@/store/api/v1/modules/vehicle.api';
import { GoogleMap, useJsApiLoader, MarkerF, MarkerClusterer } from '@react-google-maps/api';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const lightModeStyles = [
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [{ saturation: -100 }, { lightness: 0 }, { gamma: 1 }],
  },
];

const darkModeStyles = [
  { elementType: 'geometry', stylers: [{ color: '#1a1d24' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#334155' }],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#334155' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#94a3b8' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#334155' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2937' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0f172a' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#64748b' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#475569' }, { weight: 1.2 }],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#475569' }, { weight: 1 }],
  },
];

const FleetMap = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const { data: vehiclesData } = useFetchAllMapVehiclesQuery({
    vehicle_category: 'ALL',
    vehicle_status: 'BOTH',
    vehicle_condition: 'All',
    iotConnected: true,
  });

  const vehicles = vehiclesData?.result?.data?.data || [];

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isLoaded || !mounted) return <div>Loading...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: 'calc(100vh - 61px)' }}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: false,
          cameraControl: false,
          styles: resolvedTheme === 'dark' ? darkModeStyles : lightModeStyles,
        }}
        center={{ lat: 20.5937, lng: 78.9629 }}
        zoom={5}
      >
        <MarkerClusterer>
          {clusterer => (
            <>
              {vehicles.map(vehicle => (
                <MarkerF
                  key={vehicle.vehicle_id}
                  position={{
                    lat: vehicle?.calculatedDashboard?.latitude,
                    lng: vehicle?.calculatedDashboard?.longitude,
                  }}
                  clusterer={clusterer}
                />
              ))}
            </>
          )}
        </MarkerClusterer>
      </GoogleMap>
    </div>
  );
};

export default FleetMap;
