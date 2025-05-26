import { nestApi } from '..';
import { FetchVehicleDetailsResponse } from '../types/vehicle.types';

enum VEHICLE_API_ENDPOINTS {
  FETCH_VEHICLE_DETAILS = 'vehicle/vehicles/get-details',
}

const vehicleApi = nestApi.injectEndpoints({
  endpoints: build => ({
    fetchVehicleDetails: build.query<FetchVehicleDetailsResponse, string>({
      query: (id: string) => ({
        url: VEHICLE_API_ENDPOINTS.FETCH_VEHICLE_DETAILS,
        params: {
          id,
        },
      }),
    }),
  }),
});

export const { useFetchVehicleDetailsQuery } = vehicleApi;
