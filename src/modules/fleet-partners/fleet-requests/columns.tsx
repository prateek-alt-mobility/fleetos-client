import { FleetRequest } from '@/store/api/v1/modules/customer.api';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

const columns: ColumnDef<FleetRequest>[] = [
  {
    accessorKey: 'request_id',
    header: 'Request ID',
  },
  {
    accessorKey: 'customer_mst.org_name',
    header: 'Organization',
  },
  {
    accessorKey: 'number_of_vehicles',
    header: 'No. of Vehicles',
  },
  {
    accessorKey: 'fleetRequestsCommercialTerms.lease_rental_with_gst',
    header: 'Lease Rental',
    cell: ({ row }) => {
      const value = row.original.fleetRequestsCommercialTerms?.lease_rental_with_gst;
      return value ? `₹${value.toLocaleString()}` : '-';
    },
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    header: 'EV Management Fees',
    cell: ({ row }) => {
      const value = row.original.fleetRequestsCommercialTerms?.ev_management_fees_with_gst;
      return value ? `₹${value.toLocaleString()}` : '-';
    },
  },
  {
    header: 'Lease Start Date',
    cell: ({ row }) => {
      const value = row.original.fleetRequestsCommercialTerms?.lease_start_date;
      return value ? dayjs(value).format('MMM DD, YYYY') : '-';
    },
  },
  {
    header: 'Lease End Date',
    cell: ({ row }) => {
      const value = row.original.fleetRequestsCommercialTerms?.lease_end_date;
      return value ? dayjs(value).format('MMM DD, YYYY') : '-';
    },
  },
  {
    accessorKey: 'tranche',
    header: 'Tranche',
    cell: ({ row }) => {
      const tranche = row.getValue('tranche') as string;
      return tranche.trim();
    },
  },

  {
    accessorKey: 'fleetRequestsLenderConvenants.lender_name',
    header: 'Lender Name',
    cell: ({ row }) => {
      return row.original.fleetRequestsLenderConvenants?.lender_name || '-';
    },
  },
  {
    accessorKey: 'fleetRequestsLenderConvenants.lessor_name',
    header: 'Lessor Name',
    cell: ({ row }) => {
      return row.original.fleetRequestsLenderConvenants?.lessor_name || '-';
    },
  },
];

export default columns;
