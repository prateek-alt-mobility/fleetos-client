import { v1Api } from '..';
import { ServiceResponse } from '../types/service.types';

enum SERVICE_API_ENDPOINTS {
  FETCH_ALL_SERVICE_REQUEST = '/ecosystem.serviceRequestListing',
}
type FetchAllServicePayload = {
  limit: number;
  page_no: number;
  sortField: string;
  order: string;
  is_resolved?: boolean;
  vehicle_status?: string;
  vehicle_category?: string;
  vehicle_number?: string;
};

export const serviceApi = v1Api.injectEndpoints({
  endpoints: build => ({
    fetchAllServiceRequests: build.query<ServiceResponse, FetchAllServicePayload>({
      query: payload => ({
        url: SERVICE_API_ENDPOINTS.FETCH_ALL_SERVICE_REQUEST + `?input=${JSON.stringify(payload)}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useFetchAllServiceRequestsQuery } = serviceApi;
