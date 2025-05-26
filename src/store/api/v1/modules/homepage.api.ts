import { v1Api } from '..';

enum HOMEPAGE_API_ENDPOINTS {
  FETCH_ASSET_SUMMARY = '/home.getAssetSummaryDashboardParameters',
  FETCH_FLEET_INFO_PARAMETERS = '/home.fleetInfoParameters',
  FETCH_ALERTS_COUNT = '/alert.getCountForAlerts',
  FETCH_SERVICE_REQUESTS_COUNT = '/ecosystem.serviceRequestCounts?input={}',
}

interface DashAssetData {
  category: string;
  active: number;
  inactive: number;
  dueForService: number;
  beingServiced: number;
  utilization: string;
}

interface AssetSummaryDashboardResponse {
  totalFleetSize: number;
  dashAssetData: DashAssetData[];
}

interface FleetInfoParametersResponse {
  driverCount: number;
  garageCount: number;
  cityCount: number;
  oemCount: number;
  fleetPartnersCount: number;
}

interface AlertsCountResponse {
  vehiclesWithFault: number;
  highBatteryTemperature: number;
  cellImbalanceAlert: number;
  lowUtilization: number;
  lowCharge: number;
  vehicleOffline: number;
  deepDischarge: number;
  insuranceRenewal: number;
  rcDocumentExpiry: number;
  serviceDue: number;
  serviceOverDue: number;
}

interface ServiceRequestCountsResponse {
  inService: number;
  completed: number;
  due: number;
  overdue: number;
  freeService: number;
  paidService: number;
  onTimePercentage: string;
  preventiveServices: number;
  accidents: number;
  breakdown: number;
}

type ApiResponse<T> = {
  result: {
    data: T;
  };
};

export const homepageApi = v1Api.injectEndpoints({
  endpoints: builder => ({
    fetchAssetSummaryDashboardParameters: builder.query<
      ApiResponse<AssetSummaryDashboardResponse>,
      void
    >({
      query: () => HOMEPAGE_API_ENDPOINTS.FETCH_ASSET_SUMMARY,
    }),
    fetchFleetInfoParameters: builder.query<ApiResponse<FleetInfoParametersResponse>, void>({
      query: () => HOMEPAGE_API_ENDPOINTS.FETCH_FLEET_INFO_PARAMETERS,
    }),
    fetchAlertsCount: builder.query<ApiResponse<AlertsCountResponse>, void>({
      query: () => HOMEPAGE_API_ENDPOINTS.FETCH_ALERTS_COUNT,
    }),
    fetchServiceRequestCounts: builder.query<ApiResponse<ServiceRequestCountsResponse>, void>({
      query: () => HOMEPAGE_API_ENDPOINTS.FETCH_SERVICE_REQUESTS_COUNT,
    }),
  }),
});

export const {
  useFetchAssetSummaryDashboardParametersQuery,
  useFetchFleetInfoParametersQuery,
  useFetchAlertsCountQuery,
  useFetchServiceRequestCountsQuery,
} = homepageApi;
