'use client';
import { useFetchAssetSummaryDashboardParametersQuery } from '@/store/api/v1/modules/homepage.api';
import { FaMotorcycle } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import { PiCarProfileFill } from 'react-icons/pi';

const CategoryIconMap: Record<string, React.ReactNode> = {
  '2': <FaMotorcycle />,
  '3': <TbTruckDelivery />,
  '4': <PiCarProfileFill />,
};

const AssetSummary = () => {
  const { data: assetSummaryData } = useFetchAssetSummaryDashboardParametersQuery();
  const assetSummary = assetSummaryData?.result?.data?.dashAssetData || [];
  const totalFleetSize = assetSummaryData?.result?.data?.totalFleetSize;

  return (
    <div className="bg-white py-4 rounded-md border flex flex-col gap-3">
      <div className="flex justify-between items-center px-4">
        <div className="text-lg font-semibold">Asset Summary</div>
        <div className="text-lg font-semibold">Total Fleet Size: {totalFleetSize}</div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 h-12">
            <th className="text-center text-sm">Category</th>
            <th className="text-center text-sm">Active</th>
            <th className="text-center text-sm">Inactive</th>
            <th className="text-center text-sm">Due for Service</th>
            <th className="text-center text-sm">Being Serviced</th>
            <th className="text-center text-sm">Utilization</th>
          </tr>
        </thead>
        <tbody>
          {assetSummary?.map(item => (
            <tr key={item.category} className=" hover:bg-gray-50">
              <td className="h-12 text-sm text-center">
                <div className="flex items-center justify-center">
                  {item.category + 'W'}&nbsp;
                  {CategoryIconMap[item.category]}
                </div>
              </td>
              <td className="h-12 text-sm text-center">{item.active || 0}</td>
              <td className="h-12 text-sm text-center">{item.inactive || 0}</td>
              <td className="h-12 text-sm text-center">{item.dueForService || 0}</td>
              <td className="h-12 text-sm text-center">{item.beingServiced || 0}</td>
              <td className="h-12 text-sm text-center">{item.utilization || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetSummary;
