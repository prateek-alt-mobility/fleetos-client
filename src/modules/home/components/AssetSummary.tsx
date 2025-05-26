'use client';
import { useFetchAssetSummaryDashboardParametersQuery } from '@/store/api/v1/modules/homepage.api';
import { FaMotorcycle } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import { PiCarProfileFill } from 'react-icons/pi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CategoryIconMap: Record<string, React.ReactNode> = {
  '2': <FaMotorcycle className="h-5 w-5" />,
  '3': <TbTruckDelivery className="h-5 w-5" />,
  '4': <PiCarProfileFill className="h-5 w-5" />,
};

const AssetSummary = () => {
  const { data: assetSummaryData } = useFetchAssetSummaryDashboardParametersQuery();
  const assetSummary = assetSummaryData?.result?.data?.dashAssetData || [];
  const totalFleetSize = assetSummaryData?.result?.data?.totalFleetSize;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Asset Summary</CardTitle>
        <div className="text-sm font-medium">Total Fleet Size: {totalFleetSize}</div>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="h-10 px-4 text-left font-medium">Category</th>
                <th className="h-10 px-4 text-center font-medium">Active</th>
                <th className="h-10 px-4 text-center font-medium">Inactive</th>
                <th className="h-10 px-4 text-center font-medium">Due for Service</th>
                <th className="h-10 px-4 text-center font-medium">Being Serviced</th>
                <th className="h-10 px-4 text-center font-medium">Utilization</th>
              </tr>
            </thead>
            <tbody>
              {assetSummary?.map(item => (
                <tr key={item.category} className="border-b transition-colors hover:bg-muted/50">
                  <td className="h-12 px-4">
                    <div className="flex items-center gap-2">
                      {CategoryIconMap[item.category]}
                      <span>{item.category}W</span>
                    </div>
                  </td>
                  <td className="h-12 px-4 text-center">{item.active || 0}</td>
                  <td className="h-12 px-4 text-center">{item.inactive || 0}</td>
                  <td className="h-12 px-4 text-center">{item.dueForService || 0}</td>
                  <td className="h-12 px-4 text-center">{item.beingServiced || 0}</td>
                  <td className="h-12 px-4 text-center">{item.utilization || 0}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetSummary;
