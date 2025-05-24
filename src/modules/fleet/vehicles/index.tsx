'use client';

import { useState } from 'react';
import { useFetchAllVehiclesQuery } from '@/store/api/v1/modules/vehicle.api';
import { DataTable } from '@/components/common/DataTable';
import columns from './columns';
import SearchBar from '@/components/common/SearchBar';
import { Button } from '@/components/ui/button';

const Vehicles = () => {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const { data, isLoading, error } = useFetchAllVehiclesQuery({
    limit: pageSize,
    page_no: pageNo + 1,
    sortField: 'calculatedDashboard.lastSeenAt',
    order: 'desc',
  });

  const vehicles = data?.result?.data?.data || [];
  const totalCount = data?.result?.data?.totalRows || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading vehicles</div>;
  }

  return (
    <div className="">
      <div className="actions flex justify-between items-center">
        <SearchBar
          value={search}
          onChange={setSearch}
          className="w-96"
          placeholder="Search by vehicle ID, registration number, or model"
        />
        <div className="flex gap-2">
          <Button label="Add Vehicle" variant="default" />
          <Button label="Add Vehicle" variant="secondary" />
        </div>
      </div>
      <div className="mt-4">
        <DataTable
          columns={columns}
          data={vehicles}
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

export default Vehicles;
