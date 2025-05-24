import { ColumnDef } from '@tanstack/react-table';
import { Customer } from '@/store/api/v1/modules/customer.api';

const columns: ColumnDef<Customer>[] = [
  {
    header: 'Customer ID',

    accessorFn: row => row.customer_code || '--',
  },
  {
    header: 'Organization',

    accessorFn: row => row.org_name || '--',
  },
  {
    header: '2W Fleet Size',

    accessorFn: row => row.existing_fleet?.existing_2w_fleet_size || '--',
  },
  {
    header: '3W Fleet Size',

    accessorFn: row => row.existing_fleet?.existing_3w_fleet_size || '--',
  },
  {
    header: '4W Fleet Size',

    accessorFn: row => row.existing_fleet?.existing_4w_fleet_size || '--',
  },
];

export default columns;
