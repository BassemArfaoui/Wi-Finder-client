import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Network from './Network';

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
    return <div>Loading networks...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error fetching networks: {error.message}</div>;
  }

  // Display networks list
  const networks = data || [];

  return (
    <div className='w-100' style={{height:'85vh',overflow:'auto'}}>
      <h3 className='text-center fw-bolder fs-1 mb-4 mt-3'>Discovered Wi-Fi Networks</h3>
      {networks.length > 0 ? (
        <div className='px-3 d-flex flex-column gap-2 pb-5 pt-2'>
          {networks.map((network, index) => (
              <Network key={index} ssid={network.SSID} bssid={network.BSSID} signalStrength={network['Signal Strength']} />
          ))}
        </div>
      ) : (
        <p>No networks found.</p>
      )}
    </div>
  );
}

export default NetworksList;
