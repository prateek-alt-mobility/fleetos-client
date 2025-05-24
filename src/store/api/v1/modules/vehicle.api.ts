import { v1Api } from '..';

enum VEHICLE_API_ENDPOINTS {
  FETCH_ALL_VEHICLES = '/vehicle.GetVehicleInventory',
}

interface VehicleModelDetails {
  model_id: number;
  model_name: string;
  manufacturer_name: string;
  vehicle_category: string;
  status: number;
  vehicle_model_id: string;
}

interface CustomerDetails {
  cust_id: number;
  org_name: string;
}

interface FleetRequestsLenderConvenants {
  lender_name: string;
  lessor_name: string;
}

interface FleetRequestDetails {
  cust_id: number;
  fleet_req_Id: number;
  tranche: string;
  request_id: string;
  sheet_request_id: string | null;
  fleetRequestsLenderConvenants: FleetRequestsLenderConvenants | null;
}

interface CalculatedDashboard {
  vehicleCondition: string;
  batteryPercentage: number | null;
  imei: string;
  iotConnected: boolean;
  latitude: number;
  longitude: number;
  lastSeenAt: string | null;
  distanceTravelledToday: number;
  distanceTravelledTodayNew: number | null;
}

export interface Vehicle {
  status: string;
  vehicle_id: string;
  chasis_no: string;
  reg_no: string | null;
  city: string | null;
  iot_sNumber: string | null;
  insurer: string | null;
  asset_type: string;
  battery_serial_no_1: string | null;
  customerDetails: CustomerDetails | null;
  vehicleModelDetails: VehicleModelDetails;
  calculatedDashboard: CalculatedDashboard | null;
  fleetRequestDetails: FleetRequestDetails | null;
  vehicleDetailsCompleted: boolean;
}

type FetchAllVehiclesResponse = {
  result: {
    data: {
      data: Vehicle[];
      totalRows: number;
    };
  };
};

export interface FetchAllVehiclesPayload {
  limit: number;
  page_no: number;
  sortField: string;
  order: 'asc' | 'desc';
}

export const vehicleApi = v1Api.injectEndpoints({
  endpoints: builder => ({
    fetchAllVehicles: builder.query<FetchAllVehiclesResponse, FetchAllVehiclesPayload>({
      query: payload => ({
        url: VEHICLE_API_ENDPOINTS.FETCH_ALL_VEHICLES + `?input=${JSON.stringify(payload)}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useFetchAllVehiclesQuery } = vehicleApi;
