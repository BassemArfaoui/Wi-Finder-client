import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Network from './Network';

function LiveSignal() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['signalStrength'], // Use 'queryKey' instead of the first argument
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/signal-strength');
      return response.data;
    },
    refetchInterval: 2000, 
  });

  const seeGraph = async() => {
    try
    {
      const response = await axios.get('http://localhost:8000/show-graph');
      if(response.data.error)
      {
        throw new Error('Failed to show graph');
      }
    } catch (error) {
      console.error('Error fetching signal strength:', error);
    }
  };

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error fetching signal strength: {error.message}</div>;
  }

  // Display the signal strength and SSID
  return (
    <div className='pt-3 px-3'>
      <Network ssid={data.SSID} signalStrength={data["Signal Strength"]} bssid='test'/>
      <div className='d-flex justify-content-end  mt-3'>
        <button className="fs-5 btn btn-outline-primary fw-bold border-2 me-2" onClick={seeGraph}>
          See Graph
        </button>
      </div>
    </div>
  );
}

export default LiveSignal;
