import VehicleDetailsCard from './components/VehicleDetailsCard';
import VehicleTabs from './components/VehicleTabs';

const VehicleDetails = () => {
  return (
    <div className="flex flex-col gap-4">
      <VehicleDetailsCard />
      <VehicleTabs />
    </div>
  );
};

export default VehicleDetails;
