import { Vehicle } from '@/store/api/v1/modules/vehicle.api';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import Link from 'next/link';

const columns: ColumnDef<Vehicle>[] = [
  {
    header: 'Reg. No.',
    cell: ({ row }) => {
      const { original: data } = row;
      return <Link href={`/fleet/vehicles/${data?.vehicle_id}`}>{data?.reg_no ?? '--'}</Link>;
    },
  },
  {
    header: 'Vehicle ID',
    accessorFn: row => row?.vehicle_id ?? '--',
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
    accessorFn: row => row?.vehicleModelDetails?.vehicle_category ?? '--',
  },
  {
    header: 'Location',
    accessorFn: row => row?.city ?? '--',
  },
  {
    header: 'Vehicle Status',
    accessorFn: row => row?.calculatedDashboard?.vehicleCondition ?? '--',
  },
  {
    header: 'Last Seen',

    cell: ({ row }) => {
      const { original: data } = row;
      const lastSeen = data?.calculatedDashboard?.lastSeenAt || null;
      return lastSeen ? dayjs(lastSeen).format('DD MMM YYYY HH:mm') : 'N/A';
    },
  },
  {
    header: 'SoC',

    cell: ({ row }) => {
      const { original: data } = row;
      const battery = data?.calculatedDashboard?.batteryPercentage || null;
      return battery ? `${battery}%` : 'N/A';
    },
  },
  {
    header: 'Daily Distance Travelled',
    accessorFn: row => row?.calculatedDashboard?.distanceTravelledToday ?? '--',
  },
  {
    header: 'Inventory Status',
    accessorFn: row => row?.status ?? '--',
  },
  {
    header: 'Customer Name',
    accessorFn: row => row?.customerDetails?.org_name ?? '--',
  },
  {
    header: 'Tranche',
    accessorFn: row => row?.fleetRequestDetails?.tranche ?? '--',
  },
  {
    header: 'Lender Name',
    accessorFn: row => row?.fleetRequestDetails?.fleetRequestsLenderConvenants?.lender_name ?? '--',
  },
  {
    header: 'Fleet Request ID',
    accessorFn: row => row?.fleetRequestDetails?.request_id ?? '--',
  },
  {
    header: 'Lessor Name',
    accessorFn: row => row?.fleetRequestDetails?.fleetRequestsLenderConvenants?.lessor_name ?? '--',
  },
];

export default columns;
