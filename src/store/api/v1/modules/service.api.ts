import { v1Api } from '..';
import { Service, ServiceResponse } from '../types/service.types';

enum SERVICE_API_ENDPOINTS {
  FETCH_ALL_SERVICE_REQUEST = '/ecosystem.serviceRequestListing',
}
type FetchAllServicePayload = {
  page_no: number;
  limit: number;
  sortField: string;
  order: string;
  is_resolved: boolean;
  vehicle_status: string;
  vehicle_type: string;
};

export const serviceApi = v1Api.injectEndpoints({
  endpoints: build => ({
    fetchAllServiceRequests: build.query<ServiceResponse, FetchAllServicePayload>({
      query: payload => ({
        url: SERVICE_API_ENDPOINTS.FETCH_ALL_SERVICE_REQUEST,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});
