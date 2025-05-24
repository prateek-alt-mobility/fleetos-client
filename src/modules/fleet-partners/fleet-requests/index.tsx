'use client';

import { useState } from 'react';

import { DataTable } from '@/components/common/DataTable';
import columns from './columns';
import SearchBar from '@/components/common/SearchBar';
import { Button } from '@/components/ui/button';
import { Download, Plus } from 'lucide-react';
import { useFetchAllFleetRequestsQuery } from '@/store/api/v1/modules/customer.api';

const FleetRequests = () => {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');

  const { data, isLoading, error } = useFetchAllFleetRequestsQuery({
    limit: pageSize,
    page_no: pageNo + 1,
    sortField: 'created_date',
    order: 'asc',
    searchText: search,
  });

  const fleetRequests = data?.result?.data?.data || [];
  const totalCount = data?.result?.data?.totalRows || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading fleet requests</div>;
  }

  return (
    <div className="">
      <div className="actions flex justify-between items-center">
        <SearchBar
          value={search}
          onChange={setSearch}
          className="w-96"
          placeholder="Search by request ID, customer name, or vehicle type"
        />
        <div className="flex gap-2">
          <Button leftIcon={<Plus />} label="New Request" />
          <Button leftIcon={<Download />} label="Download" variant="outline" />
        </div>
      </div>
      <div className="mt-4">
        <DataTable
          columns={columns}
          data={fleetRequests}
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

export default FleetRequests;
