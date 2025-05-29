'use client';

import { useState } from 'react';
import { DataTable } from '@/components/common/DataTable';
import columns from './columns';
import SearchBar from '@/components/common/SearchBar';
import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';
import { Dialog } from '@/components/common/Dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFetchAllServiceRequestsQuery } from '@/store/api/v1/modules/service.api';

const ServiceDue = () => {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [search, setSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'both',
    priority: '',
    vehicle_category: 'ALL',
  });

  const { data, isLoading, error } = useFetchAllServiceRequestsQuery({
    limit: pageSize,
    page_no: pageNo + 1,
    sortField: 'requestID',
    order: 'asc',
    is_resolved: false,
    vehicle_status: filters.status,
    vehicle_category: filters.vehicle_category,
    vehicle_number: search,
  });

  const serviceDueItems = data?.result?.data?.data || [];
  const totalCount = data?.result?.data?.totalRows || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setFilters({
      status: 'both',
      priority: '',
      vehicle_category: 'ALL',
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading service due items</div>;
  }

  return (
    <div className="">
      <div className="actions flex justify-between items-center">
        <SearchBar
          value={search}
          onChange={setSearch}
          className="w-96"
          placeholder="Search by service ID, vehicle, or type"
        />
        <div className="flex gap-2">
          <Dialog
            open={isFilterOpen}
            onOpenChange={setIsFilterOpen}
            trigger={<Button label="Filters" leftIcon={<ListFilter />} size="sm" variant="ghost" />}
            title="Filter Service Due Items"
            description="Apply filters to narrow down the service due list"
            footer={
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleResetFilters}>
                  Reset
                </Button>
                <Button label="Apply" onClick={handleApplyFilters} />
              </div>
            }
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Vehicle Status</Label>
                <Select
                  value={filters.status}
                  onValueChange={value => handleFilterChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
      <div className="mt-4">
        <DataTable
          columns={columns}
          data={serviceDueItems}
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

export default ServiceDue;
