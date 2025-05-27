export interface ServiceResponse {
  result: {
    data: {
      nextDataPoint: number;
      data: Service[];
      totalRows: number;
    };
  };
}

export interface Service {
  requestID: number;
  cust_id: number;
  vehicleID: string;
  requestType: string;
  pincode: string | null;
  scheduleDate: string;
  resolutionDate: string | null;
  contactName: string | null;
  contactNumber: string | null;
  vehicleStatus: string;
  createdAt: string;
  modifiedDate: string;
  paymentStatus: string;
  amount: number;
  report: string | null;
  remarks: string | null;
  isResolved: boolean;
  serviceGarageId: string | null;
  additionalDetails: string | null;
  totalOdometer: number | null;
  raisedBy: string;
  voiceNote: string | null;
  oemServiceId: string | null;
  batteryCapacity: string | null;
  batteryHealthCondition: string | null;
  dealerName: string | null;
  serviceStatus: string | null;
  serviceGarage: string | null;
  vehicleStockMst: VehicleStockMst;
  serviceRequestTags: any[];
  reportSignedUrl: string | null;
}

export interface VehicleStockMst {
  reg_no: string;
  vehicle_id: string;
  calculatedDashboard: {
    totalOperationalHours: number | null;
    totalOdometer: number | null;
  } | null;
  vehicleModelDetails: {
    model_name: string;
    manufacturer_name: string;
    vehicle_category: string;
  };
  city: string;
  customerDetails: {
    org_name: string;
    customer_code: string;
  } | null;
  fleetRequestDetails: {
    tranche: string;
    request_id: string;
  } | null;
}
