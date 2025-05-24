import { Vehicle } from '@/store/api/v1/modules/vehicle.api';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

const columns: ColumnDef<Vehicle>[] = [
  {
    header: 'Reg. No.',
    accessorKey: 'reg_no',
  },
  {
    header: 'Vehicle ID',
    accessorKey: 'vehicle_id',
  },
  {
    header: 'Make & Model',

    cell: ({ row }) => {
      const { original: data } = row;
      const make = data?.vehicleModelDetails?.manufacturer_name || null;
      const model = data?.vehicleModelDetails?.model_name || null;
      return `${make} ${model}`;
    },
  },
  {
    header: 'Vehicle Category',
    accessorKey: 'vehicleModelDetails.vehicle_category',
  },
  {
    header: 'Location',
    accessorKey: 'city',
  },
  {
    header: 'Vehicle Status',
    accessorKey: 'calculatedDashboard.vehicleCondition',
  },
  {
    header: 'Last Seen',
    accessorKey: 'calculatedDashboard.lastSeenAt',

    cell: ({ row }) => {
      const { original: data } = row;
      const lastSeen = data?.calculatedDashboard?.lastSeenAt || null;
      return lastSeen ? dayjs(lastSeen).format('DD MMM YYYY HH:mm') : 'N/A';
    },
  },
  {
    header: 'SoC',
    accessorKey: 'calculatedDashboard.batteryPercentage',

    cell: ({ row }) => {
      const { original: data } = row;
      const battery = data?.calculatedDashboard?.batteryPercentage || null;

      return battery ? `${battery}%` : 'N/A';
    },
  },
  {
    header: 'Daily Distance Travelled',
    accessorKey: 'calculatedDashboard.distanceTravelledToday',
  },
  {
    header: 'Inventory Status',
    accessorKey: 'status',
  },
  {
    header: 'Customer Name',
    accessorKey: 'customerDetails.org_name',
  },
  {
    header: 'Tranche',
    accessorKey: 'fleetRequestDetails.tranche',
  },
  {
    header: 'Lender Name',
    accessorKey: 'fleetRequestDetails.fleetRequestsLenderConvenants.lender_name',
  },
  {
    header: 'Fleet Request ID',
    accessorKey: 'fleetRequestDetails.request_id',
  },
  {
    header: 'Lessor Name',
    accessorKey: 'fleetRequestDetails.fleetRequestsLenderConvenants.lessor_name',
  },
];

export default columns;
