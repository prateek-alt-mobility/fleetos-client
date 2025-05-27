import AssetSummary from './components/AssetSummary';
import Alerts from './components/Alerts';
import InputOtp from '@/components/common/InputOtp';
// import Network from './components/Network';

const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <AssetSummary />
      {/* <Network /> */}
      <Alerts />
    </div>
  );
};

export default Home;
