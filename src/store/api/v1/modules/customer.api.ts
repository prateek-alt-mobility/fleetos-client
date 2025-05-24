import { v1Api } from '..';

enum CUSTOMER_API_ENDPOINTS {
  FETCH_ALL_CUSTOMERS = 'customer.fetchCustomersList',
  FETCH_ALL_FLEET_REQUESTS = 'fleetRequest.fleetRequestsList',
}

export interface ExistingFleet {
  existing_2w_fleet_size: string;
  existing_3w_fleet_size: string;
  existing_4w_fleet_size: string;
}

export interface Customer {
  cust_id: number;
  org_name: string;
  customer_code: string;
  existing_fleet: ExistingFleet | null;
}

interface CustomerResponse {
  result: {
    data: {
      data: {
        data: Customer[];
        totalRows: number;
      };
      message: string;
    };
  };
}

export interface FleetRequestAddOnServices {
  id: number;
  fleet_req_id: number;
  rsa_and_breakdown_support_charges: number | null;
  rsa_in_ev_management: boolean;
  comprehensive_amc_charges: number | null;
  comprehensive_amc_in_ev_management: boolean;
  fleetos_charge: number | null;
  fleetos_charge_in_ev_management: boolean;
  fleetos_api_charges: number | null;
  fleetos_api_charges_in_ev_management: boolean;
  battery_protect_insurance: number | null;
  battery_protect_insurance_in_ev_management: boolean;
  income_protect_insurance: number | null;
  income_protect_insurance_in_ev_management: boolean;
  charging_charges: number | null;
  charging_charges_in_ev_management: boolean;
  parking_charges: number | null;
  parking_charges_in_ev_management: boolean;
  tyre_replacement_charge: number | null;
  tyre_replacement_charge_in_ev_management: boolean;
  tyre_replacement_km: number | null;
}

export interface FleetRequestCommercialTerms {
  lease_rental_with_gst: number;
  lease_rental_without_gst: number;
  ev_management_fees_with_gst: number | null;
  ev_management_fees_without_gst: number | null;
  lease_start_date: string;
  lease_end_date: string;
}

export interface FleetRequestLenderConvenants {
  lender_name: string;
  lessor_name: string;
}

export interface FleetRequest {
  fleet_req_Id: number;
  request_id: string;
  number_of_vehicles: number;
  city: string;
  tranche: string;
  est_delivery_date: string | null;
  fleetRequestsAddOnServices: FleetRequestAddOnServices | null;
  fleetRequestsCommercialTerms: FleetRequestCommercialTerms | null;
  customer_mst: {
    org_name: string;
  };
  fleetRequestsLenderConvenants: FleetRequestLenderConvenants | null;
}

interface FleetRequestResponse {
  result: {
    data: {
      data: FleetRequest[];
      totalRows: number;
    };
  };
}

type FetchPayload = {
  page_no: number;
  limit: number;
  sortField: string;
  order: string;
  searchText?: string;
};

export const customerApi = v1Api.injectEndpoints({
  endpoints: build => ({
    fetchAllCustomers: build.query<CustomerResponse, FetchPayload>({
      query: payload => ({
        url: CUSTOMER_API_ENDPOINTS.FETCH_ALL_CUSTOMERS + `?input=${JSON.stringify(payload)}`,
        method: 'GET',
      }),
    }),
    fetchAllFleetRequests: build.query<FleetRequestResponse, FetchPayload>({
      query: payload => ({
        url: CUSTOMER_API_ENDPOINTS.FETCH_ALL_FLEET_REQUESTS + `?input=${JSON.stringify(payload)}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useFetchAllCustomersQuery, useFetchAllFleetRequestsQuery } = customerApi;
