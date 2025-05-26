export interface VehicleModelDetails {
  model_id: number;
  model_name: string;
  manufacturer_name: string;
  manufacturer_id: number;
  vehicle_category: string;
  vehicle_images: {
    front: string;
    back: string;
    left: string;
    right: string;
  };
  status: number;
  created_date: string;
  modified_date: string;
  vehicle_model_id: string;
  immobilize_available: boolean;
  created_by: string;
  updated_by: string;
  vehicleLeasePlans: object[];
  VehicleModelBattery: null;
  VehicleModelService: null;
  VehicleModelSummary: null;
}

export interface CalculatedDashboard {
  id: string;
  iotConnected: boolean;
  batteryPercentage: number;
  driveMode: null;
  createdAt: string;
  updatedAt: string;
  imei: string;
  addressGeocode: null;
  ambientTemp: null;
  batteryCurrent: null;
  batteryEfficiency: null;
  batteryHealth: null;
  batteryTemp: null;
  batteryUsage: null;
  batteryVitalScore: null;
  behaviorAccelaration: null;
  behaviorBraking: null;
  behaviorLastUpdated: null;
  behaviorOverspeed: null;
  chargeCycles: null;
  co2Saved: null;
  controllerTemp: null;
  distanceToEmpty: null;
  estResaleVal: null;
  fuelSaved: null;
  lastSeenAt: string;
  latitude: number;
  leaseStartReading: null;
  locationLastUpdated: string;
  longitude: number;
  motorTemp: null;
  remainingBatteryCapacity: null;
  resaleValComparison: null;
  totalBatteryCapacity: null;
  totalEnergy: null;
  vehicleCondition: string;
  vehicleEfficiency: null;
  charging: null;
  lastSpeed: null;
  maxSpeed: null;
  stopsForTheDay: null;
  totalOperationalHours: null;
  batteryVoltage: null;
  distanceTravelledToday: number;
  distanceTravelledTodayNew: number;
  totalOdometer: null;
  vehicle_id: string;
  daily_avg_speed: null;
  daily_speed_count: number;
  monthly_runtime: null;
  monthly_distance_travelled: null;
  latitude_direction: null;
  longitude_direction: null;
  daily_odometer_start: null;
  averageBatteryTemp: null;
  totalDischargeCurrent: null;
  totalChargeCurrent: null;
  totalDischargeCurrentAtHighTemprature: null;
  totalChargeCurrentAtHighTemprature: null;
  additional_fields: null;
  ignition: boolean;
  delta_odometer: null;
  delta_time: null;
  lastDataReceivedAt: string;
}

export interface FleetRequestAssetCommercial {
  gross_price: number;
  net_ex_showroom_price: number;
  total_on_road_price: number;
}

export interface FleetRequestCommercialTerms {
  lease_end_date: string;
  lease_start_date: string;
}

export interface FleetRequestDetails {
  tranche?: string;
  fleetRequestsAssetCommercial?: FleetRequestAssetCommercial;
  fleetRequestsCommercialTerms: FleetRequestCommercialTerms;
}

export interface VehicleData {
  vehicle_id: string;
  reg_no: string;
  city: string;
  model_id: number;
  mfg_year: number;
  ex_showroom_price: null;
  hypotecation: string;
  insurer: string;
  insurance_policy_no: string;
  insurance_validity: null;
  insurance_coverage: null;
  insured_value: number;
  insurance_premium: number;
  chasis_no: string;
  battery_serial_no_1: string;
  battery_serial_no_2: string;
  battery_serial_no_3: string;
  battery_make: string;
  battery_capacity: number;
  battery_connector_type: string;
  motor_serial_no: string;
  controller_no: string;
  surepassValidation: null;
  charger_Id: string;
  charger_rating: string;
  rto: string;
  iot_sNumber: null;
  m2msim_no: string;
  sim_id: string;
  imsi_no: string;
  warehouse_address: string;
  status: string;
  created_date: string;
  modified_date: string;
  fleet_req_id: null;
  cust_id: null;
  customer_name: string;
  lease_start_date: null;
  dealer_name: string;
  liability_cover_end_date: null;
  liability_cover_start_date: null;
  own_damage_end_date: null;
  own_damage_start_date: null;
  additional_fields: null;
  onboarding_date: null;
  date_of_deployment: null;
  challan_api_hit_date: null;
  source: null;
  immobilization_status: string;
  asset_type: string;
  battery_details: null;
  hub_id: null;
  deliveryChallanDetailsId: null;
  customerDetails: null;
  imeiDeviceMapping: {
    battery_serial_no_1: string;
  };
  monthlyVehicleLogs: object[];
  calculatedDashboard: CalculatedDashboard;
  vehicleModelDetails: VehicleModelDetails;
  fleetRequestDetails: FleetRequestDetails | null;
  insuranceDetails: Array<{
    validity: string;
  }>;
  vehicleImmobilizationStatus: null;
  DailyVehicleRating: object[];
  hubDetails: null;
}

export interface DailyDistance {
  day: string;
  distance: number;
}

export interface WeeklyRuntime {
  day: string;
  operationalHours: number;
}

export interface FetchVehicleDetailsResponse {
  statusCode: number;
  status: string;
  message: string;
  data: {
    data: VehicleData;
    vehicleLocationHistory: object[];
    dailyDistanceList: DailyDistance[];
    weeklyRuntime: WeeklyRuntime[];
    monthlyDistanceList: object[];
    weeklyDistanceList: object[];
    immobilizationStatus: string;
  };
}
