import { ColumnDef } from '@tanstack/react-table';
import type { Service } from '@/store/api/v1/types/service.types';
import dayjs from 'dayjs';

const columns: ColumnDef<Service>[] = [
  {
    accessorFn: row => row.vehicleStockMst?.reg_no,
    header: 'Registration No.',
    id: 'registrationNo',
  },
  {
    accessorFn: row => row.vehicleID,
    header: 'VIN',
    id: 'vin',
  },
  {
    accessorFn: row => row.requestID,
    header: 'Service Id',
    id: 'serviceId',
  },
  {
    accessorFn: row =>
      `${row.vehicleStockMst?.vehicleModelDetails?.manufacturer_name} ${row.vehicleStockMst?.vehicleModelDetails?.model_name}`,
    header: 'Make & Model',
    id: 'makeModel',
  },
  {
    accessorFn: row => row.vehicleStockMst?.city,
    header: 'City',
    id: 'city',
  },
  {
    accessorFn: row => row.vehicleStockMst?.fleetRequestDetails?.tranche,
    header: 'Tranche',
    id: 'tranche',
  },
  {
    accessorFn: row => row.vehicleStockMst?.fleetRequestDetails?.request_id,
    header: 'Fleet Req Id',
    id: 'fleetReqId',
  },
  {
    accessorFn: row => row.vehicleStockMst?.customerDetails?.org_name,
    header: 'Customer',
    id: 'customer',
  },
  {
    accessorFn: row => row.requestType,
    header: 'Service Type',
    id: 'serviceType',
  },
  {
    accessorFn: row => dayjs(row.scheduleDate).format('DD/MM/YYYY'),
    header: 'Due Date',
    id: 'dueDate',
  },
  {
    accessorFn: row => {
      const dueDate = dayjs(row.scheduleDate);
      const today = dayjs();
      return dueDate.diff(today, 'day');
    },
    header: 'Days Pending',
    id: 'daysPending',
  },
  {
    accessorFn: row =>
      row.totalOdometer || row.vehicleStockMst?.calculatedDashboard?.totalOdometer || 'N/A',
    header: 'Odometer Reading',
    id: 'odometerReading',
  },
  {
    accessorFn: row => row.vehicleStockMst?.vehicleModelDetails?.vehicle_category,
    header: 'Vehicle Category',
    id: 'vehicleCategory',
  },
];

export default columns;
