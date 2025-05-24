'use client';

import { useFetchAllMapVehiclesQuery } from '@/store/api/v1/modules/vehicle.api';
import { GoogleMap, useJsApiLoader, MarkerF, MarkerClusterer } from '@react-google-maps/api';

const FleetMap = () => {
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

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: 'calc(100vh - 100px)' }}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: false,
          cameraControl: false,
          styles: [
            {
              featureType: 'all',
              elementType: 'all',
              stylers: [{ saturation: -100 }, { lightness: 0 }, { gamma: 1 }],
            },
          ],
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
