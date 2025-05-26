'use client';
import { useFetchFleetInfoParametersQuery } from '@/store/api/v1/modules/homepage.api';

const Network = () => {
  const { data: fleetInfo } = useFetchFleetInfoParametersQuery();
  console.log(fleetInfo);
  return <div>Network</div>;
};

export default Network;
