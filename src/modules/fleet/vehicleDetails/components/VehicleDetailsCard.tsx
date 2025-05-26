'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';
import { useFetchVehicleDetailsQuery } from '@/store/api/nestService/modules/vehicle.api';
import { FetchVehicleDetailsResponse } from '@/store/api/nestService/types/vehicle.types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import TestChart from './TestChart';

dayjs.extend(relativeTime);
const VehicleDetailsCard = () => {
  const { id } = useParams();
  const { data: vehicleDetailsData } = useFetchVehicleDetailsQuery(id as string);
  const vehicleDetails = vehicleDetailsData?.data;
  const vehicle = vehicleDetails?.data;
  return (
    <div className="p-4 border rounded-lg flex justify-between gap-4">
      <div className="vehicle-image-container min-w-max">
        {vehicle?.vehicleModelDetails.vehicle_images.back && (
          <Image
            src={vehicle?.vehicleModelDetails.vehicle_images.front}
            alt="vehicle"
            width={250}
            height={250}
            priority
          />
        )}
      </div>
      <div className="vehicle-details w-full">
        <VehicleDetailsSection vehicleDetails={vehicleDetails!} />
      </div>
    </div>
  );
};

export default VehicleDetailsCard;

const VehicleDetailsSection = ({
  vehicleDetails,
}: {
  vehicleDetails: FetchVehicleDetailsResponse['data'];
}) => {
  const vehicle = vehicleDetails?.data;

  /**
   * Calculates the progress percentage of a lease period based on start and end dates
   *
   * @param startDateStr - The lease start date in DD/MM/YYYY format
   * @param endDateStr - The lease end date in DD/MM/YYYY format
   * @returns A number between 0-100 representing the percentage of lease period completed
   *
   * The function:
   * - Returns 0 if dates are invalid/missing or if current date is before start date
   * - Returns 100 if current date is after end date
   * - Otherwise calculates percentage based on days elapsed vs total days
   */
  const getLeaseProgressPercentage = (
    startDateStr: string | undefined | null,
    endDateStr: string | undefined | null
  ): number => {
    if (!startDateStr || !endDateStr) {
      console.log('Missing start or end date');
      return 0;
    }

    const startDate = dayjs(startDateStr, 'DD/MM/YYYY').startOf('day');
    const endDate = dayjs(endDateStr, 'DD/MM/YYYY').endOf('day');
    const today = dayjs().startOf('day');

    if (!startDate.isValid() || !endDate.isValid()) {
      return 0;
    }

    if (today.isBefore(startDate)) {
      return 0;
    }

    if (today.isAfter(endDate)) {
      return 100;
    }

    const totalDays = endDate.diff(startDate, 'days');
    const passedDays = today.diff(startDate, 'days');
    const percentage = (passedDays / totalDays) * 100;

    return Math.round(percentage);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="top-section">
        <div className="flex justify-between items-center">
          <div className="left">
            <div className="text-lg font-bold">{vehicle?.reg_no}</div>
            <div className="text-xs text-muted-foreground">
              last updated {dayjs(vehicle?.calculatedDashboard.lastDataReceivedAt).fromNow()}
            </div>
          </div>
          <div className="right">
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    label="Send to"
                    rightIcon={<ChevronDown className="w-4 h-4" />}
                    variant="outline"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Repossession</DropdownMenuItem>
                  <DropdownMenuItem>Audit</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    label="Logs"
                    rightIcon={<ChevronDown className="w-4 h-4" />}
                    variant="outline"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Audit Logs</DropdownMenuItem>
                  <DropdownMenuItem>IoT Logs</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button label="Immobilize" />
            </div>
            <div className="text-xs text-end text-muted-foreground mt-1">
              Immobilization Status : Not Available
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="left flex gap-2">
            <Badge variant="default">Badge</Badge>
            <Badge variant="default">Badge</Badge>
            <Badge variant="default">Badge</Badge>
          </div>
          <div className="right min-w-max flex gap-2 items-center">
            <div className="min-w-max text-sm">
              Lease Start:{' '}
              {vehicle?.fleetRequestDetails?.fleetRequestsCommercialTerms.lease_start_date
                ? dayjs(
                    vehicle?.fleetRequestDetails?.fleetRequestsCommercialTerms.lease_start_date
                  ).format('DD/MM/YYYY')
                : 'N/A'}
            </div>
            <div className="w-[120px]">
              <Slider
                value={[
                  getLeaseProgressPercentage(
                    vehicle?.fleetRequestDetails?.fleetRequestsCommercialTerms.lease_start_date,
                    vehicle?.fleetRequestDetails?.fleetRequestsCommercialTerms.lease_end_date
                  ),
                ]}
                max={100}
                trackClassName="!h-1"
                thumbClassName="!h-2.5 !w-2.5"
                rangeClassName="!bg-gradient-to-r !from-zinc-200 !via-zinc-500 !to-black !border-none"
              />
            </div>
            <div className="min-w-max text-sm">
              Lease End:{' '}
              {vehicle?.fleetRequestDetails?.fleetRequestsCommercialTerms.lease_end_date
                ? dayjs(
                    vehicle?.fleetRequestDetails?.fleetRequestsCommercialTerms.lease_end_date
                  ).format('DD/MM/YYYY')
                : 'N/A'}
            </div>
          </div>
        </div>
      </div>
      <div className="separator bg-muted w-full h-[1px]" />
      <div className="bottom-section flex justify-between items-center">
        <div className="left">LEFT</div>
        <div className="right">
          <TestChart />
        </div>
      </div>
    </div>
  );
};
