'use client';
import {
  useFetchAlertsCountQuery,
  useFetchServiceRequestCountsQuery,
} from '@/store/api/v1/modules/homepage.api';
import {
  BatteryWarning,
  ClockAlert,
  FileText,
  FolderSync,
  Thermometer,
  WifiOff,
  Wrench,
} from 'lucide-react';
import { BsGraphDown } from 'react-icons/bs';
import { FaCarOn } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Alerts = () => {
  const [alerts, setAlerts] = useState<
    {
      alertName: string;
      count: number | string;
      accessKey: string;
      Icon: React.ElementType;
    }[]
  >([]);
  const { data: alertsCountData } = useFetchAlertsCountQuery();
  const alertsCount = alertsCountData?.result?.data;
  const { data: serviceRequestCountData } = useFetchServiceRequestCountsQuery();
  const serviceRequestCounts = serviceRequestCountData?.result?.data;

  useEffect(() => {
    if (alertsCount && serviceRequestCounts) {
      setAlerts([
        {
          alertName: 'Vehicles Offline',
          count: alertsCount.vehicleOffline,
          accessKey: 'vehicleOffline',
          Icon: WifiOff,
        },
        {
          alertName: 'Due for Service',
          count: serviceRequestCounts.due,
          accessKey: 'serviceDue',
          Icon: Wrench,
        },
        {
          alertName: 'Overdue for Service',
          count: serviceRequestCounts.overdue,
          accessKey: 'serviceOverDue',
          Icon: ClockAlert,
        },
        {
          alertName: 'Deep Discharge',
          count: alertsCount.deepDischarge,
          accessKey: 'deepDischarge',
          Icon: BatteryWarning,
        },
        {
          alertName: 'Insurance Renewal',
          count: alertsCount.insuranceRenewal,
          accessKey: 'insuranceRenewal',
          Icon: FolderSync,
        },
        {
          alertName: 'Low Utilization',
          count: alertsCount.lowUtilization,
          accessKey: 'lowUtilization',
          Icon: BsGraphDown,
        },
        {
          alertName: 'Cell Imbalance Alert',
          // count: alertsCount.cellImbalanceAlert,
          count: '--',
          accessKey: 'cellImbalanceAlert',
          Icon: BatteryWarning,
        },
        {
          alertName: 'Vehicles with Faults',
          count: '--',
          // count: alertsCount.vehiclesWithFault,
          accessKey: 'vehiclesWithFault',
          Icon: FaCarOn,
        },
        {
          alertName: 'Low Charge',
          count: '--',
          // count: alertsCount.lowCharge,
          accessKey: 'lowCharge',
          Icon: BatteryWarning,
        },
        {
          alertName: 'High Battery Temperature',
          count: alertsCount.highBatteryTemperature,
          accessKey: 'highBatteryTemperature',
          Icon: Thermometer,
        },
        {
          alertName: 'RC document Expiry',
          count: alertsCount.rcDocumentExpiry,
          accessKey: 'rcDocumentExpiry',
          Icon: FileText,
        },
      ]);
    }
  }, [alertsCount, serviceRequestCounts]);

  return (
    <div className="border flex flex-col gap-4 rounded-lg p-4">
      <div className="hearder flex items-center justify-between">
        <h2 className="text-lg font-medium">Alerts</h2>
        <Button label="View All" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {alerts.length > 0 &&
          alerts.map(alert => (
            <div
              key={alert.accessKey}
              className="col-span-1 border p-4 rounded cursor-pointer flex gap-4"
            >
              <div className="bg-primary h-10 w-10 flex items-center justify-center text-white rounded-full p-2">
                <alert.Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-medium">{alert.count}</div>
                <div className="text-xs text-gray-500">{alert.alertName}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Alerts;
