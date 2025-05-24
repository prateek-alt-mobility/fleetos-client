'use client';

import { useState } from 'react';
import { useFetchAllVehiclesQuery, Vehicle } from '@/store/api/v1/modules/vehicle.api';
import { DataTable } from '@/components/common/DataTable';
import columns from './columns';
import SearchBar from '@/components/common/SearchBar';
import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';
import { Dialog } from '@/components/common/Dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Vehicles = () => {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    model: '',
    year: '',
  });
  const [_selectedVehicles, setSelectedVehicles] = useState<Vehicle[]>([]);

  const { data, isLoading, error } = useFetchAllVehiclesQuery({
    limit: pageSize,
    page_no: pageNo + 1,
    sortField: 'calculatedDashboard.lastSeenAt',
    order: 'desc',
  });

  const vehicles = data?.result?.data?.data || [];
  const totalCount = data?.result?.data?.totalRows || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    // TODO: Implement filter logic
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setFilters({
      status: '',
      model: '',
      year: '',
    });
  };

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
          <Dialog
            open={isFilterOpen}
            onOpenChange={setIsFilterOpen}
            trigger={<Button label="Filters" leftIcon={<ListFilter />} size="sm" variant="ghost" />}
            title="Filter Vehicles"
            description="Apply filters to narrow down the vehicle list"
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
                <Label htmlFor="status">Status</Label>
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

              <div className="grid gap-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={filters.model}
                  onChange={e => handleFilterChange('model', e.target.value)}
                  placeholder="Enter vehicle model"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={filters.year}
                  onChange={e => handleFilterChange('year', e.target.value)}
                  placeholder="Enter vehicle year"
                  type="number"
                />
              </div>
            </div>
          </Dialog>
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
          onRowSelectionChange={setSelectedVehicles}
          enableRowSelection
        />
      </div>
    </div>
  );
};

export default Vehicles;
