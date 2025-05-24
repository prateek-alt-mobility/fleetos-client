'use client';

import { useState } from 'react';
import { useFetchAllCustomersQuery } from '@/store/api/v1/modules/customer.api';
import { DataTable } from '@/components/common/DataTable';
import columns from './columns';
import SearchBar from '@/components/common/SearchBar';
import { Button } from '@/components/ui/button';
import { Download, Plus } from 'lucide-react';

const Customers = () => {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');

  const { data, isLoading, error } = useFetchAllCustomersQuery({
    limit: pageSize,
    page_no: pageNo + 1,
    sortField: 'cust_id',
    order: 'asc',
    searchText: search,
  });

  const customers = data?.result?.data?.data?.data || [];
  const totalCount = data?.result?.data?.data?.totalRows || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading customers</div>;
  }

  return (
    <div className="">
      <div className="actions flex justify-between items-center">
        <SearchBar
          value={search}
          onChange={setSearch}
          className="w-96"
          placeholder="Search by customer name, email, or phone"
        />
        <div className="flex gap-2">
          <Button leftIcon={<Plus />} label="Add Customer" />
          <Button leftIcon={<Download />} label="Download" variant="outline" />
        </div>
      </div>
      <div className="mt-4">
        <DataTable
          columns={columns}
          data={customers}
          pagination
          pageNo={pageNo}
          setPageNo={setPageNo}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalPages={totalPages}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
};

export default Customers;
