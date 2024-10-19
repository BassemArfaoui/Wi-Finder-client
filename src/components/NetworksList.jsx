import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Network from './Network';
import Spinner from './Spinner';
import WifiOffRoundedIcon from '@mui/icons-material/WifiOffRounded';

function NetworksList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['discoveredNetworks'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/discover-networks');
      return response.data;
    },
    refetchInterval: 1000, // Refetch every 1 second for live updates
    refetchOnWindowFocus: false, // Avoid refetching when the window regains focus
  });

  // Handle loading state
  if (isLoading) {
    return <div><Spinner/></div>;
  }

  // Handle error state
  if (error) {
    return <div className='h-100 d-flex justify-content-center align-items-center fw-bold fs-4 text-danger'>Error Fetching Nearby Networks 😿</div>;
  }

  // Display networks list
  const networks = data || [];

  return (
    <div className='w-100' style={{height:'85vh',overflow:'auto'}}>
      {networks.length >0 && <h3 className='text-center fw-bolder fs-1 mb-4 mt-3'>Discovered Wi-Fi Networks</h3>}
      {networks.length > 0 ? (
        <div className='px-3 d-flex flex-column gap-2 pb-5 pt-2'>
          {networks.map((network, index) => (
              <Network key={index} ssid={network.SSID} bssid={network.BSSID} signalStrength={network['Signal Strength']} />
          ))}
        </div>
      ) : (
        <div className='h-100 d-flex justify-content-center align-items-center fw-bold fs-4 text-primary'> <span className='me-2'>No Networks Found </span><span><WifiOffRoundedIcon className='mb-2 fs-3'/></span></div>
      )}
    </div>
  );
}

export default NetworksList;
