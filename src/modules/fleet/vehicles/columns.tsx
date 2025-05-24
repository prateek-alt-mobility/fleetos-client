import { Vehicle } from '@/store/api/v1/modules/vehicle.api';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: 'vehicle_id',
    header: 'Vehicle ID',
  },
  {
    accessorKey: 'reg_no',
    header: 'Registration No.',
  },
  {
    accessorKey: 'vehicleModelDetails.model_name',
    header: 'Model',
  },
  {
    accessorKey: 'vehicleModelDetails.manufacturer_name',
    header: 'Manufacturer',
  },
  {
    accessorKey: 'calculatedDashboard.batteryPercentage',
    header: 'Battery',
    cell: ({ row }) => {
      const { original: data } = row;
      const battery = data?.calculatedDashboard?.batteryPercentage || null;

      return battery ? `${battery}%` : 'N/A';
    },
  },
  {
    accessorKey: 'calculatedDashboard.lastSeenAt',
    header: 'Last Seen',
    cell: ({ row }) => {
      const { original: data } = row;
      const lastSeen = data?.calculatedDashboard?.lastSeenAt || null;
      return lastSeen ? dayjs(lastSeen).format('DD MMM YYYY HH:mm') : 'N/A';
    },
  },
  {
    accessorKey: 'city',
    header: 'Location',
  },
];

export default columns;
